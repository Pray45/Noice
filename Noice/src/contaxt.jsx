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


  
  return (
    <SongContext.Provider value={{ songs, album, artist, playlist, setLoading, likedSongs, likeSong, loading, selectplaylist, setSelectplaylist }}>
      {children}
    </SongContext.Provider>
  );
};

export const useSong = () => useContext(SongContext);