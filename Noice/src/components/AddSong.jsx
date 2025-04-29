import React, { use, useState } from 'react'
import axios from "axios"
import { IoMusicalNoteSharp } from "react-icons/io5";
import { IoCamera } from "react-icons/io5";

function AddSong() {

    const [song , setSong] = useState(false)
    const [img , setImg] = useState(false)
    const [name , setName] = useState("")
    const [artist , setArtist] = useState("")
    const [album , setAlbum] = useState("none")
    const [albumdata , setAlbumdata] = useState([])
    const [loading , setLoading] = useState(false)

    const onSubmit = async(e) => {

        e.preventDefault()
        setLoading(true)
        const formData = new FormData();

        formData.append('name',name)
        formData.append('artist',artist)
        formData.append('album',album)
        formData.append('audio',song)
        formData.append('img',img)

        const responce = await axios.post("https://noice-2ed8.onrender.com/api/song/add" , FormData)

        if(responce.data.success){
            setLoading(false)
            toast.success("Song Added")
            setName("")
            setArtist("")
            setAlbum(none)
            setSong(false)
            setImg(false)
        }

        else
        {
            toast.error("Something went Wrong")
        }

    }

  return loading ?(
    <div className='bg-[#070011] flex justify-center items-center w-9/11 min-h-screen absolute right-0 text-white pl-10'>
        <h1 className='text-5xl'>Loading</h1>
    </div>
  ) : (
    <div className='bg-[#070011] w-9/11 min-h-screen absolute right-0 text-white pl-10'>
        <form onSubmit={onSubmit} action="">
            <div className='flex flex-col'>
                <label htmlFor="name">Name Of Song</label>
                <input onChange={(e) => setName(e.target.value)} type="text" id="name" className='bg-[#12002c9f] mt-5 outline-none rounded-md py-1'/>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="artist">Artist Of Song</label>
                <input onChange={(e) => setArtist(e.target.value)} type="text" id="artist" className='bg-[#12002c9f] mt-5 outline-none rounded-md py-1'/>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="album">Artist Of Song</label>
                <select onChange={(e) =>  setAlbum(e.target.value)} className='bg-[#12002c9f] mt-5 outline-none rounded-md py-1'/>
                
            </div>
            <div className='flex flex-col'>
                <label htmlFor="song" className='w-35 h-35 bg-[#12002c9f] mt-5 flex items-center justify-center'><IoMusicalNoteSharp className='text-6xl'/></label>
                <input onChange={(e) => setSong(e.target.files[0])} type="file" id="song" className='hidden'/>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="img" className='w-35 h-35 bg-[#12002c9f] mt-5 flex items-center justify-center'><IoCamera className='text-6xl'/></label>
                <input onChange={(e) => setImg(e.target.files[0])} type="file" id="img" className='hidden'/>
            </div>

            <button className="bg-[#12002c9f] cursor-pointer py-1 px-2 mt-5 rounded-md" type="submit">Submit</button>

        </form>
    </div>
  )
}

export default AddSong