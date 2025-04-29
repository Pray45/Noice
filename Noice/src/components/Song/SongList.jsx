import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SongList() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await axios.get('https://noice-2ed8.onrender.com/api/song/list');
        setSongs(res.data.songlist);
      } catch (err) {
        console.error("Error fetching songs", err);
      }
    };
    fetchSongs();
  }, []);

  return (
    <div className="bg-[#070011] flex flex-col justify-center items-center w-9/11 min-h-screen absolute right-0 text-white">
      <h2 className="text-3xl font-bold mb-6">🎵 All Songs</h2>
      <div className="flex flex-wrap gap-10 mt-20 mb-30 ml-12">
        { 
          songs.map((song, index) => (
            
            <div key={index} className="bg-[#1c0030] rounded-lg overflow-hidden w-50">
              <img src={song.audio} className="w-45 h-45 object-cover object-center justify-self-center"/>
              <div className="p-4">
                <h3 className="text-xl font-semibold">{song.name}</h3>
                <p className="text-sm text-gray-300">Artist: {song.artist}</p>
                
                {
                  song.album && (
                    <p className="text-sm text-gray-400">Album: {song.album}</p>
                  )
                }
                <p className="text-sm text-gray-400 mt-1"></p>
              </div>
            </div>

        ))}
      </div>
    </div>
  );
}

function formatDuration(seconds) {
  if (!seconds || isNaN(seconds)) return 'N/A';
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

export default SongList;
