import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import Home from './components/Home/Home.jsx'
import Layout from './Layout.jsx';
import Songs from './components/Song/Songs.jsx';
import Album from './components/Album/Album.jsx';
import Artist from './components/Artist/Artist.jsx';
import Liked from './components/Liked/Liked.jsx';
import Playlist from './components/Playlists/Playlist.jsx';

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
      ]
    }
  ]);
  return (
    <RouterProvider router={router} />
  )
}
export default App