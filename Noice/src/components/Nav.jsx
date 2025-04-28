import React from 'react'
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
                    <li className='pt-5 text-xl pl-5'>Library</li>
                    <ul>
                        <nav className='flex items-center gap-5 text-lg ml-12 pt-5 text-[#635972] cursor-pointer hover:text-zinc-300 duration-200'><GoHomeFill /> Home</nav>
                        <nav className='flex items-center gap-5 text-lg ml-12 pt-5 text-[#635972] cursor-pointer hover:text-zinc-300 duration-200'><IoMusicalNotes />Songs</nav>
                        <nav className='flex items-center gap-5 text-lg ml-12 pt-5 text-[#635972] cursor-pointer hover:text-zinc-300 duration-200'><BiSolidAlbum />Albums</nav>
                        <nav className='flex items-center gap-5 text-lg ml-12 pt-5 text-[#635972] cursor-pointer hover:text-zinc-300 duration-200'><GiMicrophone />Artists</nav>
                        <nav className='flex items-center gap-5 text-lg ml-12 pt-5 text-[#635972] cursor-pointer hover:text-zinc-300 duration-200'><IoMdHeart />Liked</nav>
                        <nav className='flex items-center gap-5 text-lg ml-12 pt-5 text-[#635972] cursor-pointer hover:text-zinc-300 duration-200'><BiSolidPlaylist />My Playlists</nav>
                    </ul>
                </li>
                <li>
                <li className='pt-8 text-xl pl-5'>Discover</li>
                    <ul>
                        <nav className='flex items-center gap-5 text-lg pl-12 pt-5 text-[#635972] cursor-pointer hover:text-zinc-300 duration-200'><IoAddCircleSharp />Add Song</nav>
                        <nav className='flex items-center gap-5 text-lg pl-12 pt-5 text-[#635972] cursor-pointer hover:text-zinc-300 duration-200'><MdContacts />About us</nav>
                        <nav className='flex items-center gap-5 text-lg pl-12 pt-5 text-[#635972] cursor-pointer hover:text-zinc-300 duration-200'><RiTeamFill />Contact us</nav>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Nav