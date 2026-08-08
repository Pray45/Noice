// context.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import api from "./api";

const SongContext = createContext();

export const DataProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [album, setAlbum] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [selectplaylist, setSelectplaylist] = useState(null);
  const [artist, setArtist] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [queue, setQueue] = useState([]);
  const [currentsng, setCurrentsng] = useState(null);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [handleTime, setHandleTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        // Fetch public catalog data concurrently
        const [songRes, albumRes, artistRes] = await Promise.allSettled([
          api.get("/api/song/list"),
          api.get("/api/album/list"),
          api.get("/api/artist/list")
        ]);

        if (isMounted) {
          if (songRes.status === "fulfilled" && songRes.value.data?.songlist) {
            setSongs(songRes.value.data.songlist);
          }
          if (albumRes.status === "fulfilled" && albumRes.value.data?.album) {
            setAlbum(albumRes.value.data.album);
          }
          if (artistRes.status === "fulfilled" && artistRes.value.data?.artist) {
            setArtist(artistRes.value.data.artist);
          }
        }

        // Fetch user-specific data if logged in
        if (token) {
          try {
            const playlistRes = await api.get("/api/playlist/list");
            if (isMounted && playlistRes.data?.playlists) {
              setPlaylist(playlistRes.data.playlists);
            }
          } catch (error) {
            console.error("Error fetching playlists", error);
          }
        }

        if (userId) {
          try {
            const likedRes = await api.get(`/api/user/liked-songs/${userId}`);
            if (isMounted && likedRes.data?.likedSongs) {
              setLikedSongs(likedRes.data.likedSongs);
            }
          } catch (error) {
            console.error("Error fetching liked songs", error);
          }
        }
      } catch (error) {
        console.error("Error in initial data fetch", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [token, userId]);

  const likeSong = async (songId) => {
    const currentUserId = localStorage.getItem("userId");
    if (!currentUserId) return;
    try {
      const response = await api.post("/api/user/like", { userId: currentUserId, songId });
      if (response.data?.likedSongs) {
        setLikedSongs(response.data.likedSongs);
      }
    } catch (error) {
      console.error("Error liking song", error);
    }
  };

  return (
    <SongContext.Provider
      value={{
        handleTime, setHandleTime,
        duration, setDuration,
        songs, setSongs,
        setSonglist: setSongs,
        album, setAlbum,
        artist, setArtist,
        playlist, setPlaylist,
        selectplaylist, setSelectplaylist,
        likedSongs, setLikedSongs,
        likeSong,
        loading, setLoading,
        queue, setQueue,
        currentsng, setCurrentsng,
        repeat, setRepeat,
        shuffle, setShuffle,
        isPlaying, setIsPlaying
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const useSong = () => useContext(SongContext);
