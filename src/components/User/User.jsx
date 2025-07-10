import React, { useState } from 'react';
import { Table, Avatar, Input, Button, Space } from 'antd';
import { SearchOutlined, StopOutlined } from '@ant-design/icons';
import './User.css'
import { Link } from 'react-router-dom';
const { Search } = Input;

// Dummy data
const data = Array.from({ length: 10 }, (_, index) => ({
  key: index,
  sl: '#1233',
  name: ['Annette Black', 'Jerome Bell', 'Ronald Richards', 'Dianne Russell', 'Albert Flores', 'Eleanor Pena', 'Floyd Miles', 'Cody Fisher', 'Ralph Edwards', 'Devon Lane'][index],
  email: index < 2 ? ['bockely@att.com', 'csilvers@rizon.com'][index] : 'xterris@gmail.com',
  phone: [
    '(907) 555-0101', '(270) 555-0117', '(219) 555-0114', '(252) 555-0126',
    '(217) 555-0113', '(480) 555-0103', '(205) 555-0100', '(603) 555-0123',
    '(684) 555-0102', '(406) 555-0120'
  ][index],
  address: [
    'West Greenwich, RI7', 'Jericho, NY 11753', 'Aurora, OR 97002', 'Midland Park, NJ 072',
    'Saint Cloud, FL 349', 'Vineland, NJ 08360', 'Castleton On Hudson', 'Rockford, IL 61109',
    'Anna Maria, FL 346', 'Mountain View, C 3'
  ][index],
  avatar: `/images/users/user${index + 1}.png`, 
}));

// Columns
const columns = [
  {
    title: 'SL No.',
    dataIndex: 'sl',
    key: 'sl',
    
  },
  {
    title: 'Full Name',
    key: 'name',
    render: (_, record) => (
      <Space>
        <Avatar src={record.avatar} 
        style={{ width: 48, height: 48, borderRadius: 8 }}
        shape="square"
        />
        {record.name}
      </Space>
    ),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Mobile Number',
    dataIndex: 'phone',
    key: 'phone',
    align: 'center',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    align: 'center',
  },
  {
    title: 'Action',
    key: 'action',
    
    render: () => (
      
      <a><img src="/public/images/users/danger.png" alt="Danger" /></a>
    ),
    
  },
];


export default function User() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="pl-6 pt-6 pr-12 bg-[#FCF7E6]  md:ml-[300px] md:w-[1620px] min-h-screen">
      <div className='bg-white p-6 rounded-[8px] shadow-lg'>
        <div className="mb-6 flex justify-between items-center ">
          <div className='flex gap-2 items-center'>
            <Link to="/"><img src="/public/images/users/Frame.png" alt="" /></Link>

            <h2 className="text-[20px] font-[Inter] font-semibold "> User Management</h2>
          </div>
          <Input
            className="custom-search"
            placeholder="Search here..."
            prefix={<SearchOutlined style={{ color: '#E4AF00', fontSize: 20 }} />}
            onPressEnter={(e) => console.log(e.target.value)}
            style={{ width: 300, height: 44 }}
          />

        </div>

        <Table
          className='custom-table'
          columns={columns}
          dataSource={data}


           pagination={{
            // className: 'flex justify-center items-center gap-1',
            position: ['bottomCenter'],
            current: currentPage,
            total: 1000,
            pageSize: 10,
            onChange: (page) => setCurrentPage(page),
            showSizeChanger: false,
            showLessItems: true,
            itemRender: (page, type, originalElement) => {
              if (type === 'page') {
                if ([1, 2, 3, 100].includes(page)) {
                  return (
                    <span className={page === currentPage ? 'custom-page-active' : 'custom-page'}>
                      {page}
                      {page !== 100 && page !== 3 ? ' ,' : ''}
                    </span>
                  );
                }
                if (page === 4) {
                  return <span className="custom-page"> </span>;
                }
                return null;
              }

              if (type === 'prev') {
                return (
                  <span className="pagination-btn">
                    <span className="arrow">{originalElement}</span>
                    <span className="label">Previous</span>
                  </span>
                );
              }

              if (type === 'next') {
                return (
                  <span className="pagination-btn">
                    <span className="label">Next</span>
                    <span className="arrow">{originalElement}</span>
                  </span>
                );
              }

              return originalElement;
            },
          }}
          bordered={false}
        />
      </div>

    </div>
  )
}
