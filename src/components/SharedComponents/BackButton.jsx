import React from 'react'
import { Link } from 'react-router-dom';
import backSign from '/images/users/Frame.png'
export default function BackButton({ text }) {
  return (
    <div className='flex gap-2 items-center'>
      <Link to="/"><img src={backSign} alt="back" /></Link>

      <h2 className="text-[20px] font-[Inter] font-semibold "> {text}</h2>
    </div>
  )
}
