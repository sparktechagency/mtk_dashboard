import React from 'react'
import { Table, Button, Space, Tag } from 'antd';
import { EyeOutlined, RollbackOutlined } from '@ant-design/icons';

export default function HelpCenter() {
  // Mock data for the table
  const dataSource = [
    {
      key: '1',
      ticketId: '#1233',
      date: '2/11/12',
      email: 'bockely@att.com',
      mobileNumber: '(907) 555-0101',
      message: 'I Didn\'t Receive My Referral R...',
    },
    {
      key: '2',
      ticketId: '#1233',
      date: '5/27/15',
      email: 'csilvers@rizon.com',
      mobileNumber: '(270) 555-0117',
      message: 'How Long Does It Take to Re...',
    },
    {
      key: '3',
      ticketId: '#1233',
      date: '9/18/16',
      email: 'gamaho@gmail.com',
      mobileNumber: '(219) 555-0114',
      message: 'Can I Refer Someone Outside...',
    },
    {
      key: '4',
      ticketId: '#1233',
      date: '7/27/13',
      email: 'xterris@gmail.com',
      mobileNumber: '(252) 555-0126',
      message: 'My Referral Signed Up, But I...',
    },
  ];

  // Define table columns
  const columns = [
    {
      title: 'Ticket ID',
      dataIndex: 'ticketId',
      key: 'ticketId',
      
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      align: 'center',
      width: 220,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Mobile Number',
      dataIndex: 'mobileNumber',
      key: 'mobileNumber',
      align: 'center',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center', // Optional shorthand for center alignment
      render: () => (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            style={{
              backgroundColor: '#E4AF00',
              borderColor: '#fadb14',
              borderRadius: '8px',
              width: 40,
              height: 40,
            }}
          />
          <Button
            type="primary"
            icon={<RollbackOutlined />}
            style={{
              backgroundColor: '#3871C1',
              borderColor: '#1890ff',
              borderRadius: '8px',
              width: 40,
              height: 40,
            }}
          />
        </div>
      ),
    },
  ];


  return (
    <>
      {/* Inject CSS here to remove table lines */}
      <style>
        {`
          /* Remove background color from table header */
    .ant-table-thead > tr > th {
      background-color: transparent !important;
      border-right: none !important;
      border-bottom: none !important;
    }

    /* Remove vertical and bottom borders in body */
    .ant-table-tbody > tr > td {
      border-right: none !important;
      border-bottom: none !important;
    }

    /* Remove divider between columns in all cells */
    .ant-table-cell {
      border-right: none !important;
      border-bottom: none !important;
    }

    /* Remove split lines from table header wrapper */
    .ant-table-content table {
      border-collapse: collapse !important;
    }

    /* Optional: Remove hover background for headers */
    .ant-table-thead > tr:hover > th {
      background-color: transparent !important;

    }

    /* Table header (column titles) */
    .ant-table-thead > tr > th {
      font-size: 16px; 
      font-family: 'Inter', sans-serif; 
      font-weight: 600; 
      
    }

    /* Table body (data cells) */
    .ant-table-tbody > tr > td {
      font-size: 15px; 
      font-family: 'Inter', sans-serif; 
      font-weight: 400;
      
    }
        `}
      </style>

      <div className=" flex items-center justify-center">
        <div className="w-full  bg-white rounded-2xl shadow-lg overflow-hidden">

          <div className='flex justify-between ml-4 mr-12 mt-6 mb-4'>
            <h2 className=" inter-semibold">Help Center</h2>
            <Button className='inter-medium' type="link">View all</Button>
          </div>

          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false} // Disable pagination if you don't need it
            bordered={false}
            className="rounded-lg overflow-hidden" // Apply rounded corners to the table container
            // Custom row styling to match the image's blue border
            rowClassName={(record, index) =>
              index === dataSource.length - 1 ? '' : ''
            }
          />
        </div>
      </div>
    </>

  )
}
