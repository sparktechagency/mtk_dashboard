import React, { useState } from 'react';
import { Table, Tag, Button, Avatar, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import DetailsModal from './DetailsModal';
import './order.css';
import EditModal from './EditModal';


const { Search } = Input;

const data = [
  {
    key: '1',
    name: 'Annette Black',
    date: '12/03/25',
    total: '$58',
    address: 'West Greenwich, RI7',
    payment: 'Paid',
    status: 'Completed',
    avatar: '/public/images/users/user1.png',
  },
  {
    key: '2',
    name: 'Jerome Bell',
    date: '12/03/25',
    total: '$77',
    address: 'Jericho, NY 11753',
    payment: 'Pending',
    status: 'Canceled',
    avatar: '/public/images/users/user2.png',
  },
  {
    key: '3',
    name: 'Ronald Richards',
    date: '12/03/25',
    total: '$28',
    address: 'Aurora, OR 97002',
    payment: 'Paid',
    status: 'Completed',
    avatar: '/public/images/users/user3.png',
  },
  {
    key: '4',
    name: 'Dianne Russell',
    date: '12/03/25',
    total: '$94',
    address: 'Midland Park, NJ 072',
    payment: 'Paid',
    status: 'Shipped',
    avatar: '/public/images/users/user4.png',
  },
  {
    key: '5',
    name: 'Albert Flores',
    date: '12/03/25',
    total: '$55',
    address: 'Saint Cloud, FL 349',
    payment: 'Pending',
    status: 'Completed',
    avatar: '/public/images/users/user5.png',
  },
  {
    key: '6',
    name: 'Eleanor Pena',
    date: '12/03/25',
    total: '$85',
    address: 'Vineland, NJ 08360',
    payment: 'Paid',
    status: 'In Progress',
    avatar: '/public/images/users/user6.png',
  },
  {
    key: '7',
    name: 'Floyd Miles',
    date: '12/03/25',
    total: '$68',
    address: 'Castleton On Hudson',
    payment: 'Pending',
    status: 'Canceled',
    avatar: '/public/images/users/user7.png',
  },
  {
    key: '8',
    name: 'Cody Fisher',
    date: '12/03/25',
    total: '$30',
    address: 'Rockford, IL 61109',
    payment: 'Paid',
    status: 'Shipped',
    avatar: '/public/images/users/user8.png',
  },
  {
    key: '9',
    name: 'Ralph Edwards',
    date: '12/03/25',
    total: '$45',
    address: 'Anna Maria, FL 346',
    payment: 'Paid',
    status: 'Completed',
    avatar: '/public/images/users/user9.png',
  },
  {
    key: '10',
    name: 'Devon Lane',
    date: '12/03/25',
    total: '$24',
    address: 'Mountain View, C 3',
    payment: 'Pending',
    status: 'Shipped',
    avatar: '/public/images/users/user10.png',
  },
];

const getTagColor = (status, type) => {
  if (type === 'payment') {
    return status === 'Paid' ? 'green' : 'orange';
  }
  if (type === 'order') {
    switch (status) {
      case 'Completed':
        return 'green';
      case 'Canceled':
        return 'red';
      case 'Shipped':
        return 'gold';
      case 'In Progress':
        return 'blue';
      default:
        return 'default';
    }
  }
};


export default function Orders() {

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedEditOrder, setSelectedEditOrder] = useState(null);


  const handleView = (record) => {
    setSelectedOrder(record);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setSelectedEditOrder(record);
    setIsEditModalVisible(true);
  };


  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setSelectedEditOrder(null);
  };


  const columns = [
    {
      title: 'Order No.',
      dataIndex: 'key',
      key: 'orderNo',
      render: () => '#1233',
    },
    {
      title: 'Customer Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Avatar src={record.avatar} style={{ width: 48, height: 48, borderRadius: 8 }} />
          {text}
        </Space>
      ),
    },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Total', dataIndex: 'total', key: 'total' },
    { title: 'Shipping Address', dataIndex: 'address', key: 'address' },
    {
      title: 'Payment Status',
      dataIndex: 'payment',
      key: 'payment',
      align: 'center',
      render: (status) => (
        <Tag
          color={getTagColor(status, 'payment')}
          style={{
            borderRadius: 226,
            width: 125,
            height: 36,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Inter',
          }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'Order Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status) => (
        <Tag
          color={getTagColor(status, 'order')}
          style={{
            borderRadius: 226,
            width: 125,
            height: 36,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Inter',
          }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space>
          <a type="text" onClick={() => handleView(record)}>
            <img src="/public/images/view.png" alt="view" />
          </a>
          <a type="text" onClick={() => handleEdit(record)}>
            <img src="/public/images/edit.png" alt="edit" />
          </a>
        </Space>
      ),
    },
  ];


  return (


    <div className="pl-6 pt-6 pr-12 bg-[#FCF7E6] md:ml-[300px] md:w-[1620px] min-h-screen">
      <div className="bg-white p-6 rounded-[8px] shadow-lg">
        <div className="mb-6 flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Link to="/">
              <img src="/public/images/users/Frame.png" alt="back" />
            </Link>
            <h2 className="text-[20px] font-[Inter] font-semibold">Order Management</h2>
          </div>
          <Input
            className="custom-search"
            placeholder="Search here..."
            prefix={<SearchOutlined style={{ color: '#E4AF00', fontSize: 20 }} />}
            style={{ width: 300, height: 44, marginRight: 24 }}
          />
        </div>

        <Table
          className="custom-table"
          columns={columns}
          dataSource={data}
          pagination={{
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
                if (page === 4) return <span className="custom-page"> </span>;
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

      {/* View Modal */}
      <DetailsModal open={isModalVisible} onCancel={handleCancel} order={selectedOrder} />

      {/* Edit modal */}
      <EditModal
        open={isEditModalVisible}
        onCancel={handleEditCancel}
        initialStatus={selectedEditOrder?.status}
        initialPayment={selectedEditOrder?.payment}
      />

    </div>
  )
}
