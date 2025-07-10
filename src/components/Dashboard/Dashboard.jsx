import React from 'react'
import { Card, Select } from 'antd';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    
} from 'recharts';
import Barchart from './Barchart';
import HelpCenter from './HelpCenter';
import { Outlet } from 'react-router-dom';


const { Option } = Select;

const data = [
    { month: 'Jan', income: 80 },
    { month: 'Feb', income: 70 },
    { month: 'Mar', income: 100 },
    { month: 'Apr', income: 75 },
    { month: 'May', income: 90 },
    { month: 'Jun', income: 85 },
    { month: 'July', income: 65 },
    { month: 'Augt', income: 70 },
    { month: 'Sept', income: 90 },
    { month: 'Oct', income: 95 },
    { month: 'Nov', income: 80 },
    { month: 'Dec', income: 98 }
];
export default function Dashboard() {
    return (
        <div className='bg-[#FCF7E6] md:ml-[300px]  md:w-[1620px]'>
            {/* Dashboard top */}
            <div className='flex gap-8 pl-8 pr-12 pt-8 pb-6'>
                <div className='bg-[#FEFEFE] rounded-xl w-[25%] h-[215px]  flex flex-col justify-center items-center gap-4'>
                    <p className='inter-medium-2 '>Total User</p>
                    <img src="/public/images/profile-user.png" alt="" />
                    <p className='inter-semibold'>852,650</p>
                </div>

                <div className='bg-[#FEFEFE] rounded-xl w-[25%] h-[215px]  flex flex-col justify-center items-center gap-4'>
                    <p className='inter-medium-2 '>Order Completed</p>
                    <div className='w-[64px] h-[64px] flex justify-center items-center rounded-full bg-[#FCF7E6]'>
                        <img src="/public/images/Layer_1.png" alt="" />
                    </div>
                    <p className='inter-semibold'>4,782</p>
                </div>

                <div className='bg-[#FEFEFE] rounded-xl w-[25%] h-[215px]  flex flex-col justify-center items-center gap-4'>
                    <p className='inter-medium-2 '>Total Income</p>
                    <img src="/public/images/Group.png" alt="" />
                    <p className='inter-semibold'>$2,500</p>
                </div>

                <div className='bg-[#FEFEFE] rounded-xl w-[25%] h-[215px]  flex flex-col justify-center items-center gap-4'>
                    <p className='inter-medium-2 '>Total Products</p>
                    <div className='w-[64px] h-[64px] flex justify-center items-center rounded-full bg-[#FCF7E6]'>
                        <img src="/public/images/Layer_2.png" alt="" />
                    </div>
                    <p className='inter-semibold'>358</p>
                </div>

            </div>

            {/* Dashboard middle */}
            <div className='flex  md:flex-row flex-col gap-6 md:gap-0 pl-8 pr-12 md:justify-between  pb-6 '>
                {/* graph one */}
                <div className=' md:w-[49%]'>
                    <Card
                        title={<span className="text-[20px] font-semibold font-[Inter] ml-8">Income Overview</span>}
                        extra={
                            <Select defaultValue="2025" style={{ width: 100 }}>
                                <Option value="2025">2025</Option>
                                {/* <Option value="2024">2024</Option> */}
                            </Select>
                        }

                        style={{
                            borderRadius: '12px',
                            border: '1px solid #F0F0F0', // lighter border (almost white)
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' // thicker, deeper shadow
                        }}

                    >
                        <ResponsiveContainer  width="100%" height={300}>
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#E4AF00" stopOpacity={1} />
                                        <stop offset="95%" stopColor="#E4AF00" stopOpacity={0.2} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]}
                                    axisLine={false}
                                    tickLine={false}

                                />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="income"
                                    stroke="#E4AF00"
                                    fillOpacity={1}
                                    fill="url(#colorIncome)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Card>
                </div>

                {/* graph two */}
                <div className='md:w-[49%] '>
                    <Barchart></Barchart>
                </div>
            </div>

            {/* Dashboard bottom */}
            <div className='pl-8 pr-12 pb-12 '>
                <HelpCenter></HelpCenter>
            </div>

            
        </div>
    )
}
