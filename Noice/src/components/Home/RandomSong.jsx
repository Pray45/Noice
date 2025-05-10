import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { useSong } from '../../contaxt'
import {motion} from 'framer-motion'
import { FaHeart } from "react-icons/fa"

function RandomSong() {
  
   const {songs, album, loading, OnLike, isPlaying, pauseSong, playSong, currentSong} = useSong()

  return (
    <div className="bg-[#070011] mr-15 text-white py-8">
    <div className='flex justify-between mb-10 mr-10 mt-30 items-end'>
        <h1 className='text-3xl'>Songs</h1>
        <Link to='/song' className='text-md cursor-pointer text-[#635972] hover:text-white duration-500'>Show All</Link>
    </div>
      {
        songs.slice(0,11).map((song, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className=" pl-5 flex gap-10 items-center text-sm py-3 hover:bg-[#1a012c] rounded-md mt-1" >
              <h1 className="w-8 h-10 flex items-center text-gray-400">{index + 1}</h1>
              <img src={song.img} alt={song.name} className="w-12 h-12 rounded object-cover" />
              <h1 className="w-80 font-semibold text-white truncate">{song.name}</h1>
              <h1 className="w-90 text-gray-300 truncate">{song.artist}</h1>
              <h1 className="w-10 text-gray-300">{song.duration}</h1>
              <input type="checkbox" id={`liked-${song._id}`} checked={song.liked} onChange={() => OnLike(song._id, song.liked)} className="hidden" />
              <label htmlFor={`liked-${song._id}`} className='text-md'>
                <FaHeart className={`text-xl transition-all duration-500 ${song.liked ? 'text-red-500' : 'text-gray-500'}`} />
              </label>
              <button className='py-2.5 bg-[#12002c9f] hover:bg-[#2a0b569f] px-6 rounded-lg duration-300'>Add</button>
            </motion.div>
       ))
      }
    </div>
  )
}

export default RandomSong
