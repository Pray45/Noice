import React, { useEffect, useState } from 'react'
import axios from "axios"

const slides = [
  {
    img: "/slider/img1.png",
    path: "https://www.google.com/search?q=the+boys",
  },
  {
    img: "/slider/img2.png",
    path: "https://www.google.com/search?q=game+of+thrones",
  },
  {
    img: "/slider/img3.png",
    path: "https://www.google.com/search?q=breaking+bad",
  },
];

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
              <>
                <img key={elem.path} className='bject-cover object-center duration-1500' style={{transform: `translateX(-${current * 100}%)`}} src={elem.img}  />
              </>
            ))

        }
    </div>
  )
}

export default Carousel