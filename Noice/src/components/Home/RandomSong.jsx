import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import axios from "axios";
import { useSong } from '../../contaxt'
import {motion} from 'framer-motion'
import { FaHeart } from "react-icons/fa"
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

  return (
    <div className="bg-gradient-to-r from-[#070011] to-[#1a012c] text-white py-8 px-5 rounded-xl">
      <div className='flex justify-between mb-10 items-end'>
        <h1 className='text-3xl font-bold text-white'>Songs</h1>
        <Link to='/song' className='text-md cursor-pointer text-[#635972] hover:text-white duration-500'>Show All</Link>
      </div>
        <Songs filteredSongs={songs.slice(0,10)} />
    </div>
  )
}

export default RandomSong
