import React from 'react'
import { motion } from "framer-motion";
import { IoPlayCircle } from "react-icons/io5";
import { useSong } from '../contaxt';


function Header({current, filteredSongs}) {

  const { setQueue } = useSong()

  return (

    <motion.div className="relative flex items-center gap-8 px-10 py-12 bg-gradient-to-r from-[#1d1030] via-[#3f1e54] to-[#070011] rounded-xl shadow-lg overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} >
    
        <motion.div className="relative z-10 w-64 h-64" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} >
          <img src={current.img} alt={current.name} className="w-full h-full rounded-2xl shadow-2xl object-cover transform transition-transform duration-500" />
        </motion.div>

        <div className="relative z-10 text-white max-w-2xl">

          <motion.p className="uppercase text-sm text-zinc-300 tracking-wider" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}>
            Artist
          </motion.p>

          <motion.h1 className="text-5xl font-extrabold mt-4 text-gradient" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}>
            {current.name}
          </motion.h1>

          <motion.p className="text-lg text-zinc-300 mt-6 max-w-2xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }}>
            {current.desc}
          </motion.p>

        </div>

          <IoPlayCircle onClick={() => setQueue(filteredSongs)} className='text-6xl right-70 absolute bottom-10 cursor-pointer text-purple-600 duration-300 hover:text-purple-700'/>

    </motion.div>

)
}

export default Header