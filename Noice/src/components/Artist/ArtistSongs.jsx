import { useParams, Link } from 'react-router-dom';
import { useSong } from '../../contaxt.jsx';
import Songs from "../../new/Songs.jsx";
import Header from "../../new/Header.jsx";

const ArtistSongs = () => {
  const { artistName } = useParams();
  const { songs, artist, likedSongs, likeSong } = useSong();
  const isLiked = (songId) => likedSongs && likedSongs.includes(songId);

  const filteredSongs = songs.filter(song => song.artistalbum === artistName);
  const currentArtist = artist.find(a => a.name === artistName);

  return (
    <div className="text-white w-9/11 bg-gradient-to-r from-[#070011] to-[#1a012c] min-h-screen absolute right-0">
    {currentArtist && ( <Header current={currentArtist} filteredSongs={filteredSongs}/> )}
      <div className="px-10 py-6">
        {filteredSongs.length === 0 ? (
          <p className="text-zinc-400">No songs found in this Artist.</p>
            ) : (
          <div className="flex flex-col gap-4 pb-20">
            <Songs filteredSongs={filteredSongs}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistSongs;
