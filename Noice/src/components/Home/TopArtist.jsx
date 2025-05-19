import React from 'react'
import {motion} from "framer-motion"
import { FaPlay } from "react-icons/fa";
import { Link } from 'react-router-dom';

function TopArtist() {
  return (
    <div>
        <div className='flex justify-between mr-10 items-end'>
            <h1 className='text-3xl mb-10'>Top Artits</h1>
            <Link to='/artist' className='text-md mb-10 cursor-pointer text-[#635972] hover:text-white duration-500'>Show All</Link>
        </div>

        <div className='flex flex-shrink justify-center items-center w-full'>
        
        <Link to={`/artist/${encodeURIComponent("Drake")}`}>
            <motion.div transition={{duration: 0.5}} whileInView={{scale: 1.1}} className='h-1/5 scale-90 w-6/7 bg-[#31244463] cursor-pointer rounded-2xl p-3'>
                <img className='w-[20vw] h-[40vh] object-cover' src="./artist/nty.gif" />
                    <h1 className='text-2xl pt-3'>Drake</h1>
                <div className='flex items-center justify-between pt-2'>
                    <span className='text-2xl'>#2 </span>
                    <FaPlay className='text-[#8e63f1] text-3xl'/>
                </div>
            </motion.div>
        </Link>

        <Link to={`/artist/${encodeURIComponent("Taylor Swift")}`}>
            <motion.div transition={{duration: 0.5}} whileInView={{scale: 1.1}} className='flex  scale-90 flex-col justify-center h-3/5 w-7/8 bg-[#31244463] cursor-pointer rounded-2xl p-3'>
                <img className='w-100 h-90 object-cover object-center' src="./artist/Taylor.webp" />
                    <h1 className='text-2xl pt-3'>Taylor Swift</h1>
                    <div className='flex items-center justify-between pt-2'>
                        <span className='text-2xl'>#1</span>
                        <FaPlay className='text-[#8e63f1] text-3xl'/>
                    </div>
            </motion.div>
        </Link>
        
        <Link to={`/artist/${encodeURIComponent("Bad Bunny")}`}>
            <motion.div transition={{duration: 0.5}} whileInView={{scale: 1.1}} className='h-1/5 scale-90 w-6/7 bg-[#31244463] cursor-pointer rounded-2xl p-3'>
                <img className='w-[20vw] h-[40vh] object-cover' src="./artist/bunny.webp" />
                    <h1 className='text-2xl pt-3'>Bad Bunny</h1>
                <div className='flex items-center justify-between pt-2'>
                    <span className='text-2xl'>#3</span>
                    <FaPlay className='text-[#8e63f1] text-3xl'/>
                </div>
            </motion.div>
        </Link>
        </div>
    </div>
  )
}

export default TopArtist