// src/components/Layout/Layout.jsx
import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout({ children }) {
  return (

    <div className='flex justify-between  '>
 
            <div className='fixed'>
                <Sidebar />
            </div>
           
            <div className='  '>
                <Navbar />
                <div className=' '>
                    <Outlet />
                </div>
            </div>
        </div>
  );
}
