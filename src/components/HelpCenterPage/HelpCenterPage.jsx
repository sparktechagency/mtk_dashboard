import React, { useState } from 'react';
import { Table, Input, Button } from 'antd';
import { SearchOutlined, EyeOutlined, RollbackOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import HelpDetailsModal from '../Dashboard/HelpDetailsModal';
import ReplyModal from '../Dashboard/ReplyModal';
import './helpCenterPage.css';

export default function HelpCenterPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isReplyModalVisible, setIsReplyModalVisible] = useState(false);
  const [selectedReply, setSelectedReply] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleView = (record) => {
    setSelectedOrder({
      name: record.email.split('@')[0],
      address: '123 Main Street, NY',
      date: record.date,
      payment: 'Paid',
      status: 'Delivered',
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  const handleReply = (record) => {
    setSelectedReply(record);
    setIsReplyModalVisible(true);
  };

  const handleReplyCancel = () => {
    setIsReplyModalVisible(false);
    setSelectedReply(null);
  };

  const handleReplySubmit = (value) => {
    console.log('Reply submitted:', value);
    setIsReplyModalVisible(false);
  };

  const dataSource = [
     {
    key: 1,
    ticketId: '#1233',
    date: '2/11/12',
    email: 'bockely@att.com',
    phone: '(907) 555-0101',
    message: 'I Didn’t Receive My Referral R...',
  },
  {
    key: 2,
    ticketId: '#1233',
    date: '5/27/15',
    email: 'csilvers@rizon.com',
    phone: '(270) 555-0117',
    message: 'How Long Does It Take to Re...',
  },
  {
    key: 3,
    ticketId: '#1233',
    date: '9/18/16',
    email: 'qamaho@mail.com',
    phone: '(219) 555-0114',
    message: 'Can I Refer Someone Outside...',
  },
  {
    key: 4,
    ticketId: '#1233',
    date: '7/27/13',
    email: 'xterris@gmail.com',
    phone: '(252) 555-0126',
    message: 'My Referral Signed Up, But I...',
  },
  {
    key: 5,
    ticketId: '#1233',
    date: '4/4/18',
    email: 'xterris@gmail.com',
    phone: '(217) 555-0113',
    message: 'I Referred a Friend, But They...',
  },
  {
    key: 6,
    ticketId: '#1233',
    date: '12/10/13',
    email: 'xterris@gmail.com',
    phone: '(480) 555-0103',
    message: 'How Long Does It Take to Re...',
  },
  {
    key: 7,
    ticketId: '#1233',
    date: '5/19/12',
    email: 'xterris@gmail.com',
    phone: '(205) 555-0100',
    message: 'My Account Was Flagged for...',
  },
  {
    key: 8,
    ticketId: '#1233',
    date: '7/18/17',
    email: 'xterris@gmail.com',
    phone: '(603) 555-0123',
    message: 'Can I Withdraw My Rewards...',
  },
  {
    key: 9,
    ticketId: '#1233',
    date: '8/21/15',
    email: 'xterris@gmail.com',
    phone: '(684) 555-0102',
    message: 'My Referral Signed Up, But I...',
  },
  {
    key: 10,
    ticketId: '#1233',
    date: '8/2/19',
    email: 'xterris@gmail.com',
    phone: '(406) 555-0120',
    message: 'How Long Does It Take to Re...',
  },
  ];

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
      width: 120,
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
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (text, record) => (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          
          <a  onClick={() => handleView(record)}
            type="primary"> <img src="/public/images/view.png" alt="view" /></a>
          <a  onClick={() => handleReply(record)}
            type="primary"><img src="/public/images/reply.png" alt="reply" /></a>
        </div>
      ),
    },
  ];

  return (
    <div className="pl-6 pt-6 pr-12 bg-[#FCF7E6] md:ml-[300px] md:w-[1620px] min-h-screen">
      <div className="bg-white p-6 rounded-[8px] shadow-lg">
        <div className="mb-6 flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Link to="/">
              <img src="/images/users/Frame.png" alt="back" />
            </Link>
            <h2 className="text-[20px] font-[Inter] font-semibold">Help Center</h2>
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
          dataSource={dataSource}
          columns={columns}
          className="rounded-lg overflow-hidden custom-table"
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
        />

        {/* 👁️ Details Modal */}
        <HelpDetailsModal open={isModalVisible} onCancel={handleCancel} order={selectedOrder} />

        {/* 💬 Reply Modal */}
        <ReplyModal
          open={isReplyModalVisible}
          onCancel={handleReplyCancel}
          onAdd={handleReplySubmit}
          fieldLabel="Question"
          fieldName="question"
          placeholder="Type question here"
        />
      </div>
    </div>
  );
}
