import React from 'react';
import { delay, motion } from 'framer-motion';
import { FaHeart } from "react-icons/fa";
import { useSong } from '../../contaxt';

function SongList() {
  const { songs, loading, likedSongs, likeSong } = useSong();

  const isLiked = (songId) => likedSongs.includes(songId);

  return loading ? (
    <div className='bg-[#070011] flex justify-center items-center w-9/11 min-h-screen absolute right-0 text-white'>
      <h1 className='text-5xl animate-pulse'>Loading...</h1>
    </div>
  ) : (
    <div className={`bg-[#070011] w-9/11 min-h-screen absolute right-0 text-white px-10 py-8`}>
      {songs.map((song, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={` pl-5 flex gap-10 items-center text-sm py-3 hover:bg-[#1a012c] rounded-md mt-1`}
        >
          <h1 className="w-8 h-10 flex items-center text-gray-400">{index + 1}</h1>
          <img src={song.img} alt={song.name} className="w-12 h-12 rounded object-cover" />
          <h1 className="w-80 font-semibold text-white truncate">{song.name}</h1>
          <h1 className="w-90 text-gray-300 truncate">{song.artist}</h1>
          <h1 className="w-10 text-gray-300">{song.duration}</h1>

          {/* Heart button */}
          <input type="checkbox" id={song._id} className="hidden" />
          <label htmlFor={song._id} className='text-md'>
            <FaHeart
            className={`text-xl transition-all duration-500 ${isLiked(song._id) ? 'text-red-500' : 'text-white'}`}
            onClick={() => likeSong(song._id)}
            />
          </label>
          <button className='py-2.5 bg-[#12002c9f] hover:bg-[#2a0b569f] px-6 rounded-lg duration-300'>Add</button>
        </motion.div>
      ))}
    </div>
  );
}

export default SongList;
