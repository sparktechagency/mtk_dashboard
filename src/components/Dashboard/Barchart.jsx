
import React from 'react';
import { Card, Select } from 'antd';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  
} from 'recharts';

const { Option } = Select;

const userData = [
  { month: 'Jan', users: 900 },
  { month: 'Feb', users: 450 },
  { month: 'Mar', users: 700 },
  { month: 'Apr', users: 600 },
  { month: 'May', users: 750 },
  { month: 'Jun', users: 400 },
  { month: 'July', users: 950 },
  { month: 'Aug', users: 650 },
  { month: 'Sept', users: 350 },
  { month: 'Oct', users: 850 },
  { month: 'Nov', users: 680 },
  { month: 'Dec', users: 690 }
];
export default function Barchart() {
  return (
    <div className=''>
         <Card
      title={<span className="text-[20px] font-semibold font-[Inter]">User Growth</span>}
      extra={
        <Select defaultValue="2025" style={{ width: 100 }}>
          <Option value="2025">2025</Option>
          {/* <Option value="2024">2024</Option> */}
        </Select>
      }
    //   bodyStyle={{ padding: 0, borderRadius: '0 0 12px 12px', overflow: 'hidden' }}
      style={{
        borderRadius: '12px',
        border: '1px solid #F0F0F0',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={userData}>
          <defs>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#93c5fd" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" axisLine={false} tickLine={false} />
          <YAxis domain={[0, 1000]} ticks={[0, 200, 400, 600, 800, 1000]}
           axisLine={false} tickLine={false} />
          <Tooltip />
          <Bar
            dataKey="users"
            fill="url(#colorUsers)"
            radius={[8, 8, 0, 0]} // rounded top corners
            barSize={15}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
    </div>
  )
}
