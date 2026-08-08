import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { GoHomeFill } from "react-icons/go";
import { IoMusicalNotes } from "react-icons/io5";
import { BiSolidAlbum } from "react-icons/bi";
import { GiMicrophone } from "react-icons/gi";
import { IoMdHeart } from "react-icons/io";
import { BiSolidPlaylist } from "react-icons/bi";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdContacts } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

function Nav() {

    const [Msg , setMsg] = useState("")

    const logOut = () => {
        window.localStorage.removeItem('loggedIn');
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('userId');
        window.localStorage.removeItem('userName');
        window.localStorage.removeItem('selectplaylist');
        window.location.href = '/login';
    }

    useEffect(()=>{

        let time = new Date().getHours()
        let msg = ""
    
        if(time>=5 && time<12) msg = 'Good morning'
        if(time>=12 && time<17) msg = 'Good Afternoon'
        if(time>=17 && time<21) msg = 'Good Evening'
        if(time>=21 || time == 24) msg = "goog night"
        if(time>=0 && time<5) msg = 'go to bed !!!'
        setMsg(msg)
    },[])

    const Name = window.localStorage.getItem("userName")

  return (
    <div className='fixed min-w-2/11 min-h-screen bg-[#0A0019]'>
        <div className='flex gap-3 w-full pl-12 pt-5 pb-5 cursor-pointer border-b-2 border-[#1a0040]'>
            <FaUserCircle className='text-purple-800 text-5xl mt-2'/>
            <div>
                <h1 className='text-white pt-1 text-xl self-center'>{Name}</h1>
                <h1 className='text-zinc-500 text-sm self-center truncate'>{Msg}</h1>
            </div>
        </div>
        <div className='text-white pl-6 h-[70vh] overflow-auto'>
            <ul>
                <li>
                    <p className='pt-5 text-xl pl-5'>Library</p>
                    <ul>
                        <NavLink to="/" className={({isActive}) => `flex items-center gap-5 text-lg ml-12 py-1 mt-3 ${isActive ? 'hover:text-zinc-300 border-r-4 rounded-xs' : 'text-[#635972] cursor-pointer' } hover:text-zinc-300 duration-200`}><GoHomeFill /> Home</NavLink>
                        <NavLink to="/song" className={({isActive}) => `flex items-center gap-5 text-lg ml-12 py-1 mt-3 ${isActive ? 'hover:text-zinc-300 border-r-4 rounded-xs' : 'text-[#635972] cursor-pointer' } hover:text-zinc-300 duration-200`}><IoMusicalNotes />Songs</NavLink>
                        <NavLink to="/album" className={({isActive}) => `flex items-center gap-5 text-lg ml-12 py-1 mt-3 ${isActive ? 'hover:text-zinc-300 border-r-4 rounded-xs' : 'text-[#635972] cursor-pointer' } hover:text-zinc-300 duration-200`}><BiSolidAlbum />Albums</NavLink>
                        <NavLink to="/artist" className={({isActive}) => `flex items-center gap-5 text-lg ml-12 py-1 mt-3 ${isActive ? 'hover:text-zinc-300 border-r-4 rounded-xs' : 'text-[#635972] cursor-pointer' } hover:text-zinc-300 duration-200`}><GiMicrophone />Artists</NavLink>
                        <NavLink to="/liked" className={({isActive}) => `flex items-center gap-5 text-lg ml-12 py-1 mt-3 ${isActive ? 'hover:text-zinc-300 border-r-4 rounded-xs' : 'text-[#635972] cursor-pointer' } hover:text-zinc-300 duration-200`}><IoMdHeart />Liked</NavLink>
                        <NavLink to="/playlist" className={({isActive}) => `flex items-center gap-5 text-lg ml-12 py-1 mt-3 ${isActive ? 'hover:text-zinc-300 border-r-4 rounded-xs' : 'text-[#635972] cursor-pointer' } hover:text-zinc-300 duration-200`}><BiSolidPlaylist /> Playlists</NavLink>
                    </ul>
                </li>
                <li>
                <p className='pt-8 text-xl pl-5'>Discover</p>
                    <ul>
                        <NavLink to="/add" className={({isActive}) => `flex items-center gap-5 text-lg pl-12 py-1 mt-3 ${isActive ? 'hover:text-zinc-300 border-r-4 rounded-xs' : 'text-[#635972] cursor-pointer' } hover:text-zinc-300 duration-200`}><IoAddCircleSharp />Add Song</NavLink>
                        <NavLink to="/about" className={({isActive}) => `flex items-center gap-5 text-lg pl-12 py-1 mt-3 ${isActive ? 'hover:text-zinc-300 border-r-4 rounded-xs' : 'text-[#635972] cursor-pointer' } hover:text-zinc-300 duration-200`}><MdContacts />About us</NavLink>
                        <button onClick={logOut} className="flex items-center gap-5 text-lg pl-12 py-1 mt-3 text-[#635972] cursor-pointer hover:text-zinc-300 duration-200"><CiLogout />Logout</button>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Nav