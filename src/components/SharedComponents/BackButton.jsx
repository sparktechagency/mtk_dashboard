import React from 'react'
import { Link } from 'react-router-dom';
export default function BackButton({ text }) {
  return (
    <div className='flex gap-2 items-center'>
      <Link to="/"><img src="/images/users/Frame.png" alt="back" /></Link>

      <h2 className="text-[20px] font-[Inter] font-semibold "> {text}</h2>
    </div>
  )
}
