import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../api';
import { useSong } from '../contaxt.jsx';
import { MdOutlinePlaylistAdd } from 'react-icons/md';
import { IoShareSocialSharp } from 'react-icons/io5';
import { PiQueueDuotone } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { IoMdMore } from 'react-icons/io';

function Songs({ filteredSongs }) {
  const {
    songs,
    likedSongs,
    likeSong,
    playlist,
    queue,
    setQueue,
    currentsng,
    setCurrentsng,
    isPlaying,
    setIsPlaying,
  } = useSong();

  const [addingTo, setAddingTo] = useState(null);
  const [dropdownVisibleId, setDropdownVisibleId] = useState(null);
  const [playlistDropdownId, setPlaylistDropdownId] = useState(null);

  const list = filteredSongs || songs || [];

  const isLiked = (songId) => likedSongs && likedSongs.includes(songId);

  // Add to queue safely, no duplicates
  const addToQueue = (song) => {
    if (!queue.some((s) => s._id === song._id)) {
      setQueue([...queue, song]);
      toast.success('Added to queue');
    } else {
      toast.info('Already in queue');
    }
    setDropdownVisibleId(null);
    setPlaylistDropdownId(null);
  };

  const handleAddToPlaylist = async (playlistId, songId) => {
    setAddingTo(songId);
    try {
      await api.put(`/api/playlist/add-song/${playlistId}`, { songId });
      toast.success('Added to playlist');
    } catch {
      toast.error('Already in playlist or failed to add');
    } finally {
      setAddingTo(null);
      setPlaylistDropdownId(null);
      setDropdownVisibleId(null);
    }
  };

  const copyToClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied!');
    } catch {
      toast.error('Copy failed');
    } finally {
      setDropdownVisibleId(null);
      setPlaylistDropdownId(null);
    }
  };

  // Play a song without modifying the queue
  const playSong = (song) => {
    setCurrentsng(song);
    setIsPlaying(true);
    // Do not modify the queue!
  };

  return (
    <>
      {list.length === 0 ? (
        <p className="text-gray-400 text-center mt-10">No songs match your search.</p>
      ) : (
        list.map((song, idx) => (
          <motion.div
            key={song._id}
            onClick={() => playSong(song)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`relative flex w-full justify-around gap-10 items-center text-sm py-3 hover:bg-[#1a012c] rounded-md mt-1 ${
              currentsng?._id === song._id ? 'bg-[#1a012c]' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <h1 className="w-8 h-10 flex items-center justify-center text-gray-400">{idx + 1}</h1>
              <img src={song.img} alt={song.name} className="w-12 h-12 rounded object-cover" />
            </div>

            <h1 className="w-[15rem] font-semibold text-white truncate">{song.name}</h1>
            <h1 className="w-[14rem] text-gray-300 truncate">{song.artist}</h1>
            <h1 className="w-14 text-gray-300">{song.duration}</h1>

            <FaHeart
              className={`text-xl cursor-pointer transition-all duration-300 ${
                isLiked(song._id) ? 'text-red-500' : 'text-white'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                likeSong(song._id);
              }}
            />

            <div className="relative">
              <button
                className="py-2.5"
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownVisibleId(dropdownVisibleId === song._id ? null : song._id);
                  setPlaylistDropdownId(null);
                }}
              >
                {addingTo === song._id ? 'Adding...' : <IoMdMore className="text-2xl" />}
              </button>

              {dropdownVisibleId === song._id && (
                <div className="absolute z-20 mt-2 p-2 right-8 bg-[#1f0038] border border-gray-600 rounded shadow-md w-52">
                  <ul>
                    <li
                      onClick={(e) => {
                        e.stopPropagation();
                        setPlaylistDropdownId(
                          playlistDropdownId === song._id ? null : song._id
                        );
                      }}
                      className="flex items-center gap-2 rounded-md py-2 hover:bg-purple-950 cursor-pointer pl-2"
                    >
                      <MdOutlinePlaylistAdd className="text-2xl" /> Add to Playlist
                    </li>

                    {playlistDropdownId === song._id && (
                      <div className="absolute top-0 right-56 z-30 bg-[#1f0038] border border-gray-600 rounded shadow-md w-52">
                        {playlist.length === 0 ? (
                          <Link
                            to="/playlist"
                            className="block px-4 py-2 text-sm text-gray-400"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Please create a playlist
                          </Link>
                        ) : (
                          playlist.map((pl) => (
                            <div
                              key={pl._id}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToPlaylist(pl._id, song._id);
                              }}
                              className="px-4 py-2 hover:bg-[#2a0b56] cursor-pointer text-white text-sm"
                            >
                              {pl.name}
                            </div>
                          ))
                        )}
                      </div>
                    )}

                    <li
                      onClick={(e) => {
                        e.stopPropagation();
                        addToQueue(song);
                      }}
                      className="flex items-center gap-2 rounded-md py-2 hover:bg-purple-950 cursor-pointer pl-2"
                    >
                      <PiQueueDuotone className="text-xl" /> Add to Queue
                    </li>

                    <li
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(song.audio);
                      }}
                      className="flex items-center gap-2 rounded-md py-2 hover:bg-purple-950 cursor-pointer pl-2"
                    >
                      <IoShareSocialSharp className="text-xl" /> Share
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        ))
      )}
    </>
  );
}

export default Songs;