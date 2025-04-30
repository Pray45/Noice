import React from 'react'
import { useSong } from '../contaxt'

function Controller() {

  const {isPlaying , playSong, pauseSong , currentSong} = useSong()

  return !isPlaying ? (<div className='[box-shadow:0_4px_30px_rgba(0,_0,_0,_0.2)] backdrop-filter backdrop-blur-[5px] border-[1px] border-solid border-[rgba(41,0,81,0.49)] w-dvw h-16'></div>) : 
  (
      <div className='[box-shadow:0_4px_30px_rgba(0,_0,_0,_0.2)] backdrop-filter backdrop-blur-[5px] border-[1px] border-solid border-[rgba(41,0,81,0.49)] w-dvw h-16'>

        

      </div>
  )
}

export default Controller 