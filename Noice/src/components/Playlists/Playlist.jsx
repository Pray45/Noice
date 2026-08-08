import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSong } from '../../contaxt';
import { IoCamera } from "react-icons/io5";
import Songwave from '../loading/Songwave.jsx';
import api from '../../api';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
 
function Playlist() {
  const { playlist, setPlaylist, loading, setLoading } = useSong();
  const [showModal, setShowModal] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [playlistImage, setPlaylistImage] = useState(null);

  const handleAddPlaylist = async () => {
    if (!playlistName || !playlistImage) {
      toast.error('Please enter a playlist name and select an image');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', playlistName);
      formData.append('img', playlistImage);
      formData.append('songs', JSON.stringify([]));

      const res = await api.post('/api/playlist/add', formData);

      if (res.data?.playlist && setPlaylist) {
        setPlaylist(prev => [...prev, res.data.playlist]);
      }
      setShowModal(false);
      setPlaylistName('');
      setPlaylistImage(null);
      toast.success('Playlist created successfully!');
    } catch (err) {
      console.error('Error adding playlist:', err);
      toast.error(err.response?.data?.message || 'Error creating playlist');
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div className="bg-[#070011] flex justify-center items-center w-9/11 min-h-screen absolute right-0 text-white">
      <Songwave />
    </div>
  ) : (
    <div className="w-9/11 bg-gradient-to-r from-[#070011] to-[#1a012c] min-h-screen absolute right-0 text-white px-10 py-8">
      <div className="flex flex-wrap ml-5 gap-8">
        {/* Add Playlist Card */}
        <div onClick={() => setShowModal(true)}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="pt-0.5 pl-0.5 pr-0.5 scale-90 w-50 h-65 cursor-pointer hover:bg-[#171120] rounded-2xl"
            >
              <div className="w-45 h-45 rounded-2xl justify-self-center flex justify-center items-center border-2 border-dashed border-zinc-500 mt-3 object-cover object-top">
                <IoCamera className='text-5xl text-purple-300' />
              </div>
              <h1 className="pl-5 pt-3 text-xl">add playlist</h1>
            </motion.div>
        </div>
        
        {
            playlist && playlist.map((e, index) => (
                <Link onClick={() => localStorage.setItem("selectplaylist", e._id)} to={`/playlist/${encodeURIComponent(e.name)}`} key={e._id || index}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className='pt-0.5 pl-0.5 pr-0.5 scale-90 w-50 h-65 cursor-pointer hover:bg-[#171120] pb-20 rounded-2xl'>
                    <img className='w-45 h-45 rounded-2xl justify-self-center mt-3 object-cover object-top' src={e.img} alt="" />
                    <h1 className='pl-3 pt-4 w-50 text-xl truncate'>{e.name}</h1>
                </motion.div>
              </Link>
            ))
        }

      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-white/5 backdrop-blur-sm" initial={{ opacity: 0, backdropFilter: 'blur(0px)' }} animate={{ opacity: 1, backdropFilter: 'blur(2.5px)', transition: { duration: 0.4 } }} exit={{ opacity: 0, backdropFilter: 'blur(0px)', transition: { duration: 0.4 } }} >
            <motion.div className="bg-[#1a012c] p-8 rounded-xl shadow-xl w-87 text-white relative" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.3 }} >
              <h2 className="text-2xl mb-4 text-center font-bold">Create Playlist</h2>
              <input type="text" placeholder="Playlist Name" value={playlistName} onChange={(e) => setPlaylistName(e.target.value)} className="w-full p-2 rounded bg-white/10 mb-4 outline-none" />
              <label htmlFor='img' className='w-64 h-64 justify-center items-center justify-self-center flex bg-white/10 mb-5 rounded-lg overflow-hidden cursor-pointer'>
                {playlistImage ? <img src={URL.createObjectURL(playlistImage)} className="w-full h-full object-cover" alt="" /> : <IoCamera className='text-9xl text-purple-300' />}
              </label>
              <input type="file" id='img' accept="image/*" onChange={(e) => setPlaylistImage(e.target.files[0])} className="w-full p-2 rounded bg-white/10 mb-4 text-sm hidden" />
              <div className="flex justify-around gap-4">
                <button onClick={handleAddPlaylist} className="bg-purple-700 px-8 py-2 rounded hover:bg-purple-600 transition cursor-pointer" >
                  Add
                </button>
                <button onClick={() => setShowModal(false)} className="bg-white/20 px-8 py-2 rounded hover:bg-white/30 transition cursor-pointer" >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Playlist;