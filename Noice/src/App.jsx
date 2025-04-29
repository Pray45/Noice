import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import Home from './components/Home/Home.jsx'
import Layout from './Layout.jsx';
import Songs from './components/Song/Songs.jsx';
import Album from './components/Album/Album.jsx';
import Artist from './components/Artist/Artist.jsx';
import Liked from './components/Liked/Liked.jsx';
import Playlist from './components/Playlists/Playlist.jsx';
import AddSong from './components/AddSong.jsx';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },         
        { path: "/song", element: <Songs/> },   
        { path: "/album", element: <Album/> },
        { path: "/artist", element: <Artist/> },
        { path: "/liked", element: <Liked/> },
        { path: "/playlist", element: <Playlist/> },
        { path: "/add", element: <AddSong/> },
      ]
    }
  ]);
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover draggable/>
      <RouterProvider router={router} />
    </>
  )
}
export default App