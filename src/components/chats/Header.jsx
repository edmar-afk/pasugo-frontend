import React from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

function Header() {
  const navigate = useNavigate()

  return (
    <div className='fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg p-4 flex items-center gap-3 shadow-md'>
      <button
        onClick={() => navigate(-1)}
        className='p-2 rounded-full bg-gray-500 hover:bg-gray-300 transition'
      >
        <ArrowBackIosIcon fontSize='small' className='ml-1 -mr-1'/>
      </button>
      <p className='font-semibold text-lg text-gray-800'>User sample</p>
    </div>
  )
}

export default Header
