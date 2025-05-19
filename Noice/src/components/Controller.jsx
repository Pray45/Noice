import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Songwave from "./loading/Songwave.jsx"
import { useSong } from '../contaxt'
import { FaHeart } from 'react-icons/fa'
import { HiMiniQueueList } from "react-icons/hi2"
import { RiRepeat2Fill } from "react-icons/ri"
import { PiShuffleBold } from "react-icons/pi"
import { FaPlay, FaPause } from "react-icons/fa6"
import { IoPlaySkipForward, IoPlaySkipBackSharp } from "react-icons/io5"
import { AnimatePresence, motion, Reorder } from "framer-motion"
import { IoRemoveSharp } from "react-icons/io5"
import { MdLyrics } from "react-icons/md";
import '../index.css'

function Controller() {
  const {
    handleTime, setHandleTime,
    duration, setDuration,
    queue, setQueue,
    currentsng, setCurrentsng,
    repeat, setRepeat,
    shuffle, setShuffle,
    isPlaying, setIsPlaying,
    likedSongs, likeSong
  } = useSong();

  const audioRef = useRef(null);
  const [showQueue, setShowQueue] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [lyrics, setLyrics] = useState('');

  const isLiked = (songId) => likedSongs.includes(songId);

    useEffect(() => {
    if (!currentsng && queue.length > 0) {
      setCurrentsng(queue[0]);
    }
  }, [currentsng, queue, setCurrentsng]);

    useEffect(() => {
    if (!currentsng && queue.length > 0) {
      setCurrentsng(queue[0]);
    }
  }, [currentsng, queue, setCurrentsng]);

  // Add global spacebar listener for play/pause
  useEffect(() => {
    const handleSpace = (e) => {
      // Avoid input, textarea, and contenteditable (do not toggle when typing)
      const tag = document.activeElement?.tagName?.toLowerCase();
      const isTyping = tag === 'input' || tag === 'textarea' || document.activeElement?.isContentEditable;
      if (isTyping) return;

      if (e.code === 'Space' || e.key === ' ' || e.keyCode === 32) {
        e.preventDefault();
        // Only toggle play/pause if a song is selected
        if (currentsng) setIsPlaying((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleSpace);
    return () => window.removeEventListener('keydown', handleSpace);
  }, [currentsng, setIsPlaying]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    if (currentsng && audioRef.current) {
      setHandleTime(0); // reset time on song change
      setDuration(0);
      audioRef.current.load();
      if (isPlaying) audioRef.current.play().catch(console.error);
    }
  }, [currentsng]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setHandleTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handleEnded = () => {
      if (repeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        skipAndRemoveCurrent();
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
    // eslint-disable-next-line
  }, [currentsng, repeat, setQueue, setCurrentsng, setIsPlaying, queue, shuffle]);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play().catch(console.error) : audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleSliderChange = (e) => {
    const value = parseFloat(e.target.value);
    setHandleTime(value);
    if (audioRef.current) audioRef.current.currentTime = value;
  };

  // Helper to skip to next song and remove the current song from the queue
  const skipAndRemoveCurrent = () => {
    setQueue((prevQueue) => {
      if (!currentsng) return prevQueue;
      const filteredQueue = prevQueue.filter(song => song._id !== currentsng._id);

      if (filteredQueue.length > 0) {
        let nextIndex = 0;
        if (shuffle) {
          nextIndex = Math.floor(Math.random() * filteredQueue.length);
        }
        setCurrentsng(filteredQueue[nextIndex]);
      } else {
        setCurrentsng(null);
        setIsPlaying(false);
      }
      return filteredQueue;
    });
  };

  // Only skip and remove if there are at least 2 songs in the queue
  const nextSong = () => {
    setQueue((prevQueue) => {
      if (!currentsng) return prevQueue;
      if (prevQueue.length <= 1) {
        setCurrentsng(null);
        setIsPlaying(false);
        return [];
      }
      const filteredQueue = prevQueue.filter(song => song._id !== currentsng._id);
      let nextIndex = 0;
      if (shuffle) {
        nextIndex = Math.floor(Math.random() * filteredQueue.length);
      }
      setCurrentsng(filteredQueue[nextIndex]);
      return filteredQueue;
    });
  };

  // Previous song logic: just go to previous, but do not remove current from queue
  const prevSong = () => {
    setQueue((prevQueue) => {
      if (!currentsng) return prevQueue;
      const currentIndex = prevQueue.findIndex(song => song._id === currentsng._id);
      if (currentIndex === -1) return prevQueue;
      const prevIndex = (currentIndex - 1 + prevQueue.length) % prevQueue.length;
      setCurrentsng(prevQueue[prevIndex]);
      return prevQueue;
    });
  };

  // Remove song from queue and handle if removed song is currently playing
  const removeFromQueue = (songToRemove) => {
    setQueue((prevQueue) => {
      const newQueue = prevQueue.filter(sng => sng._id !== songToRemove._id);
      if (currentsng && currentsng._id === songToRemove._id) {
        if (newQueue.length > 0) {
          setCurrentsng(newQueue[0]);
        } else {
          setCurrentsng(null);
          setIsPlaying(false);
        }
      }
      return newQueue;
    });
  };

  useEffect(() => {
    
    const fetchLyrics = async () => {
      if (!currentsng?.name || !currentsng?.artist) return;

      try {
        const response = await axios.post('https://noice-2ed8.onrender.com/api/getlyrics', {
          songName: currentsng.name,
          artist: currentsng.artist
        });
        setLyrics(response.data.lyrics);
      } catch (error) {
        console.error('Error fetching lyrics:', error);
        setLyrics('Lyrics not available.');
      }
    };

    fetchLyrics();
  }, [currentsng]);

  return (
    <div className='z-50'>
      <audio ref={audioRef} src={currentsng?.audio} preload="auto" />

      <div className='flex justify-between items-center h-16 p-2 w-full fixed bottom-0 backdrop-blur-md bg-black/40 border-t border-purple-800 text-white z-50'>
        {/* Left: Song Info */}
        <div className='flex items-center gap-4 w-1/3'>
          <img src={currentsng?.img} className='w-12 h-12 rounded' alt={currentsng?.name} />
          <div>
            <div className='text-sm font-semibold truncate w-40'>{currentsng?.name || "Song Name"}</div>
            <div className='text-xs text-gray-300 truncate w-40'>{currentsng?.artist || "Artist Name"}</div>
          </div>
          {currentsng && (
            <FaHeart
              className={`cursor-pointer ${isLiked(currentsng._id) ? 'text-red-500' : 'text-white'}`}
              onClick={() => likeSong(currentsng._id)}
            />
          )}
        </div>

        {/* Center: Controls + Slider */}
        <div className='flex flex-col items-center w-1/3'>
          <div className='flex items-center gap-6 text-xl pb-1.5'>
            <IoPlaySkipBackSharp onClick={prevSong} className='cursor-pointer' />
            {isPlaying
              ? <FaPause onClick={() => setIsPlaying(false)} className='cursor-pointer' />
              : <FaPlay onClick={() => setIsPlaying(true)} className='cursor-pointer' />}
            <IoPlaySkipForward onClick={nextSong} className='cursor-pointer' />
          </div>
          <div className='flex items-center gap-2 text-xs w-full'>
            <span>{formatTime(handleTime)}</span>
            <input
              type="range"
              min="0"
              max={duration}
              value={handleTime}
              onChange={handleSliderChange}
              className='slider w-full'
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right: Shuffle, Repeat, Queue */}
        <div className='flex items-center gap-6 w-1/3 justify-end pr-4'>
          
          <MdLyrics 
            onClick={() =>{setShowLyrics(!showLyrics);}}
            className={`text-2xl cursor-pointer ${showLyrics ? 'text-purple-500' : ''}`} 
            title="Lyrics"
          />

          <PiShuffleBold
            onClick={() => setShuffle(!shuffle)}
            className={`text-2xl cursor-pointer ${shuffle ? 'text-purple-500' : ''}`}
            title="Shuffle"
          />
          <RiRepeat2Fill
            onClick={() => setRepeat(!repeat)}
            className={`text-2xl cursor-pointer ${repeat ? 'text-purple-500' : ''}`}
            title="Repeat"
          />
          <HiMiniQueueList
            onClick={() => setShowQueue(!showQueue)}
            className={`text-2xl cursor-pointer ${showQueue ? 'text-purple-500' : ''}`}
            title="Queue"
          />
        </div>
      </div>

      {/* Animated Queue Panel */}
      <AnimatePresence>
        {showQueue && (
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300, transition: { duration: 0.3 } }}
            transition={{ duration: 0.3 }}
            className='fixed bottom-0 right-0 top-0 w-80 overflow-y-auto p-4 -z-60 bg-[rgba(37,21,64,0.74)] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[9px] border border-[rgba(39,0,50,0.46)]'
          >
            {/* Currently Playing */}
            {currentsng && (
              <div className='flex items-center gap-3 bg-[#1a0033] rounded p-2 mb-4'>
                <img src={currentsng.img} alt={currentsng.name} className='w-12 h-12 rounded object-cover' />
                <div className='text-white truncate'>
                  <p className='font-medium truncate'>{currentsng.name}</p>
                  <p className='text-sm text-gray-400 truncate'>{currentsng.artist}</p>
                </div>
              </div>
            )}

            <h2 className='text-white text-xl font-semibold mb-4'>Queue</h2>

            <Reorder.Group
              axis="y"
              values={queue}
              onReorder={setQueue}
              className="space-y-3"
            >
              {queue.map((song, index) => (
                <Reorder.Item
                  key={song._id || song.name + index}
                  value={song}
                  dragListener={true}
                  dragConstraints={{ top: 0, bottom: 0 }}
                  whileDrag={{ scale: 1.02, boxShadow: "0px 2px 10px rgba(0,0,0,0.2)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className='flex relative items-center gap-3 bg-[#1a0033] rounded p-2 cursor-grab hover:bg-[#2b0050] active:cursor-grabbing'
                  onClick={() => setCurrentsng(song)}
                >
                  <img src={song.img} alt={song.name} className='w-12 h-12 rounded object-cover' />
                  <div className='text-white truncate'>
                    <p className='font-medium truncate'>{song.name}</p>
                    <p className='text-sm text-gray-400 truncate'>{song.artist}</p>
                  </div>
                  <IoRemoveSharp
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFromQueue(song)
                    }}
                    className='text-2xl text-white absolute right-3 cursor-pointer'
                    title="Remove from queue"
                  />
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </motion.div>
        )}
      </AnimatePresence>


      <AnimatePresence>
        {
          showLyrics && (
          <motion.div
            initial={{ y: 1000 }}
            animate={{ y: 0 }}
            exit={{ y  : 1000, transition: { duration: 0.5 } }}
            transition={{ duration: 0.5 }}
            className='fixed bottom-0 top-5 right-10 rounded-lg h-[90vh] verflow-y-auto w-[95vw] p-4 z-10 bg-[rgba(37,21,64,0.74)] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[9px] border border-[rgba(39,0,50,0.46)]'
          >

            {currentsng ? 

              <div className='flex gap-20 pt-5 pl-10'>
                <div>
                  <img src={currentsng.img} className='rounded-lg w-100 h-100' alt="" />
                  <h1 className='text-3xl w-100 truncate text-white pl-1 pt-3'>{currentsng.name}</h1>
                  <h1 className='text-2xl w-100 truncate text-white pl-1 pt-3'>{currentsng.artist}</h1>
                </div>
                <div className='h-160 overflow-auto'>
                  <p className='whitespace-pre-line text-white text-4xl font-semibold'>
                    {lyrics}
                  </p>
                </div>
              </div>

              :

              <div className='flex flex-col items-center'>
                <h1 className='text-white font-semibold text-4xl'>
                Please select a song first  
                </h1>
                <Songwave />
              </div>

            }

          </motion.div>
          )
        }
        </AnimatePresence>


    </div>
  )
}

export default Controller
