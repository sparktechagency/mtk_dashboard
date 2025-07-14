import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { DeleteOutlined } from '@ant-design/icons'
import { Pagination } from 'antd';
import Container from '../SharedComponents/Container';


const data = [
  {
    key: '1',
    details: 'New Customer Registered – New user signed up: Nayeem Akash (nayeem@email.com).',
    time: 'Just Now',
  },
  {
    key: '2',
    details: 'Support Ticket Opened: – New support ticket from Farhana K. regarding Order #5789.',
    time: '5 min ago',
  },
  {
    key: '3',
    details: 'New Product Added – New product added: ‘Argentina Messi #10 Home Jersey’. Live on site.',
    time: '30 min ago',
  },
  {
    key: '4',
    details: 'Out of Stock – Basketball Jersey – Lakers #23 is now out of stock. Consider restocking.',
    time: '6 hours ago',
  },
  {
    key: '5',
    details: 'New Order Placed – New Order #5843 has been placed by Rafi Hossain. Total: $78.50.',
    time: '8 hours ago',
  },
]

export default function Notification() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <>
      <Container>
        <div className="rounded-[8px] bg-white shadow-lg p-12">

          {/* Header */}
          <div className="flex items-center gap-2 mb-[24px]">
            <Link to="/"><img src="/images/users/Frame.png" alt="Back" /></Link>
            <h2 className="text-[20px] font-[Inter] font-semibold">Notifications</h2>
          </div>

          {/* Sub-header */}
          <div className="mb-[32px]">
            <h3 className="text-[18px] font-[Inter] font-semibold">Total 128 Notifications</h3>
          </div>

          {/* Notification List */}
          <div className="space-y-4">
            {data.map((item) => (
              <div
                key={item.key}
                className={`flex justify-between items-center p-4 rounded-[4px] ${item.details.includes('Support Ticket') || item.details.includes('Out of Stock')
                    ? 'bg-[#FCF7E6]'
                    : ''
                  }`}
              >
                <div className="text-[16px] font-[Inter] text-[#232323]">{item.details}</div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-500 text-[16px] font-[Inter] mr-4">{item.time}</span>
                  {/* <DeleteOutlined className="text-red-500 cursor-pointer" /> */}
                  <img src="/public/images/delete-small.png" alt="" />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <Pagination
              position={['bottomCenter']}
              current={currentPage}
              total={1000}
              pageSize={10}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
              showLessItems={true}
              itemRender={(page, type, originalElement) => {
                if (type === 'page') {
                  if ([1, 2, 3, 100].includes(page)) {
                    return (
                      <span className={page === currentPage ? 'custom-page-active' : 'custom-page'}>
                        {page}
                        {page !== 100 && page !== 3 ? ' ,' : ''}
                      </span>
                    )
                  }
                  if (page === 4) {
                    return <span className="custom-page"> </span>
                  }
                  return null
                }

                if (type === 'prev') {
                  return (
                    <span className="pagination-btn">
                      <span className="arrow">{originalElement}</span>
                      <span className="label ml-1">Previous</span>
                    </span>
                  )
                }

                if (type === 'next') {
                  return (
                    <span className="pagination-btn">
                      <span className="label mr-1">Next</span>
                      <span className="arrow">{originalElement}</span>
                    </span>
                  )
                }

                return originalElement
              }}
            />
          </div>
        </div>
      </Container>
    </>
  )
}
