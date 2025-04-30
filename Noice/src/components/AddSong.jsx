import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify';
import { IoMusicalNoteSharp, IoCamera } from "react-icons/io5";
import { TiTick } from "react-icons/ti";

function AddSong() {
  const [song, setSong] = useState(false);
  const [img, setImg] = useState(false);
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !artist || !song || !img) {
      toast.error("Please fill all fields!");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('artist', artist);
    formData.append('audio', song);
    formData.append('img', img);

    try {

        await axios.post("https://noice-2ed8.onrender.com/api/song/add", formData);
        
        toast.success("Song added successfully!");
        setName("");
        setArtist("");
        setSong(false);
        setImg(false);
        setLoading(false)

    } catch (err) {
        toast.error("Upload failed. Try again.");
        setLoading(false)
    }
  }

  return loading ? (
    <div className='bg-[#070011] flex justify-center items-center w-9/11 min-h-screen absolute right-0 text-white'>
      <h1 className='text-5xl animate-pulse'>Loading...</h1>
    </div>
    ) : (
    <div className='w-9/11 bg-[#070011] min-h-screen absolute right-0 text-white px-10 py-8'>
      <form onSubmit={onSubmit} className='space-y-6 max-w-fit flex flex-col justify-self-end pr-20 pt-10'>
        
        <div className='flex flex-col'>
          <label htmlFor="name" className='text-lg font-semibold'>Song Name</label>
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" id="name" className='bg-[#12002c9f] mt-2 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200' />
        </div>

        <div className='flex flex-col'>
          <label htmlFor="artist" className='text-lg font-semibold'>Artist</label>
          <input onChange={(e) => setArtist(e.target.value)} value={artist} type="text" id="artist" className='bg-[#12002c9f] mt-2 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200' />
        </div>

        <div className='flex gap-8'>
            <div className='flex flex-col items-start'>
              <label htmlFor="song" className='w-50 flex justify-center items-center bg-[#12002c9f] mt-2 h-50 rounded-md cursor-pointer hover:bg-[#1f0040] transition-all'>
                {song ? <TiTick className='text-green-400 text-6xl' /> : <IoMusicalNoteSharp className='text-5xl text-purple-300' />}
              </label>
              <input onChange={(e) => setSong(e.target.files[0])} type="file" id="song" className='hidden' />
            </div>

            <div className='flex flex-col items-start'>
              <label htmlFor="img" className='w-50 flex justify-center items-center bg-[#12002c9f] mt-2 h-50 rounded-md cursor-pointer hover:bg-[#1f0040] transition-all'>
                {
                    img ? (<img src={URL.createObjectURL(img)} className="w-50 h-50 object-cover object-center rounded-md" />) : (<IoCamera className='text-5xl text-purple-300' />
                    )}
              </label>
              <input onChange={(e) => setImg(e.target.files[0])} type="file" id="img" className='hidden' />
            </div>
        </div>
        <button type="submit" className="bg-[#12002c9f] hover:bg-[#2a0b569f] text-white py-2 px-4 rounded-md transition-all cursor-pointer" > Submit </button>

      </form>
    </div>
  );
}

export default AddSong;
