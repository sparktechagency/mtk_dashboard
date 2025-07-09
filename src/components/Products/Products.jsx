import React, { useState } from 'react';
import { Table, Tag, Button, Avatar, Input, Space } from 'antd';
import { EyeOutlined, EditOutlined, SearchOutlined, StopOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './products.css';
import ProductDetailsModal from './ProductDetailsModal';
import AddProductModal from './AddProductModal';

const data = [
  {
    key: '1',
    ItemName: 'Pokemon Assorted booster Packs',
    category: 'Pokémon',
    price: '$58',

    status: 'In Stock',

  },
  {
    key: '2',
    ItemName: 'Victory Training Tee',
    category: 'Bucketball',
    price: '$77',

    status: 'In Stock',
  },
  {
    key: '3',
    ItemName: 'Champion’s Workout Tee',
    category: 'Pokémon',
    price: '$28',

    status: 'Stock Out',
  },
  {
    key: '4',
    ItemName: 'Great Ball Mystery Bag',
    category: 'Gulf',
    price: '$94',

    status: 'Up-Coming',
  },
  {
    key: '5',
    ItemName: 'Pokemon Assorted booster Packs',
    category: 'Bucketball',
    price: '$55',

    status: 'In Stock',
  },
  {
    key: '6',
    ItemName: 'Victory Training Tee',
    category: 'Hockey',
    price: '$85',

    status: 'In Stock',
  },
  {
    key: '7',
    ItemName: 'Pokémon TCG Collectors',
    category: 'Pokémon',
    price: '$68',

    status: 'Stock Out',
  },
  {
    key: '8',
    ItemName: 'Great Ball Mystery Bag',
    category: 'Bucketball',
    price: '$30',

    status: 'In Stock',
  },
  {
    key: '9',
    ItemName: 'Victory Training Tee',
    category: 'Hockey',
    price: '$45',

    status: 'Up-Coming',
  },
  {
    key: '10',
    ItemName: 'Pokemon Assorted booster Packs',
    category: 'Pokémon',
    price: '$24',

    status: 'Stock Out',
  },
];

const getTagColor = (status, type) => {
  if (type === 'status') {
    switch (status) {
      case 'In Stock':
        return 'green';
      case 'Stock Out':
        return 'red';

      case 'Up-Coming':
        return 'blue';
      default:
        return 'default';
    }
  }
};


export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editProduct, setEditProduct] = useState(null);



  const columns = [
    {
     title: 'SL No.',
      dataIndex: 'key',
      key: 'SLNo',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Item Name',
      dataIndex: 'ItemName',
      key: 'ItemName',
      render: (text) => (
        <Space>

          {text}
        </Space>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',

    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Tag
            color={getTagColor(status, 'status')}
            style={{
              borderRadius: 226,
              width: 125,
              height: 36,
              fontFamily: 'Inter',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {status}
          </Tag>
        </div>
      ),
    },

    {
      title: 'Details',
      key: 'details',
      align: 'center',
      render: (_, record) => (
        <Space>
          <a
            onClick={() => {
              setSelectedProduct(record);
              setModalOpen(true);
            }}
            style={{ cursor: 'pointer' }}
          >
            <img src="/public/images/view.png" alt="view" />
          </a>
        </Space>
      ),
    },

    {
      title: 'Action',
      key: 'action',
      align: 'center',
     render: (_, record) => (
        <Space>
          <a
            onClick={() => {
              setIsEditMode(true);
              setEditProduct(record);
              setIsAddModalOpen(true);
            }}
          >
            <img src="/public/images/edit.png" alt="edit" style={{ cursor: 'pointer' }} />
          </a>
          <a><img src="/public/images/delete.png" alt="delete" /></a>
        </Space>
      ),
    },
  ];



  return (
    <div className="pl-6 pt-6 pr-12 bg-[#FCF7E6]  ml-[300px] w-[1620px] min-h-screen">
      <div className='bg-white p-6 rounded-[8px] shadow-lg'>
        <div className="mb-6 flex justify-between items-center ">
          <div className='flex gap-2 items-center'>
            <Link to="/"><img src="/public/images/users/Frame.png" alt="" /></Link>

            <h2 className="text-[20px] font-[Inter] font-semibold ">Products</h2>
          </div>
          <Button
            type="primary"

            icon={<PlusOutlined />}
            onClick={() => {
              setIsEditMode(false);      // Add mode
              setEditProduct(null);
              setIsAddModalOpen(true);
            }}
            style={{
              backgroundColor: '#E4AF00',
              border: 'none',
              color: '#FEFEFE',
              borderRadius: 4,
              height: '48px',
              padding: '0 44px',     // Keep horizontal padding, remove vertical
              display: 'flex',
              alignItems: 'center',  // Center icon and text vertically
              fontFamily: 'Inter, sans-serif',
              fontSize: 16,
              marginRight: 32,

            }}
          >
            Add New
          </Button>
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


        {/* Details modal */}
        <ProductDetailsModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          product={selectedProduct}  // pass selected product info to modal
        />

        {/* Add/Edit Product Modal */}
        <AddProductModal
          open={isAddModalOpen}
          onCancel={() => {
            setIsAddModalOpen(false);
            setEditProduct(null);
          }}
          onAdd={(values) => {
            console.log(isEditMode ? 'Edited Product:' : 'New Product:', values);
            setIsAddModalOpen(false);
            setEditProduct(null);
          }}
          isEdit={isEditMode}
          product={editProduct}
        />


      </div>

    </div>
  )
}
