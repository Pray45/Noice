import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../api';
import { useSong } from '../../contaxt.jsx';
import Songwave from '../../components/loading/Songwave.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import Songs from '../../new/Songs.jsx';
import { IoPlayCircle } from "react-icons/io5";
import { toast } from 'react-toastify';

const PlaylistSongs = () => {
  const { likedSongs, setQueue, playlist: allPlaylists, setPlaylist: setAllPlaylists } = useSong();
  const { something } = useParams();
  const storedId = localStorage.getItem("selectplaylist");
  
  // Find playlist by ID or match by name from allPlaylists
  const matchedPlaylist = allPlaylists?.find(p => p._id === storedId || p.name === something);
  const id = matchedPlaylist?._id || storedId;

  const [playlist, setPlaylist] = useState(matchedPlaylist || null);
  const [loading, setLoading] = useState(!matchedPlaylist);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylist = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get(`/api/playlist/list/${id}`);
        if (res.data?.playlist) {
          setPlaylist(res.data.playlist);
        }
      } catch (err) {
        console.error('Failed to load playlist:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [id]);

  const removeSong = async (songId) => {
    if (!id) return;
    try {
      await api.delete(`/api/playlist/remove/${id}/${songId}`);

      // Remove the song from the playlist in local state
      setPlaylist((prev) => ({
        ...prev,
        songs: prev.songs.filter((song) => song._id !== songId),
      }));
      toast.success('Song removed from playlist');
    } catch (err) {
      console.error("Failed to remove song:", err.response?.data || err.message);
      toast.error('Failed to remove song');
    }
  };

  const deletePlaylist = async () => {
    if (!id) return;
    const confirmDelete = window.confirm('Are you sure you want to delete this playlist?');
    if (!confirmDelete) return;

    try {
      await api.delete(`/api/playlist/remove/${id}`);
      if (setAllPlaylists) {
        setAllPlaylists(prev => prev.filter(p => p._id !== id));
      }
      toast.success('Playlist deleted');
      navigate('/playlist');
    } catch (err) {
      console.error('Failed to delete playlist:', err.response?.data || err.message);
      toast.error('Failed to delete playlist.');
    }
  };

  if (loading) {
    return (
      <div className="text-white flex justify-center items-center w-9/11 bg-gradient-to-r from-[#070011] to-[#1a012c] min-h-screen absolute right-0">
        <Songwave/>
      </div>    
    );
  }

  if (!playlist) {
    return (
      <div className="text-white flex flex-col items-center justify-center w-9/11 bg-gradient-to-r from-[#070011] to-[#1a012c] min-h-screen absolute right-0">
        <p className="text-xl text-gray-400">Playlist not found</p>
      </div>
    );
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

            <IoPlayCircle onClick={() => setQueue(playlist.songs)} className='text-6xl right-60 absolute bottom-19 cursor-pointer text-purple-600 duration-300 hover:text-purple-700'/>

          </div>
        </div>
      </motion.div>

      <div className="px-10 py-6">
        {playlist.songs.length === 0 ? (
          <p className="text-zinc-400">No songs found in this playlist.</p>
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
