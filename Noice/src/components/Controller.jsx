import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion, Reorder } from 'framer-motion'
import { useSong } from '../contaxt'
import { FaHeart } from 'react-icons/fa'
import { HiMiniQueueList } from "react-icons/hi2"
import { RiRepeat2Fill } from "react-icons/ri"
import { PiShuffleBold } from "react-icons/pi"
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa6";
import { IoPlaySkipForward } from "react-icons/io5"
import { IoPlaySkipBackSharp } from "react-icons/io5"
import { IoRemoveSharp } from "react-icons/io5";



function Controller() {

  const {songs, queue, setQueue, currentsng, repeat, setRepeat, shuffle, setshuffle, likedSongs, likeSong } = useSong()
  const [play , setPLay] = useState(false)
  const [queuedis, setQueuedis] = useState(false)
  const isLiked = (songId) => likedSongs && likedSongs.includes(songId)

  return (
      <div className='flex justify-between [box-shadow:0_4px_30px_rgba(0,_0,_0,_0.2)] backdrop-filter backdrop-blur-[5px] border-[1px] border-solid border-[rgba(41,0,81,0.49)] w-dvw h-16 p-2'>
        
        <div className='flex items-center gap-4 w-68'>
          <img src={currentsng ? currentsng.img : "img"} alt="" className="w-12 h-12 rounded object-cover" />
          <div className='flex flex-col'>
            <h1 className="w-32 font-semibold text-white truncate">{currentsng ? currentsng.name : "name"}</h1>
            <h1 className="w-32 text-gray-300 truncate">{currentsng ? currentsng.artist : "artist"}</h1>
          </div>
          {currentsng &&
          <FaHeart className={`text-xl cursor-pointer transition-all duration-500 ${isLiked(currentsng._id) ? "text-red-500" : "text-white"}`} onClick={(e) => {e.stopPropagation(); likeSong(currentsng._id)}} />
          }
        </div>

        <div>
          <div className='flex justify-between'>
            <div className='text-white'>00:00</div>
            <div className='pb-2 flex gap-15 justify-self-center'>
              <IoPlaySkipBackSharp className='text-2xl text-white cursor-pointer'/>
              {
                play ? <FaPlay onClick={()=>setPLay(!play)} className='text-2xl text-white cursor-pointer'/> : <FaPause onClick={()=>setPLay(!play)} className='text-2xl text-white cursor-pointer' />
              }
              <IoPlaySkipForward className='text-2xl text-white cursor-pointer'/>
            </div>
            <div className='text-white'>00:00</div>
          </div>
          <input className='w-3xl cursor-pointer' type="range" name="" id="" />
        </div>

        <div className='w-68 flex items-center justify-end pr-4 gap-10'>
          <PiShuffleBold onClick={() => (setshuffle(!shuffle))} className={`text-2xl cursor-pointer duration-300 ${shuffle ? 'text-purple-500' : 'text-white'}`}/>
          <RiRepeat2Fill onClick={() => (setRepeat(!repeat))} className={`text-2xl cursor-pointer duration-300 ${repeat ? 'text-purple-500' : 'text-white'}`}/>
          <HiMiniQueueList onClick={() => setQueuedis(!queuedis)} className={`text-2xl cursor-pointer duration-300 ${queuedis ? 'text-purple-500' : 'text-white'}`}/>
          <AnimatePresence>
            {
              queuedis && 
              <motion.div
                initial={{ x: 300 }}
                animate={{ x: 0 }}
                exit={{ x: 350, transition: { duration: 0.3 } }}
                transition={{ duration: 0.3 }}
                className='absolute bottom-0 -z-1 -right-0.5 w-80 h-screen overflow-y-auto bg-[#0A0019] p-4'
              >

                {
                  currentsng ? 
                    <div className='flex items-center gap-3 bg-[#1a0033] rounded p-2 hover:bg-[#2b0050]'>
                      <img src={currentsng.img} alt={currentsng.name} className='w-12 h-12 rounded object-cover' />
                      <div className='text-white truncate'>
                        <p className='font-medium truncate'>{currentsng.name}</p>
                        <p className='text-sm text-gray-400 truncate'>{currentsng.artist}</p>
                      </div>
                    </div> : 
                    <></>
                }


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
                    >
                      <img src={song.img} alt={song.name} className='w-12 h-12 rounded object-cover' />
                      <div className='text-white truncate'>
                        <p className='font-medium truncate'>{song.name}</p>
                        <p className='text-sm text-gray-400 truncate'>{song.artist}</p>
                      </div>
                      <IoRemoveSharp onClick={()=> setQueue(queue.filter(sng => sng !== song))} className='text-2xl text-white absolute right-3 cursor-pointer'/>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </div>
  )
}

export default Controller