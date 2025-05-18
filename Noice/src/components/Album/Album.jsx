import { useSong } from '../../contaxt';
import Songwave from '../loading/Songwave';
import Card from '../../new/Card.jsx';

function Album() {
  
  const {album} = useSong()

  return album.length === 0 ? (
    
    <div className='bg-[#070011] flex justify-center items-center w-9/11 min-h-screen absolute right-0 text-white'>
      <Songwave/>
    </div>

    ) : (

      <div className='w-9/11 bg-gradient-to-r from-[#070011] to-[#1a012c] min-h-screen absolute right-0 text-white px-10 py-8'>
        <div  className='flex flex-wrap ml-5 gap-8'>
          <Card type={album} sec={"album"} />
        </div>
      </div>

  )
}

export default Album