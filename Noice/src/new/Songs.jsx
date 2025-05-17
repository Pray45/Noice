import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify'
import axios from 'axios';
import { useSong } from '../contaxt.jsx';
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { IoShareSocialSharp } from "react-icons/io5";
import { PiQueueDuotone } from "react-icons/pi";
import { Link } from 'react-router-dom'
import { IoMdMore } from "react-icons/io";

function Songs({filteredSongs}) {

  const { songs, likedSongs, likeSong, playlist, queue, setQueue, setCurrentsng, playsng } = useSong()
  const [addingTo, setAddingTo] = useState(null)
  const [dropdownVisibleId, setDropdownVisibleId] = useState(null)
  const [visibleId, setVisibleId] = useState(null)
  const list = filteredSongs ? filteredSongs : songs
  
  const isLiked = (songId) => likedSongs && likedSongs.includes(songId)

  const handleAddToPlaylist = async (playlistId, songId) => {
    setAddingTo(songId)
    try {
      
      await axios.put(`https://noice-2ed8.onrender.com/api/playlist/add-song/${playlistId}`,{ songId },{withCredentials: true,headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}});
      setVisibleId(null)
      setDropdownVisibleId(null)

    } catch (err) {

      alert("already in playlist.")

    } finally {
      setAddingTo(null)
    }
  }

  const copyfcn = async(url) => {
    await navigator.clipboard.writeText(url)
    toast.success("link copyied successfuly..!!!")
    setDropdownVisibleId(null)
    setVisibleId(null)
  }


  const queuefun = (song) => {

    if(!queue.includes(song)) setQueue([...queue,song])
    setDropdownVisibleId(null)

  }

  
    
  



// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



  return (
    <>
    {
        list?.length === 0 ? (
            <p className="text-gray-400 text-center mt-10">No songs match your search.</p>
        ) : (
            list.map((song, index) => (
                <motion.div onClick={() => {setCurrentsng(song); playsng()}}  key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="relative flex w-full justify-around gap-10 items-center text-sm py-3 hover:bg-[#1a012c] rounded-md mt-1">
                    
                  <div className="flex">
                      <h1 className="w-8 h-10 flex items-center text-gray-400">{index + 1}</h1>
                      <img src={song.img} alt={song.name} className="w-12 h-12 rounded object-cover" />
                  </div>
                  
                  <h1 className="w-80 font-semibold text-white truncate">{song.name}</h1>
                  <h1 className="w-90 text-gray-300 truncate">{song.artist}</h1>
                  <h1 className="w-10 text-gray-300">{song.duration}</h1>
                  <FaHeart className={`text-xl cursor-pointer transition-all duration-500 ${isLiked(song._id) ? "text-red-500" : "text-white"}`} onClick={(e) => {e.stopPropagation(); likeSong(song._id)}} />
                  <div className="relative">
            
                  <button className="py-2.5 duration-300"
                    onClick={(e) => {e.stopPropagation(); setDropdownVisibleId(dropdownVisibleId === song._id ? null : song._id)}}>
                    {addingTo === song._id ? "Adding..." : <IoMdMore className='text-2xl' />}
                  </button>
            
            
                  {dropdownVisibleId === song._id && (
                
                      <div className="absolute z-10 mt-2 p-2 right-8 bg-[#1f0038] border border-gray-600 rounded shadow-md w-52">
                          <ul>
                            <li onClick={() =>setVisibleId(visibleId === song._id ? null : song._id)} className='flex items-center gap-2 rounded-md py-2 hover:bg-purple-950 cursor-pointer pl-2'><MdOutlinePlaylistAdd className='text-2xl'/>add to Playlist</li>
                              {visibleId === song._id && (
                                <div className="absolute z-10 p-2 top-0 right-52 bg-[#1f0038] border border-gray-600 rounded shadow-md w-52">
                                  {
                                    playlist.length === 0 ? (<Link to="/playlist" className="px-4 py-2 w-full text-gray-400 text-sm">Please make playlist</Link>) 
                                    : (
                                        playlist.map((pl) => (
                                        <div key={pl._id} onClick={() => handleAddToPlaylist(pl._id, song._id)} className="px-4 py-2 hover:bg-[#2a0b56] cursor-pointer text-white text-sm">
                                        {pl.name}
                                        </div>
                                      ))
                                  )}
                                </div>
                              )}
                            <li onClick={()=> queuefun(song)} className='flex items-center gap-2 rounded-md py-2 hover:bg-purple-950 cursor-pointer pl-2'><PiQueueDuotone className='text-xl'/>add in queue</li>
                            <li onClick={() => copyfcn(song.audio)} className='flex items-center gap-2 rounded-md py-2 hover:bg-purple-950 cursor-pointer pl-2'><IoShareSocialSharp className='text-xl'/>Share</li>
                          </ul>
                      </div>
                  )}
                  </div>
                  
                </motion.div>
            ))
        )}
    </>
  )
}

export default Songs