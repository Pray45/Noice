import React from 'react'
import { Link } from 'react-router-dom';
import {motion} from "framer-motion"
import { useSong } from '../../contaxt';

function TopAlbum() {

  const {album} = useSong()

  return( 
      <div className='text-white pl-5 pt-10'>
        <div className='flex justify-between mb-10 mr-10 mt-30 items-end'>
            <h1 className='text-3xl'>Albums</h1>
            <Link to='/album' className='text-md cursor-pointer text-[#635972] hover:text-white duration-500'>Show All</Link>
        </div>

        <div  className='flex gap-5'>
          {
            album.slice(0,5).map((e , index) => (
              <Link to={`/album/${encodeURIComponent(e.name)}`} key={index}>
                <motion.div transition={{duration: 0.5}} whileInView={{scale: 1.15}} key={e._id} className='pt-0.5 pl-0.5 pr-0.5 scale-90 w-50 h-65 cursor-pointer hover:bg-[#171120] rounded-2xl'>
                    <img className='w-45 h-45 rounded-2xl justify-self-center mt-3 object-cover object-top' src={e.img} alt="" />
                    <h1 className='pl-5 pt-1'>{e.name}</h1>
                    <p className='text-xs mr-10 pl-5 pt-2 text-zinc-500 truncate'>{e.desc}</p>
                </motion.div>
              </Link>
            ))
          }
        </div>
      </div>
  )
}

export default TopAlbum