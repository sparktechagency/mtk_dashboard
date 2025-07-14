import React from 'react'

export default function Container({ children }) {
  return (
    <div className='bg-[#FCF7E6] md:ml-[300px]  lg:w-[1620px] pl-8  pr-12  pt-8 min-h-screen'>
        {children}
    </div>
  )
}
