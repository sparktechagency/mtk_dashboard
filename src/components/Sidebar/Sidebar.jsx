import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineUserCircle } from "react-icons/hi2";
import { MdOutlineCategory } from "react-icons/md";
import { FiBox, FiLogOut } from "react-icons/fi";
import { MdOutlineStore, MdListAlt } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import {
    AppstoreOutlined,
    
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import logo from '/images/triplem_logo.png'
import './sidebar.css'



const items = [
    { key: '1', icon: <AppstoreOutlined style={{ fontSize: '24px' }} />, label: <Link to="/">Dashboard</Link> },
    { key: '2', icon: <HiOutlineUserCircle size={24} />, label: <Link to="/user-management">User Management</Link> },
    { key: '3', icon: <MdListAlt size={24} />, label: <Link to="/order-management">Order Management</Link> },
    { key: '4', icon: <MdOutlineCategory size={24} />, label: <Link to="/category">Categories</Link> },
    { key: '5', icon: <FiBox size={24} />, label: <Link to="/products">Products</Link> },
    {
        key: 'sub1',
        label: 'Help & FAQs',
        icon: <MdOutlineStore size={24} />,
        children: [
            { key: '6', label: <Link to="/help-support">Help & Support</Link>},
            { key: '7', label: <Link to="/FAQs">FAQs</Link>  },

        ],
    },
    {
        key: 'sub2',
        label: 'Settings',
        icon: <IoSettingsOutline size={24} />,
        children: [
            { key: '8', label: <Link to="/profile">Profile</Link>},
            { key: '9', label: <Link to="/about">About Us</Link>},
            { key: '10', label: <Link to="/terms-contiditions">Terms & Conditions</Link>},
            { key: '11', label: <Link to="/privacy-policy">Privacy Policy</Link> },

        ],
    },
];



export default function Sidebar() {
    // const [size, setSize] = useState('large');
    return (
        <div className=' min-h-screen flex flex-col justify-between '>

            {/* Top Section */}
            <div >
                {/* Logo */}
                <div>
                    <img className=' md:w-[252px] h-[80px] object-cover mt-[16px] mb-[24px]' src={logo} alt="logo" />
                </div>

                {/* Menu */}
                <Menu
                    className="custom-sidebar-menu inter-medium"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="light"

                    items={items}
                />

            </div>


            {/* Bottom Section */}
            <div className="mr-2 ">
                <Link to="/login">
                <Button
                    className="logout-button inter-medium "
                    type="text"
                    icon={<FiLogOut style={{ fontSize: '24px' }}/>}
                    
                >
                    Log out
                </Button>
                </Link>
            </div>


        </div>

    )
}
