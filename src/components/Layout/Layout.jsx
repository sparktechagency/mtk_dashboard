// src/components/Layout/Layout.jsx
import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Container from '../SharedComponents/Container'; // Import container

export default function Layout() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed h-screen md:w-[26%] lg:w-[16%]">
        <Sidebar />
      </div>

      {/* Main Content (Navbar + Page Content) */}
      <div className="ml-[26%] lg:ml-[16%] w-full">
        <Navbar />
        <Container>
          <Outlet />
        </Container>
      </div>
    </div>
  );
}
