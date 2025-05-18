import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> importing all components

import Layout from './Layout.jsx';
import Home from './components/Home/Home.jsx';
import Album from './components/Album/Album.jsx';
import Artist from './components/Artist/Artist.jsx';
import Liked from './components/Liked/Liked.jsx';
import Playlist from './components/Playlists/Playlist.jsx';
import AddSong from './components/AddSong.jsx';
import AddSongByAdmin from './Admin/AddSongByAdmin.jsx';
import SongList from './components/Song/SongList.jsx';
import Login from './components/LogReg/Login.jsx';
import Register from './components/LogReg/Register.jsx';
import AlbumSongs from './components/Album/AlbumSongs.jsx';
import ArtistSongs from './components/Artist/ArtistSongs.jsx';
import PlaylistSongs from './components/Playlists/Playlistsongs.jsx';

function App() {

  const isLoggedIn = localStorage.getItem('loggedIn') == 'true'; //checking is user loggedin or not by token

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {isLoggedIn ? (
            <Route path="/" element={<Layout />}>

              <Route index element={<Home />} />
              <Route path="/song" element={<SongList />} />
              <Route path="/album" element={<Album />} />
              <Route path="/album/:albumName" element={<AlbumSongs />} />
              <Route path="/artist" element={<Artist />} />
              <Route path="/artist/:artistName" element={<ArtistSongs />} />
              <Route path="/liked" element={<Liked />} />
              <Route path="/playlist" element={<Playlist />} />
              <Route path="/playlist/:something" element={<PlaylistSongs />} />
              <Route path="/add" element={<AddSong />} />
              <Route path="/addbyadmin" element={<AddSongByAdmin />} />

            </Route>
            ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;