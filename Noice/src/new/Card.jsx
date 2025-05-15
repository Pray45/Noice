import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function Card({type , sec}) {

  return (
    <>
        {
            type.map((e, index) => (
                <Link to={`/${encodeURIComponent(sec)}/${encodeURIComponent(e.name)}`} key={index}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} key={e._id} className='pt-0.5 pl-0.5 pr-0.5 scale-90 w-50 h-65 cursor-pointer hover:bg-[#171120] rounded-2xl'>
                    <img className='w-45 h-45 rounded-2xl justify-self-center mt-3 object-cover object-top' src={e.img} alt="" />
                    <h1 className='pl-5 pt-1'>{e.name}</h1>
                    <p className='text-xs mr-10 pl-5 pt-2 text-zinc-500 truncate'>{e.desc}</p>
                </motion.div>
              </Link>
            ))
        }
    </>
  )
}

export default Card