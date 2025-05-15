import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { IoMusicalNoteSharp, IoCamera } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { MdDelete } from 'react-icons/md';
import { useSong } from '../contaxt';

function AddSongByAdmin() {
  const [song, setSong] = useState(false);
  const [img, setImg] = useState(false);
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [artistdata, setArtistdata] = useState([]);
  const [artistalbum, setartistalbum] = useState("none");
  const [album, setAlbum] = useState("none");
  const [albumdata, setAlbumdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dragOverSong, setDragOverSong] = useState(false);
  const [dragOverImg, setDragOverImg] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { songs, setSonglist } = useSong();
  const songlist = songs;

  useEffect(() => {
    (async () => {
      const res = await axios.get("https://noice-2ed8.onrender.com/api/album/list");
      setAlbumdata(res.data.album);
      const artistres = await axios.get("https://noice-2ed8.onrender.com/api/artist/list");
      setArtistdata(artistres.data.artist);
    })();
  }, []);

  const removeSong = async (id) => {
    await axios.post("https://noice-2ed8.onrender.com/api/song/remove", { id });
    toast.success("Song deleted!");
    setSonglist(prev => prev.filter(s => s._id !== id));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !artist || !song || !img) {
      toast.error("Please fill all fields!");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('artist', artist);
    formData.append('artistalbum', artistalbum);
    formData.append('album', album);
    formData.append('audio', song);
    formData.append('img', img);

    try {
      await axios.post("https://noice-2ed8.onrender.com/api/song/add", formData);
      toast.success("Song added successfully!");
      setName("");
      setArtist("");
      setAlbum("none");
      setartistalbum("none");
      setSong(false);
      setImg(false);
      setLoading(false);
    } catch (err) {
      toast.error("Upload failed. Try again.");
      setLoading(false);
    }
  };

  const filteredSongs = songlist.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return loading ? (
    <div className='bg-[#070011] flex justify-center items-center w-9/11 min-h-screen absolute right-0 text-white'>
      <h1 className='text-5xl animate-pulse'>Loading...</h1>
    </div>
  ) : (
    <div className='w-9/11 bg-[#070011] min-h-screen absolute right-0 text-white px-10 pb-50'>
      <form onSubmit={onSubmit} className='space-y-6 max-w-fit flex flex-col justify-self-center pt-10'>

        <div className='flex flex-col'>
          <label htmlFor="name" className='text-lg font-semibold'>Song Name</label>
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" id="name" className='bg-[#12002c9f] mt-2 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200' />
        </div>

        <div className='flex flex-col'>
          <label htmlFor="artist" className='text-lg font-semibold'>Artist</label>
          <input onChange={(e) => setArtist(e.target.value)} value={artist} type="text" id="artist" className='bg-[#12002c9f] mt-2 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200' />
        </div>

        <div className='flex flex-col'>
          <label htmlFor="album" className='text-lg font-semibold'>Select Album</label>
          <select onChange={(e) => setAlbum(e.target.value)} value={album} className='bg-[#12002c9f] mt-2 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200'>
            <option value="none" disabled>Select an album</option>
            {albumdata.map((item, index) => (
              <option key={index} value={item.name}>{item.name}</option>
            ))}
          </select>
        </div>

        <div className='flex flex-col'>
          <label htmlFor="artistalbum" className='text-lg font-semibold'>Select Artist</label>
          <select onChange={(e) => setartistalbum(e.target.value)} value={artistalbum} className='bg-[#12002c9f] mt-2 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200'>
            <option value="none" disabled>Select an artist</option>
            {artistdata.map((item, index) => (
              <option key={index} value={item.name}>{item.name}</option>
            ))}
          </select>
        </div>

        <div className='flex gap-8'>
          <div
            onClick={() => document.getElementById('song').click()}
            onDragOver={(e) => { e.preventDefault(); setDragOverSong(true); }}
            onDragLeave={() => setDragOverSong(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOverSong(false);
              const file = e.dataTransfer.files[0];
              if (file && file.type.startsWith("audio")) {
                setSong(file);
              } else {
                toast.error("Please upload a valid audio file.");
              }
            }}
            className={`w-[200px] h-[200px] flex justify-center items-center mt-2 rounded-md cursor-pointer 
              ${dragOverSong ? "border-2 border-purple-500" : "bg-[#12002c9f]"} transition-all`}
          >
            {song ? <TiTick className='text-green-400 text-6xl' /> : <IoMusicalNoteSharp className='text-5xl text-purple-300' />}
            <input onChange={(e) => setSong(e.target.files[0])} type="file" id="song" accept="audio/*" className='hidden' />
          </div>

          <div
            onClick={() => document.getElementById('img').click()}
            onDragOver={(e) => { e.preventDefault(); setDragOverImg(true); }}
            onDragLeave={() => setDragOverImg(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOverImg(false);
              const file = e.dataTransfer.files[0];
              if (file && file.type.startsWith("image")) {
                setImg(file);
              } else {
                toast.error("Please upload a valid image file.");
              }
            }}
            className={`w-[200px] h-[200px] flex justify-center items-center mt-2 rounded-md cursor-pointer 
              ${dragOverImg ? "border-2 border-purple-500" : "bg-[#12002c9f]"} transition-all`}
          >
            {
              img
                ? <img src={URL.createObjectURL(img)} className="w-[200px] h-[200px] object-cover object-center rounded-md" />
                : <IoCamera className='text-5xl text-purple-300' />
            }
            <input onChange={(e) => setImg(e.target.files[0])} type="file" id="img" accept="image/*" className='hidden' />
          </div>
        </div>

        <button type="submit" className="bg-[#12002c9f] hover:bg-[#2a0b569f] text-white py-2 px-4 rounded-md transition-all cursor-pointer">
          Submit
        </button>
      </form>

      <h1 className='text-5xl mt-10'>Songs</h1>
      <input
        type="text"
        placeholder="Search by song or artist..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 mt-4 rounded-md bg-[#1f0038] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
      />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6'>
        {filteredSongs.map((s) => (
          <div key={s._id} className="bg-[#12002c9f] p-4 rounded-lg flex flex-col gap-3">
            <div className="flex items-center gap-4 justify-between">
              <div className="flex items-center gap-4">
                <img src={s.img} alt={s.name} className="w-16 h-16 rounded object-cover" />
                <div>
                  <p className='font-bold'>{s.name}</p>
                  <p className='text-sm text-gray-300'>{s.artist} • {s.album}</p>
                </div>
              </div>
              <button onClick={() => removeSong(s._id)} className="text-red-500 hover:text-red-700 transition">
                <MdDelete size={24} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor={`album-${s._id}`} className="text-sm font-semibold">Change Album:</label>
              <select
                id={`album-${s._id}`}
                value={s.album}
                onChange={async (e) => {
                  const newAlbum = e.target.value;
                  try {
                    await axios.put("https://noice-2ed8.onrender.com/api/song/update", {
                      songId: s._id,
                      newAlbum
                    });
                    toast.success("Album updated");
                    setSonglist(prev => prev.map(song =>
                      song._id === s._id ? { ...song, album: newAlbum } : song
                    ));
                  } catch (err) {
                    toast.error("Failed to update album");
                  }
                }}
                className="bg-[#1f0038] px-2 py-1 rounded text-white"
              >
                {albumdata.map((albumOption, i) => (
                  <option key={i} value={albumOption.name}>{albumOption.name}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddSongByAdmin;
