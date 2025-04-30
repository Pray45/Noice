import React, { useEffect, useState } from 'react'
import {motion} from "framer-motion"
import { useSong } from '../../contaxt';

function Album() {
  
  const {album} = useSong()

  return album.length === 0 ? (
    <div className='bg-[#070011] flex justify-center items-center w-9/11 min-h-screen absolute right-0 text-white'>
      <h1 className='text-5xl animate-pulse'>Loading...</h1>
    </div>
  ) : (
      <div className='w-9/11 bg-[#070011] min-h-screen absolute right-0 text-white px-10 py-8'>
        <div  className='flex flex-wrap ml-5 gap-8'>
          {
            album.map((e,index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}  className=' scale-90 w-50 h-65 cursor-pointer hover:bg-[#171120] rounded-2xl'>
                    <img className='w-45 h-45 rounded-2xl justify-self-center mt-3 object-cover object-top' src={e.img} alt="" />
                    <h1 className='pl-5 pt-1'>{e.name}</h1>
                    <p className='text-xs mr-10 pl-5 pt-2 text-zinc-500 truncate'>{e.desc}</p>
                </motion.div>
            ))
          }
        </div>
      </div>
  )
}

export default Album