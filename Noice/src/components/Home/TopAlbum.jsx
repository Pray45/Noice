import React from 'react'
import { Link } from 'react-router-dom';
import {motion} from "framer-motion"
import { useSong } from '../../contaxt';
import Card from '../../new/Card';

function TopAlbum() {

  const {album} = useSong()

  return( 
      <div className='text-white pl-5 pt-10'>
        <div className='flex justify-between mb-10 mr-10 mt-30 items-end'>
            <h1 className='text-3xl'>Albums</h1>
            <Link to='/album' className='text-md cursor-pointer text-[#635972] hover:text-white duration-500'>Show All</Link>
        </div>

        <div  className='flex gap-5'>
          <Card type={album.slice(0,5)} sec={"album"} />
        </div>
      </div>
  )
}

export default TopAlbum