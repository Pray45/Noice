import { useParams, Link } from 'react-router-dom';
import { useSong } from '../../contaxt.jsx';
import Songs from "../../new/Songs.jsx";
import Header from "../../new/Header.jsx";

const AlbumSongs = () => {
  const { albumName } = useParams();
  const { songs, album, likedSongs, likeSong } = useSong();
  const isLiked = (songId) => likedSongs && likedSongs.includes(songId);

  const filteredSongs = songs.filter(song => song.album === albumName);
  const currentAlbum = album.find(a => a.name === albumName);

  return (
    <div className="text-white w-9/11 bg-gradient-to-r from-[#070011] to-[#1a012c] min-h-screen absolute right-0">

      {currentAlbum && ( <Header current={currentAlbum} filteredSongs={filteredSongs} type="Album" />)}
      
      <div className="px-10 py-6">
        
        {filteredSongs.length === 0 ? (
          
          <p className="text-zinc-400">No songs found in this album.</p>
          ) : (
          
          <div className="flex flex-col gap-4">
            <Songs filteredSongs={filteredSongs}/>
          </div>

          )}

      </div>
      
    </div>
  );
};

export default AlbumSongs;
