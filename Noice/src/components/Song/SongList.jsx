import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { useSong } from "../../contaxt";
import axios from "axios";
import Songwave from "../../components/loading/Songwave";
import Songs from "../../new/Songs";

function SongList() {
  
  const { songs, loading } = useSong();
  
  const [searchTerm, setSearchTerm] = useState(""); // NEW


  const filteredSongs = songs.filter(
    (song) =>
      song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return loading ? (
    <div className="bg-gradient-to-r from-[#070011] to-[#1a012c] flex justify-center items-center w-9/11 min-h-screen absolute right-0 text-white">
      <Songwave />
    </div>
  ) : (
    <div className="bg-gradient-to-r from-[#070011] to-[#1a012c] w-9/11 min-h-screen absolute right-0 text-white px-10 pb-30 py-8">
      <input type="text" placeholder="Search by song or artist..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-4 py-2 mb-6 rounded-md bg-[#1f0038] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"/>

      <Songs filteredSongs={filteredSongs} />
            
    </div>
  );
}

export default SongList;
