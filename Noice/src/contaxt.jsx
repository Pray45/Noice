import React, { createContext, useState, useEffect, useContext, Children } from "react";
import axios from "axios";

const SongContext = createContext()

export const DataProvider = ({ children }) => {

    const [songs, setSongs] = useState([])
    const [album , setAlbum] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentSong, setCurrentSong] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [audioRef] = useState(new Audio())

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get('https://noice-2ed8.onrender.com/api/song/list')
                setSongs(res.data.songlist)
                setLoading(false)
            } catch (err) {
                console.error("Error fetching songs", err)
          }
        })() 
      }, []);

    const OnLike = async (id, currentLiked) => {

        setSongs(prevSongs =>
          prevSongs.map(song =>
            song._id === id ? { ...song, liked: !currentLiked } : song
          )
        )

        try {
            await axios.put(`https://noice-2ed8.onrender.com/api/song/update/${id}`, {
            liked: !currentLiked,
          })
        } catch (error) {
          console.error("Error toggling like", error)
        }
    }

    useEffect(() => {
      (async() => { 
        const res = await axios.get("https://noice-2ed8.onrender.com/api/album/list")
        setAlbum(res.data.album)
      })()
    },[])


    const playSong = (song) => {
      if (!song) return;
      if (song.audio !== currentSong?.audio) {
        audioRef.pause();
        audioRef.src = song.audio;
        audioRef.load();
      }
      setCurrentSong(song);
      audioRef.play();
      setIsPlaying(true);
    };

    const pauseSong = () => {
      audioRef.pause();
      setIsPlaying(false);
    };
    
    
    
    return(
        <SongContext.Provider value={{songs, setSongs, loading, OnLike, album, currentSong, setCurrentSong, isPlaying, setIsPlaying, playSong, pauseSong}}>
            {children}
        </SongContext.Provider>
    )
}

export const useSong = () => useContext(SongContext)