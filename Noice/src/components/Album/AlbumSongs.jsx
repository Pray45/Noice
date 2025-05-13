import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { useParams, Link } from 'react-router-dom';
import { useSong } from '../../contaxt';

const AlbumSongs = () => {
  const { albumName } = useParams();
  const { songs, album, likedSongs, likeSong } = useSong();
  const isLiked = (songId) => likedSongs && likedSongs.includes(songId);

  const filteredSongs = songs.filter(song => song.album === albumName);
  const currentAlbum = album.find(a => a.name === albumName);

  return (
    <div className="text-white w-9/11 bg-gradient-to-r from-[#070011] to-[#1a012c] min-h-screen absolute right-0">
{currentAlbum && (
  <motion.div className="relative flex items-center gap-8 px-10 py-12 bg-gradient-to-r from-[#1d1030] via-[#3f1e54] to-[#070011] rounded-xl shadow-lg overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} >

    <motion.div className="relative z-10 w-64 h-64" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} >
      <img src={currentAlbum.img} alt={currentAlbum.name} className="w-full h-full rounded-2xl shadow-2xl object-cover transform transition-transform duration-500" />
    </motion.div>

    <div className="relative z-10 text-white max-w-2xl">
      
      <motion.p className="uppercase text-sm text-zinc-300 tracking-wider" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}>
        Album
      </motion.p>
      
      <motion.h1 className="text-5xl font-extrabold mt-4 text-gradient" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}>
        {currentAlbum.name}
      </motion.h1>
      
      <motion.p className="text-lg text-zinc-300 mt-6 max-w-2xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }}>
        {currentAlbum.desc}
      </motion.p>
    </div>
  </motion.div>
)}

      <div className="px-10 py-6">
        {filteredSongs.length === 0 ? (
          <p className="text-zinc-400">No songs found in this album.</p>
            ) : (
          <div className="flex flex-col gap-4">
            {filteredSongs.map((song, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="pl-5 flex gap-10 w-full justify-around items-center text-sm py-3 hover:bg-[#1a012c] rounded-md mt-1" >
                    
                    <div className="flex">
                      <h1 className="w-8 h-10 flex items-center text-gray-400">{index + 1}</h1>
                      <img src={song.img} alt={song.name} className="w-12 h-12 rounded object-cover" />
                    </div>
                    <h1 className="w-80 font-semibold text-white truncate">{song.name}</h1>
                    <h1 className="w-90 text-gray-300 truncate">{song.artist}</h1>
                    <h1 className="w-10 text-gray-300">{song.duration}</h1>

                    <input type="checkbox" id={song._id} className="hidden" />
                    <label htmlFor={song._id} className="text-md">
                    <FaHeart
                      className={`text-xl transition-all duration-500 ${isLiked(song._id) ? "text-red-500" : "text-white"}`}
                      onClick={() => likeSong(song._id)}
                    />
                    </label>
                    
                    <button className="py-2.5 bg-[#12002c9f] hover:bg-[#2a0b569f] px-6 rounded-lg duration-300">Add</button>
                </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumSongs;
