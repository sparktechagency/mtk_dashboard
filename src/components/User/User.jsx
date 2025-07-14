import { useState } from 'react';
import { Table, Avatar, Input, Button, Space } from 'antd';
import './User.css'
import Container from '../SharedComponents/Container';
import BackButton from '../SharedComponents/BackButton';
import SearchButton from '../SharedComponents/SearchButton';
import CustomPagination from '../SharedComponents/CustomPagination';


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
    <>
      <Container>
        <div className='bg-white p-6 rounded-[8px] shadow-lg '>
          <div className="mb-6 flex justify-between items-center ">
            <BackButton text="User Management"></BackButton>
            <SearchButton></SearchButton>

          </div>

          <Table
            className='custom-table'
            columns={columns}
            dataSource={data}
            pagination={CustomPagination({ currentPage, setCurrentPage})}
            bordered={false}
          />
        </div>
      </Container>

    </>
  )
}
