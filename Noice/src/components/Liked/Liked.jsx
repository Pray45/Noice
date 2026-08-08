import React from 'react';
import { useSong } from '../../contaxt';
import Songwave from '../loading/Songwave';
import Songs from '../../new/Songs';

function Liked() {
  const { songs, loading, likedSongs } = useSong(); 

  const likedSongsList = (songs || []).filter(song => likedSongs && likedSongs.includes(song._id));

  if (loading) {
    return (
      <div className='bg-gradient-to-r from-[#070011] to-[#1a012c] flex justify-center items-center w-9/11 min-h-screen absolute right-0 text-white'>
        <Songwave/>
      </div>
    );
  }

  return (
    <div className='bg-gradient-to-r from-[#070011] to-[#1a012c] w-9/11 min-h-screen absolute right-0 text-white px-10 pb-20 py-8'>
      <h1 className="text-3xl font-bold mb-6">Liked Songs</h1>
      {likedSongsList.length === 0 ? (
        <p className="text-gray-400 mt-10">No liked songs yet. Click the heart icon on any song to add it here!</p>
      ) : (
        <Songs filteredSongs={likedSongsList} />
      )}
    </div>
  );
}

export default Liked;
