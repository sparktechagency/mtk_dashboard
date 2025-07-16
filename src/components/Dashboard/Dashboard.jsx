import React from 'react'
import Barchart from './Barchart';
import HelpCenter from './HelpCenter';
import { Outlet } from 'react-router-dom';
import Graph from './Graph';
import FlexBox from './FlexBox';
import Container from '../SharedComponents/Container';
import ProfileUserImg from '/images/profile-user.png';
import LayerOneImg from '/images/Layer_1.png';
import GroupImg from '/images/Group.png';
import LayerTwoImg from '/images/Layer_2.png';


export default function Dashboard() {
    return (
        <>
           
                {/* Dashboard top */}
                <div className=' grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-8  pb-8'>
                    <div>
                        <FlexBox text="Total User" img={ProfileUserImg} amount="852,650"></FlexBox>
                    </div>

                    <div >
                        <FlexBox text="Order Completed" img={LayerOneImg} amount="4,782"></FlexBox>
                    </div>

                    <div>
                        <FlexBox text="Total Income" img={GroupImg} amount="$2,500"></FlexBox>
                    </div>

                    <div>
                        <FlexBox text="Total Products" img={LayerTwoImg} amount="358"></FlexBox>
                    </div>

                </div>

                {/* Dashboard middle */}
                <div className='grid grid-cols-1 lg:grid-cols-2 mb-8 gap-8 '>
                    {/* graph one */}
                    <div >
                        <Graph></Graph>
                    </div>

                    {/* graph two */}
                    <div >
                        <Barchart></Barchart>
                    </div>
                </div>

                {/* Dashboard bottom */}
                <div className=''>
                    <HelpCenter></HelpCenter>
                </div>
          

        </>
    )
}
