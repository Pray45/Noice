import React from 'react'

function TopAlbum() {
  return (
    <div className='text-white pl-5 pt-10'>
        <div className='flex justify-between mb-10 mr-10 mt-30 items-end'>
            <h1 className='text-3xl'>Albums</h1>
            <h1 className='text-md mb-10 cursor-pointer text-[#635972] hover:text-white duration-500'>Show All</h1>
        </div>


        <div className='flex'>
            <div className='w-50 h-65 cursor-pointer hover:bg-[#171120] rounded-2xl'>
                <img className='w-45 h-45 rounded-2xl justify-self-center mt-3 object-cover object-top' src="./snow.webp" alt="" />
                <h1 className='pl-5 pt-1'>Jon Snow's album</h1>
                <p className='text-xs pl-5 pt-0.5 text-zinc-500'>adipisicing elit.adipisicing elit. Natus, quaerat.</p>
            </div>
        </div>

    </div>
  )
}

export default TopAlbum