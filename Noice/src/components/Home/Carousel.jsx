import React, { useEffect, useState } from 'react'
import axios from "axios"

const slides = [
  {
    img: "./slider/img1.png",
    path: "https://www.google.com/search?q=the+boys&rlz=1C1GCEA_enIN1155IN1155&oq=the+boys&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg7MgcIAhAAGI8CMgcIAxAAGI8CMgYIBBBFGD3SAQgyMjMwajBqMagCALACAA&sourceid=chrome&ie=UTF-8",
  },
  {
    img: "./slider/img2.png",
    path: "https://www.google.com/search?q=game+of+thrones&sca_esv=2466ec0482079bcb&rlz=1C1GCEA_enIN1155IN1155&sxsrf=AHTn8zp0Gov72d5JxWcYTbHIdE8xHzc0LQ%3A1746336483438&ei=4_oWaJ-3Gpnt1e8PgLGBKA&ved=0ahUKEwjftIOuiomNAxWZdvUHHYBYAAUQ4dUDCBA&uact=5&oq=game+of+thrones&gs_lp=Egxnd3Mtd2l6LXNlcnAiD2dhbWUgb2YgdGhyb25lczIHECMYJxjqAjIHECMYJxjqAjIHECMYJxjqAjIHECMYJxjqAjIHECMYJxjqAjIHECMYJxjqAjIHECMYJxjqAjIHECMYJxjqAjIHECMYJxjqAjIHECMYJxjqAjIWEC4YgAQYQxi0AhjIAxiKBRjqAtgBAjIWEC4YgAQYQxi0AhjIAxiKBRjqAtgBAjIWEC4YgAQYQxi0AhjIAxiKBRjqAtgBAjIWEC4YgAQYQxi0AhjIAxiKBRjqAtgBAjIWEC4YgAQYQxi0AhjIAxiKBRjqAtgBAjIWEC4YgAQYQxi0AhjIAxiKBRjqAtgBAjIWEC4YgAQYQxi0AhjIAxiKBRjqAtgBAjIWEC4YgAQYQxi0AhjIAxiKBRjqAtgBAkjaSVC1EVi2RnAEeAGQAQCYAQCgAQCqAQC4AQPIAQD4AQGYAgSgAhKoAhLCAg0QABiABBiwAxhDGIoFwgITEC4YgAQYsAMYQxjIAxiKBdgBAZgDBfEFcO2fNi52DquIBgGQBg26BgQIARgIugYGCAIQARgIkgcBNKAHALIHALgHAA&sclient=gws-wiz-serp",
  },
  {
    img: "./slider/img3.png",
    path: "https://www.google.com/search?q=breaking+bad&sca_esv=2466ec0482079bcb&rlz=1C1GCEA_enIN1155IN1155&sxsrf=AHTn8zo6Xi-G8083PLo7WJR1dkVwdEKEJg%3A1746336561474&ei=MfsWaJfeHNTO1e8PlrOB8A4&gs_ssp=eJzj4tLP1TcwTjE2qbAwYPTiSSpKTczOzEtXSEpMAQBhJQfP&oq=bracking+bad&gs_lp=Egxnd3Mtd2l6LXNlcnAiDGJyYWNraW5nIGJhZCoCCAAyDhAuGIAEGJECGLEDGIoFMgsQABiABBiRAhiKBTILEAAYgAQYkQIYigUyChAAGIAEGLEDGAoyChAAGIAEGLEDGAoyChAAGIAEGLEDGAoyChAAGIAEGLEDGAoyChAAGIAEGLEDGAoyChAAGIAEGLEDGAoyChAAGIAEGLEDGAoyLBAuGIAEGJECGLEDGIoFGJcFGNwEGN4EGOAEGPQDGPEDGPUDGPYDGPcD2AEBSMEsUNgMWMUfcAN4AZABApgBuQqgAYweqgEHNS0xLjEuMrgBA8gBAPgBAZgCBaACtgvCAgoQABiwAxjWBBhHwgINEAAYgAQYsAMYQxiKBcICDhAAGLADGOQCGNYE2AEBwgITEC4YgAQYsAMYQxjIAxiKBdgBAcICLBAuGIAEGJECGLEDGIoFGJcFGNwEGN4EGOAEGPQDGPEDGPUDGPYDGPcD2AEBmAMAiAYBkAYTugYGCAEQARgJkgcJMy40LTEuMC4xoAf2SLIHBzQtMS4wLjG4B6kL&sclient=gws-wiz-serp",
  },
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
              <>
                <img key={elem.path} className='bject-cover object-center duration-1500' style={{transform: `translateX(-${current * 100}%)`}} src={elem.img}  />
              </>
            ))

        }
    </div>
  )
}

export default Carousel