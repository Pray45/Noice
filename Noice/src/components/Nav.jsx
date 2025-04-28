import React from 'react'
import { NavLink } from 'react-router-dom';
import { GoHomeFill } from "react-icons/go";
import { IoMusicalNotes } from "react-icons/io5";
import { BiSolidAlbum } from "react-icons/bi";
import { GiMicrophone } from "react-icons/gi";
import { IoMdHeart } from "react-icons/io";
import { BiSolidPlaylist } from "react-icons/bi";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdContacts } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";


function Nav() {
  return (
    <div className='fixed w-2/11 min-h-screen bg-[#0A0019]'>
        <div className='flex gap-5 w-full pl-10 pt-5 pb-5 cursor-pointer border-b-2 border-[#1a0040]'>
            <img className='w-16 rounded-full' src="avtar.png" alt="" />
            <div>
                <h1 className='text-white text-xl self-center'>Pray</h1>
                <h1 className='text-zinc-500 text-md self-center'>good morning</h1>
            </div>
        </div>
        <div className='text-white pl-6'>
            <ul>
                <li>
                    <p className='pt-5 text-xl pl-5'>Library</p>
                    <ul>
                        <NavLink to="/" className={({isActive}) => `flex items-center gap-5 text-lg ml-12 py-1 mt-3 ${isActive ? 'hover:text-zinc-300 border-r-4 rounded-xs' : 'text-[#635972] cursor-pointer' } hover:text-zinc-300 duration-200`}><GoHomeFill /> Home</NavLink>
                        <NavLink to="/song" className={({isActive}) => `flex items-center gap-5 text-lg ml-12 py-1 mt-3 ${isActive ? 'hover:text-zinc-300 border-r-4 rounded-xs' : 'text-[#635972] cursor-pointer' } hover:text-zinc-300 duration-200`}><IoMusicalNotes />Songs</NavLink>
                        <NavLink to="/album" className={({isActive}) => `flex items-center gap-5 text-lg ml-12 py-1 mt-3 ${isActive ? 'hover:text-zinc-300 border-r-4 rounded-xs' : 'text-[#635972] cursor-pointer' } hover:text-zinc-300 duration-200`}><BiSolidAlbum />Albums</NavLink>
                        <NavLink to="/artist" className={({isActive}) => `flex items-center gap-5 text-lg ml-12 py-1 mt-3 ${isActive ? 'hover:text-zinc-300 border-r-4 rounded-xs' : 'text-[#635972] cursor-pointer' } hover:text-zinc-300 duration-200`}><GiMicrophone />Artists</NavLink>
                        <NavLink to="/liked" className={({isActive}) => `flex items-center gap-5 text-lg ml-12 py-1 mt-3 ${isActive ? 'hover:text-zinc-300 border-r-4 rounded-xs' : 'text-[#635972] cursor-pointer' } hover:text-zinc-300 duration-200`}><IoMdHeart />Liked</NavLink>
                        <NavLink to="/playlist" className={({isActive}) => `flex items-center gap-5 text-lg ml-12 py-1 mt-3 ${isActive ? 'hover:text-zinc-300 border-r-4 rounded-xs' : 'text-[#635972] cursor-pointer' } hover:text-zinc-300 duration-200`}><BiSolidPlaylist />My Playlists</NavLink>
                    </ul>
                </li>
                <li>
                <p className='pt-8 text-xl pl-5'>Discover</p>
                    <ul>
                        <NavLink to="/add" className={({isActive}) => `flex items-center gap-5 text-lg pl-12 py-1 mt-3 ${isActive ? 'hover:text-zinc-300 border-r-4 rounded-xs' : 'text-[#635972] cursor-pointer' } hover:text-zinc-300 duration-200`}><IoAddCircleSharp />Add Song</NavLink>
                        <NavLink to="/about" className={({isActive}) => `flex items-center gap-5 text-lg pl-12 py-1 mt-3 ${isActive ? 'hover:text-zinc-300 border-r-4 rounded-xs' : 'text-[#635972] cursor-pointer' } hover:text-zinc-300 duration-200`}><MdContacts />About us</NavLink>
                        <NavLink to="/contact" className={({isActive}) => `flex items-center gap-5 text-lg pl-12 py-1 mt-3 ${isActive ? 'hover:text-zinc-300 border-r-4 rounded-xs' : 'text-[#635972] cursor-pointer' } hover:text-zinc-300 duration-200`}><RiTeamFill />Contact us</NavLink>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Nav