import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const SongContext = createContext();

export const DataProvider = ({ children }) => {



  const [songs, setSongs] = useState([]);
  const [album, setAlbum] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [selectplaylist , setSelectplaylist] = useState()
  const [artist, setArtist] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [queue, setQueue] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [lastPlayed, setLastPlayed] = useState([]);

  

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> setting local storages



  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");



  //>>>>>>>>>>>>>>>>>>>>>>>>>>>> fetching songs,albums,artists,playlists,likedsongs



  useEffect(() => {
    (async () => {
      try {
        const songRes = await axios.get("https://noice-2ed8.onrender.com/api/song/list", { withCredentials: true });
        setSongs(songRes.data.songlist);
        const albumRes = await axios.get("https://noice-2ed8.onrender.com/api/album/list", { withCredentials: true });
        setAlbum(albumRes.data.album);
        const artistRes = await axios.get("https://noice-2ed8.onrender.com/api/artist/list", { withCredentials: true });
        setArtist(artistRes.data.artist);
        const playlistRes = await axios.get("https://noice-2ed8.onrender.com/api/playlist/list",{ headers: { Authorization: `Bearer ${token}`}},{ withCredentials: true });
        setPlaylist(playlistRes.data.playlists);
        setLoading(false);
        if (userId) {
          const response = await axios.get(`https://noice-2ed8.onrender.com/api/user/liked-songs/${userId}`, { withCredentials: true });
          setLikedSongs(response.data.likedSongs)
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    })();
  }, []);



  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> liking song



  const likeSong = async (songId) => {
    if (!userId) return;
    try {

      const response = await axios.post("https://noice-2ed8.onrender.com/api/user/like",{ userId, songId },{ withCredentials: true });
      setLikedSongs(response.data.likedSongs);

    } catch (error) {
      console.error("Error liking song", error);
    }
  }



  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> return...  


  const playNow = (song) => {
    
    setCurrentSong(song);
    setIsPlaying(true);
    
    setLastPlayed((prev) => {
      const newHistory = [song, ...prev];
      return newHistory
    });

    if (!queue.find((s) => s._id === song._id)) setQueue((prev) => [...prev, song])

  }

  const addToQueue = (song) => setQueue((prevQueue) => [...prevQueue, song])

  const nextSong = () => {
    
    if (queue.length === 0 || !currentSong) return;

    const currentIndex = queue.findIndex((s) => s._id === currentSong._id);
    let nextIndex;

    if (isShuffle) nextIndex = Math.floor(Math.random() * queue.length);
    else nextIndex = (currentIndex + 1) % queue.length;

    setCurrentSong(queue[nextIndex]);
    setIsPlaying(true)

    setLastPlayed((prev) => {
      const newHistory = [queue[nextIndex], ...prev];
      return newHistory.slice(0, 3);
    })

  }

  const prevSong = () => {

    if (queue.length === 0 || !currentSong) return;

    const currentIndex = queue.findIndex((s) => s._id === currentSong._id);
    const prevIndex = (currentIndex - 1 + queue.length) % queue.length;

    setCurrentSong(queue[prevIndex]);
    setIsPlaying(true);

    setLastPlayed((prev) => {
      const newHistory = [queue[prevIndex], ...prev];
      return newHistory.slice(0, 3);
    })

  }

  const toggleShuffle = () => setIsShuffle((prev) => !prev)

  const clearQueue = () => {
    setQueue([])
    setCurrentSong(null)
    setIsPlaying(false)
  }
  
  return (
    <SongContext.Provider value={{  songs, album, artist, playlist, selectplaylist, setSelectplaylist, likedSongs, likeSong, loading, setLoading, queue, setQueue, currentSong, isPlaying, setIsPlaying, playNow, addToQueue, nextSong, prevSong, toggleShuffle, isShuffle, clearQueue, lastPlayed }}>
      {children}
    </SongContext.Provider>
  )
}

export const useSong = () => useContext(SongContext);