import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const SongContext = createContext()

export const DataProvider = ({ children }) => {

    const [songs, setSongs] = useState([]);
    const [album , setAlbum] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const songres = await axios.get('https://noice-2ed8.onrender.com/api/song/list', {withCredentials: true})
                setSongs(songres.data.songlist)
                const albumres = await axios.get("https://noice-2ed8.onrender.com/api/album/list", {withCredentials: true})
                setAlbum(albumres.data.album)
                setLoading(false)
            } catch (err) {
                console.error("Error fetching songs", err)
          }
        })() 
      }, []);
    
    return(
        <SongContext.Provider value={{songs, loading, album }}>
            {children}
        </SongContext.Provider>
    )
}

export const useSong = () => useContext(SongContext)
