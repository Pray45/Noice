import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import { useSong } from '../../contaxt';
import Songs from '../../new/Songs';

function RandomSong() {
  const { songs } = useSong();

  const getRandomSongs = (songList, count = 10) => {
    if (!songList || songList.length === 0) return [];
    const array = [...songList];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.slice(0, count);
  };

  const randomSongs = useMemo(() => getRandomSongs(songs, 10), [songs]);

  return (
    <div className="bg-gradient-to-r from-[#070011] to-[#1a012c] text-white py-8 px-5 pb-30 rounded-xl">
      <div className='flex justify-between mb-10 items-end'>
        <h1 className='text-3xl font-bold text-white'>Songs</h1>
        <Link to='/song' className='text-md cursor-pointer text-[#635972] hover:text-white duration-500'>Show All</Link>
      </div>
      <Songs filteredSongs={randomSongs} />
    </div>
  );
}

export default RandomSong;