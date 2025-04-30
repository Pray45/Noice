import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {motion} from 'framer-motion'
import { FaHeart } from "react-icons/fa"

function RandomSong() {
  
  const [songs, setSongs] = useState([])

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
  };
  

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('https://noice-2ed8.onrender.com/api/song/list')
        const shuffleSong = await shuffleArray(res.data.songlist)
        setSongs(shuffleSong)
      } catch (err) {
        console.error("Error fetching songs", err)
      }
    })() 
  }, []);

  const OnLike = async (id, currentLiked) => {
    
    setSongs(prevSongs =>
      prevSongs.map(song =>
        song._id === id ? { ...song, liked: !currentLiked } : song
      )
    )
    
    try {
        await axios.put(`https://noice-2ed8.onrender.com/api/song/update/${id}`, {
        liked: !currentLiked,
      })
    } catch (error) {
      console.error("Error toggling like", error)
    }
  }

  return (
    <div className="bg-[#070011] mr-15 text-white py-8">
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
