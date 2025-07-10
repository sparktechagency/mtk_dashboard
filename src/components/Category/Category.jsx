import React, { useState } from 'react';
import { Table, Button, Space } from 'antd';
import { LeftOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './Category.css';
import AddModal from '../SharedComponents/AddModal';

export default function Category() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentCategory, setCurrentCategory] = useState('');
    const handleAddClick = () => {
        setIsEditMode(false);
        setCurrentCategory('');
        setIsModalOpen(true);
    };

    const handleEdit = (record) => {
        setIsEditMode(true);
        setCurrentCategory(record.name);
        setIsModalOpen(true);
    };


    

    // Dummy category data
    const data = [
        { key: 1, sl: '#1233', name: 'Pokémon' },
        { key: 2, sl: '#1233', name: 'Bucketball' },
        { key: 3, sl: '#1233', name: 'Football' },
        { key: 4, sl: '#1233', name: 'Baseball' },
        { key: 5, sl: '#1233', name: 'Hockey' },
        { key: 6, sl: '#1233', name: 'Gulf' },
        { key: 7, sl: '#1233', name: 'Tennis' },
    ];

    // Table columns
    const columns = [
        {
            title: 'SL No.',
            dataIndex: 'sl',
            key: 'sl',
        },
        {
            title: 'Category Name',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
        },
        {
            title: 'Action',
            key: 'action',
            align: 'right',
            render: (_, record) => (
                <Space>
                    <a onClick={() => handleEdit(record)}>
                        <img src="/public/images/edit.png" alt="edit" />
                    </a>
                    <a><img src="/public/images/delete.png" alt="delete" /></a>
                </Space>
            )

        },
    ];

    return (
        <div className="pl-12 pt-12 pr-12 bg-[#FCF7E6]  md:ml-[300px] md:w-[1620px] min-h-screen">
            <div className="rounded-[8px] bg-white shadow-lg p-12">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <Link to="/"><img src="/public/images/users/Frame.png" alt="" /></Link>
                        <h2 className="text-[20px] font-[Inter] font-semibold">Categories</h2>
                    </div>
                    <Button
                        type="primary"

                        icon={<PlusOutlined />}
                        onClick={handleAddClick}
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

                        }}
                    >
                        Add New
                    </Button>

                    {/* Modal shown on button click */}
                    <AddModal
                        open={isModalOpen}
                        onCancel={() => setIsModalOpen(false)}
                        onAdd={(name) => {
                            if (isEditMode) {
                                console.log('Edited:', name);
                            } else {
                                console.log('Added:', name);
                            }
                            setIsModalOpen(false);
                        }}
                        fieldLabel="Category Name"
                        fieldName="categoryName"
                        placeholder="Enter category name"
                        initialValue={currentCategory}
                        isEdit={isEditMode}
                    />


                </div>

                {/* Table */}
                <Table
                    className='custom-table'
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    bordered={false}
                />
            </div>
        </div>
    )
}
