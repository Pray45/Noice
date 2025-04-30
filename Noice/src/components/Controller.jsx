import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaHeart } from 'react-icons/fa';
import { useSong } from '../contaxt';

function Controller() {
  const { isPlaying, playSong, pauseSong, nextSong, prevSong, currentSong, OnLike } = useSong();
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

  // Convert "mm:ss" or number to seconds
  const duration = currentSong?.duration
    ? currentSong.duration.includes(':')
      ? parseInt(currentSong.duration.split(':')[0]) * 60 + parseInt(currentSong.duration.split(':')[1])
      : Number(currentSong.duration)
    : 0;

  // Sync play/pause
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Sync currentSong change
  useEffect(() => {
    if (audioRef.current && currentSong?.audio) {
      audioRef.current.src = currentSong.audio;
      audioRef.current.load();
      setCurrentTime(0);
      if (isPlaying) audioRef.current.play();
    }
  }, [currentSong]);

  // Update time
  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleSeek = (e) => {
    const seekTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const formatTime = (t) => {
    const min = Math.floor(t / 60);
    const sec = Math.floor(t % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
  };

  return (
    <div className='[box-shadow:0_4px_30px_rgba(0,_0,_0,_0.2)] backdrop-filter backdrop-blur-[5px] border-[1px] border-solid border-[rgba(41,0,81,0.49)] w-dvw h-16 flex items-center justify-between px-5'>
      
      {/* Audio DOM element */}
      <audio ref={audioRef} />

      {/* Controls */}
      <div onClick={prevSong} className="cursor-pointer text-xl text-white">
        <FaStepBackward />
      </div>

      <div onClick={() => (isPlaying ? pauseSong() : playSong(currentSong))} className="cursor-pointer text-xl text-white">
        {isPlaying ? <FaPause /> : <FaPlay />}
      </div>

      <div onClick={nextSong} className="cursor-pointer text-xl text-white">
        <FaStepForward />
      </div>

      {/* Song Info */}
      <div className="flex gap-3 items-center text-white">
        <img src={currentSong?.img} alt={currentSong?.name} className="w-12 h-12 rounded object-cover" />
        <div>
          <h1 className="font-semibold truncate w-40">{currentSong?.name}</h1>
          <h2 className="text-sm text-gray-400 truncate w-40">{currentSong?.artist}</h2>
        </div>
        <div onClick={() => OnLike(currentSong?._id, currentSong?.liked)}>
          <FaHeart className={`text-xl transition-all ${currentSong?.liked ? 'text-red-500' : 'text-gray-500'}`} />
        </div>
      </div>

      {/* Seek bar */}
      <div className="flex items-center gap-2 w-2/5">
        <span className="text-white text-sm">{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className="w-full"
        />
        <span className="text-white text-sm">{formatTime(duration)}</span>
      </div>
    </div>
  );
}

export default Controller;
