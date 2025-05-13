import { Link } from 'react-router-dom';
import {motion} from "framer-motion"
import { useSong } from '../../contaxt';

function Album() {
  
  const {album} = useSong()

  return album.length === 0 ? (
    <div className='bg-[#070011] flex justify-center items-center w-9/11 min-h-screen absolute right-0 text-white'>
      <h1 className='text-5xl animate-pulse'>Loading...</h1>
    </div>
    ) : (
      <div className='w-9/11 bg-gradient-to-r from-[#070011] to-[#1a012c] min-h-screen absolute right-0 text-white px-10 py-8'>
        <div  className='flex flex-wrap ml-5 gap-8'>
          {
            album.map((e, index) => (
              <Link to={`/album/${encodeURIComponent(e.name)}`} key={index}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} key={e._id} className='pt-0.5 pl-0.5 pr-0.5 scale-90 w-50 h-65 cursor-pointer hover:bg-[#171120] rounded-2xl'>
                    <img className='w-45 h-45 rounded-2xl justify-self-center mt-3 object-cover object-top' src={e.img} alt="" />
                    <h1 className='pl-5 pt-1'>{e.name}</h1>
                    <p className='text-xs mr-10 pl-5 pt-2 text-zinc-500 truncate'>{e.desc}</p>
                </motion.div>
              </Link>
            ))
          }
        </div>
      </div>
  )
}

export default Album