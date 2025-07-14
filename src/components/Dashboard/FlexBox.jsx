import React from 'react'

export default function FlexBox({text, img, amount}) {
  return (
     <div className='bg-[#FEFEFE] rounded-xl h-[215px]  flex flex-col justify-center items-center gap-4'>
                    <p className='inter-medium-2 '>{text}</p>
                    <img src={img} alt="Frame" />
                    <p className='inter-semibold'>{amount}</p>
                </div>
  )
}
