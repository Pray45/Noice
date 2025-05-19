import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useSong } from '../../contaxt';
import { motion } from 'framer-motion';
import { FaHeart } from "react-icons/fa";
import Songs from '../../new/Songs';

function RandomSong() {
  const { songs, loading, likedSongs, likeSong, playlist } = useSong();
  const [dropdownVisibleId, setDropdownVisibleId] = useState(null);
  const [addingTo, setAddingTo] = useState(null);

  const isLiked = (songId) => likedSongs && likedSongs.includes(songId);

  const handleAddToPlaylist = async (playlistId, songId) => {
    setAddingTo(songId);
    try {
      await axios.put(
        `https://noice-2ed8.onrender.com/api/playlist/add-song/${playlistId}`,
        { songId },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDropdownVisibleId(null);
    } catch (err) {
      console.error("Error adding song to playlist:", err);
      alert("already in playlist.");
    } finally {
      setAddingTo(null);
    }
  };

  const getRandomSongs = (songs, count = 10) => {
    const array = [...songs];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.slice(0, count);
  };

  const randomSongs = useMemo(() => getRandomSongs(songs, 10), [songs]);

  return (
    <div className="bg-gradient-to-r from-[#070011] to-[#1a012c] text-white py-8 px-5 pb-30 rounded-xl">
      <div className='flex justify-between mb-10 items-end'>
        <h1 className='text-3xl font-bold text-white'>Songs</h1>
        <Link to='/song' className='text-md cursor-pointer text-[#635972] hover:text-white duration-500'>Show All</Link>
      </div>
      <Songs filteredSongs={randomSongs} />
    </div>
  );
}

export default RandomSong;