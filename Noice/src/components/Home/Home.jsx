import React from 'react'
import {motion} from 'framer-motion'
import Carousel from './Carousel'
import TopArtist from './TopArtist.jsx'
import TopAlbum from './TopAlbum.jsx'
import RandomSong from './RandomSong.jsx'
import { useSong } from '../../contaxt.jsx'
import Songwave from '../loading/Songwave.jsx'

function Home() {

  const {loading} = useSong()

  return loading == true?(
    <div className='bg-gradient-to-r from-[#070011] to-[#1a012c] flex justify-center items-center min-w-9/11 min-h-screen absolute right-0 text-white'>
    <Songwave/>
    </div>
  ) : (
    <motion.div className='w-9/11 absolute right-0' transition={{ duration: 0.5 }}>
      <Carousel />
      <div className='w-full bg-gradient-to-r from-[#070011] to-[#1a012c] text-white pl-5 pt-10'>
        <TopArtist />
        <TopAlbum />
        <RandomSong />
      </div>
    </motion.div>
  )
}

export default Home
