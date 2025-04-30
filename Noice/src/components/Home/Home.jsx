import React from 'react'
import {motion} from 'framer-motion'
import Carousel from './Carousel'
import TopArtist from './TopArtist.jsx'
import TopAlbum from './TopAlbum.jsx'
import RandomSong from './RandomSong.jsx'
 
function Home() {
  return (
    <motion.div  className='w-9/11 absolute right-0'>
      <Carousel />
      <div className='w-full h-500 bg-[#070011] text-white pl-5 pt-10'>
        <TopArtist />
        <TopAlbum />
        <RandomSong/>
      </div>
    </motion.div>
  )
}

export default Home