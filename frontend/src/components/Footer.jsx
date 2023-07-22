import React from 'react'
import {FiTwitter, FiFacebook, FiInstagram} from 'react-icons/fi'

function Footer() {
  return (
    <div className='bg-blue-500 pb-2 pl-6'>
        <div className='footer flex justify-center items-center h-[80px]'>
            <div className='flex space-x-4'>
                <FiTwitter className='text-white text-2xl'/>
                <FiFacebook className='text-white text-2xl'/>
                <FiInstagram className='text-white text-2xl'/>
            </div>
           
        </div>
        <h1
        className='text-white font-semibold text-center'
        >
                Made with ❤️ With <a
                className="underline text-blue-800"
                 href="https://vitejs.dev/">Vite</a>
            </h1>
    </div>
  )
}

export default Footer