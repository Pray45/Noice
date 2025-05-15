import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from "react-icons/fa";
import { useSong } from '../../contaxt';
import Songwave from '../loading/Songwave';
import Songs from '../../new/Songs';

function Liked() {
  const { songs, loading, likedSongs, likeSong } = useSong(); 


  const likedSongsList = songs.filter(song => likedSongs && likedSongs.includes(song._id));

  return loading ? (
    <div className='bg-gradient-to-r from-[#070011] to-[#1a012c] flex justify-center items-center w-9/11 min-h-screen absolute right-0 text-white'>
      <Songwave/>
    </div>
  ) : (
    <div className={`bg-gradient-to-r from-[#070011] to-[#1a012c] w-9/11 min-h-screen absolute right-0 text-white px-10 py-8`}>
      <Songs filteredSongs={likedSongsList} />
    </div>
  );
}

export default Liked;
