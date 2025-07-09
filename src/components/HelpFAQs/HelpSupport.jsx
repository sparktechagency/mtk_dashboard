import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
export default function HelpSupport() {
    return (
        <div className="pl-12 pt-12 pr-12 bg-[#FCF7E6]  ml-[300px] w-[1620px] min-h-screen">
            <div className="rounded-[8px] bg-white shadow-lg p-12 ">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <Link to="/"><img src="/public/images/users/Frame.png" alt="" /></Link>
                        <h2 className="text-[20px] font-[Inter] font-semibold">Help & Support</h2>
                    </div>

                    {/* justify end */}
                    <div className='flex gap-2'>
                        <img src="/public/images/Help/Font Size.png" alt="" />
                        <img src="/public/images/Help/format.png" alt="" />
                        <img src="/public/images/Help/Section 3.png" alt="" />
                    </div>
                </div>


                {/* Intro */}
                <div className='mb-4'>
                    <h3 className='font-[Inter] font-medium text-[20px] mb-4'>1. Intro</h3>
                    <p className='font-[Inter] font-normal text-[16px] text-[#333333] leading-10'>
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                    </p>
                </div>

                <div>
                    <h3 className='font-[Inter] font-medium text-[20px] mb-4'>2. Details</h3>
                    <p className='font-[Inter] font-normal text-[16px] text-[#333333] leading-10'>
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.There are many variations of passages of Lorem Ipsum available, but the majority.
                    </p>
                </div>

                {/* Button End */}
                <div className="flex justify-center mt-24">
                    <Button
                        type="primary"
                        style={{
                            backgroundColor: '#E4AF00',
                            border: 'none',
                            color: '#FEFEFE',
                            borderRadius: 4,
                            height: '48px',
                            padding: '0 44px',
                            display: 'flex',
                            alignItems: 'center',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: 16,
                        }}
                    >
                        Save Change
                    </Button>
                </div>

            </div>
        </div>
    )
}
