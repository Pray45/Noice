import React, { useEffect, useState } from 'react'
import axios from "axios";

function TopAlbum() {

  const [album , setAlbum] = useState([])

  useEffect(() => {
    (async() => { 
      const res = await axios.get("https://noice-2ed8.onrender.com/api/playlist/list")
      setAlbum(res.data.album) 
    })()
  },[])

  return (
    <div className='text-white pl-5 pt-10'>
        <div className='flex justify-between mb-10 mr-10 mt-30 items-end'>
            <h1 className='text-3xl'>Albums</h1>
            <h1 className='text-md mb-10 cursor-pointer text-[#635972] hover:text-white duration-500'>Show All</h1>
        </div>

      {
        album.map((e) => (
          <div key={e._id} className='flex'>
            <div className='w-50 h-65 cursor-pointer hover:bg-[#171120] rounded-2xl'>
                <img className='w-45 h-45 rounded-2xl justify-self-center mt-3 object-cover object-top' src="{e.img}" alt="" />
                <h1 className='pl-5 pt-1'>{e.name}</h1>
                <p className='text-xs pl-5 pt-0.5 text-zinc-500'>{e.dec}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default TopAlbum