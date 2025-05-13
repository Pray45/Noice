import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const SongContext = createContext();

export const DataProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [album, setAlbum] = useState([]);
  const [artist, setArtist] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId"); 

  useEffect(() => {
    (async () => {
      try {
        const songRes = await axios.get("https://noice-2ed8.onrender.com/api/song/list", { withCredentials: true });
        setSongs(songRes.data.songlist);
        const albumRes = await axios.get("https://noice-2ed8.onrender.com/api/album/list", { withCredentials: true });
        setAlbum(albumRes.data.album);
        const artistRes = await axios.get("https://noice-2ed8.onrender.com/api/artist/list", { withCredentials: true });
        setArtist(artistRes.data.artist);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching songs", err);
      }
    })();
  }, []);

  useEffect(() => {
    if (userId) {
      (async () => {
        try {
          const response = await axios.get(`https://noice-2ed8.onrender.com/api/user/liked-songs/${userId}`, { withCredentials: true });
          setLikedSongs(response.data.likedSongs)
        } catch (err) {
          console.error("Error fetching liked songs", err);
        }
      })();
    }
  }, [userId]);

  const likeSong = async (songId) => {
    if (!userId) return;

    try {
      const response = await axios.post(
        "https://noice-2ed8.onrender.com/api/user/like",
        { userId, songId },
        { withCredentials: true }
      );
      setLikedSongs(response.data.likedSongs);
    } catch (error) {
      console.error("Error liking song", error);
    }
  };

  return (
    <SongContext.Provider value={{ songs, album, artist, likedSongs, likeSong, loading }}>
      {children}
    </SongContext.Provider>
  );
};

export const useSong = () => useContext(SongContext);