import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useSong } from '../../contaxt.jsx';
import Songwave from '../../components/loading/Songwave.jsx';
import { useNavigate } from 'react-router-dom';
import Songs from '../../new/Songs.jsx';


const PlaylistSongs = () => {
  const { likedSongs, likeSong} = useSong();
  const id = localStorage.getItem("selectplaylist")
  const [playlist, setPlaylist] = useState(null);
  const token = localStorage.getItem('token');

  const isLiked = (songId) => likedSongs && likedSongs.includes(songId);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const res = await axios.get(
          `https://noice-2ed8.onrender.com/api/playlist/list/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setPlaylist(res.data.playlist);
      } catch (err) {
        console.error('Failed to load playlist:', err.response?.data || err.message);
        setError('Failed to load playlist, please try again later.');
      }
    };

    fetchPlaylist();
  }, [id , token]);

  const removeSong = async (songId) => {
  try {
    await axios.delete(
      `https://noice-2ed8.onrender.com/api/playlist/remove/${id}/${songId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );

    // Remove the song from the playlist in local state
    setPlaylist((prev) => ({
      ...prev,
      songs: prev.songs.filter((song) => song._id !== songId),
    }));
  } catch (err) {
    console.error("Failed to remove song:", err.response?.data || err.message);
  }
};


const navigate = useNavigate();

const deletePlaylist = async () => {
  const confirmDelete = window.confirm('Are you sure you want to delete this playlist?');
  if (!confirmDelete) return;

  try {
    await axios.delete(
      `https://noice-2ed8.onrender.com/api/playlist/remove/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    navigate('/playlist');
    window.location.reload();
  } catch (err) {
    console.error('Failed to delete playlist:', err.response?.data || err.message);
    alert('Failed to delete playlist.');
  }
};


  if (!playlist) {
    return (
        <div className="text-white flex justify-center w-9/11 bg-gradient-to-r from-[#070011] to-[#1a012c] min-h-screen absolute right-0">
            <Songwave/>
        </div>    
    )
  }

  return (
    <div className="text-white w-9/11 bg-gradient-to-r from-[#070011] to-[#1a012c] min-h-screen absolute right-0">
            <motion.div
        className="relative flex flex-col md:flex-row items-center gap-8 p-8 bg-gradient-to-r from-[#1d1030] via-[#3f1e54] to-[#070011] rounded-2xl shadow-xl overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.img
          src={playlist.img}
          alt={playlist.name}
          className="w-64 h-64 rounded-2xl shadow-2xl object-cover"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />

        <div className="flex-1 space-y-4">
          <p className="uppercase text-sm text-zinc-400 tracking-widest">Playlist</p>
          <h1 className="text-5xl font-extrabold">{playlist.name}</h1>

          <div className="flex justify-between items-center mt-6">
            <p className="text-zinc-400 text-sm">
              {playlist.songs.length} song{playlist.songs.length !== 1 && 's'}
            </p>

            <button
              onClick={deletePlaylist}
              className="flex items-center gap-2 bg-purple-950 hover:bg-purple-900 px-6 py-2 rounded-full text-white font-semibold tracking-wide shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              🗑️ Delete Playlist
            </button>
          </div>
        </div>
      </motion.div>

      <div className="px-10 py-6">
        {playlist.songs.length === 0 ? (
          <p className="text-zinc-400">No songs found in this album.</p>
        ) : (
          <div className="flex flex-col gap-4">
            <Songs filteredSongs={playlist.songs} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistSongs;
