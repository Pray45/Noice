import React, { useEffect, useState } from 'react'
import axios from "axios"

const slides = [
    "./slider/boys.jpg",
    "./slider/got.avif",
    "./slider/bb.jpg",
]
function Carousel() {

  const [current , setcurrent] = useState(0)

  const next = () => {
    setcurrent((current) => (current == slides.length-1 ? 0 : current+1))
  }

  useEffect(() => {
    const autoChange = setInterval( next, 10000)
    return () => clearInterval(autoChange)
  },[])

  return (
    <div className='flex overflow-hidden'>
        {
            slides.map((elem) => (
                <img key={elem} className='w-full duration-1500' style={{transform: `translateX(-${current * 100}%)`}} src={elem} />
            ))

        }
    </div>
  )
}

export default Carousel