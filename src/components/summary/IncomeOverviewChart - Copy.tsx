import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { TIncomeYear } from '../../types/year.type';




const bookingsDataByYear: Record<string, TIncomeYear[]> = {
  2025: [
    { month: 'Jan', income: 400 },
    { month: 'Feb', income: 300 },
    { month: 'Mar', income: 200 },
    { month: 'Apr', income: 450 },
    { month: 'May', income: 620 },
    { month: 'Jun', income: 510 },
    { month: 'Jul', income: 710 },
    { month: 'Aug', income: 650 },
    { month: 'Sep', income: 430 },
    { month: 'Oct', income: 550 },
    { month: 'Nov', income: 480 },
    { month: 'Dec', income: 600 },
  ],
  2026: [
    { month: 'Jan', income: 500 },
    { month: 'Feb', income: 350 },
    { month: 'Mar', income: 280 },
    { month: 'Apr', income: 600 },
    { month: 'May', income: 700 },
    { month: 'Jun', income: 800 },
    { month: 'Jul', income: 750 },
    { month: 'Aug', income: 670 },
    { month: 'Sep', income: 540 },
    { month: 'Oct', income: 610 },
    { month: 'Nov', income: 450 },
    { month: 'Dec', income: 720 },
  ],
  2027: [
    { month: 'Jan', income: 500 },
    { month: 'Feb', income: 350 },
    { month: 'Mar', income: 280 },
    { month: 'Apr', income: 720 },
    { month: 'May', income: 640 },
    { month: 'Jun', income: 900 },
    { month: 'Jul', income: 850 },
    { month: 'Aug', income: 790 },
    { month: 'Sep', income: 680 },
    { month: 'Oct', income: 590 },
    { month: 'Nov', income: 610 },
    { month: 'Dec', income: 880 },
  ],
   2028: [
    { month: 'Jan', income: 400 },
    { month: 'Feb', income: 300 },
    { month: 'Mar', income: 200 },
    { month: 'Apr', income: 450 },
    { month: 'May', income: 620 },
    { month: 'Jun', income: 510 },
    { month: 'Jul', income: 710 },
    { month: 'Aug', income: 650 },
    { month: 'Sep', income: 430 },
    { month: 'Oct', income: 550 },
    { month: 'Nov', income: 480 },
    { month: 'Dec', income: 600 },
  ],
};


const IncomeOverviewChart = () => {
  const [selectedYear, setSelectedYear] = useState('2025');

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };
  const data = bookingsDataByYear[selectedYear];

  return (
    <div className="md:p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Income Overview</h2>
        <select
          className="border rounded px-2 py-1 bg-white"
          value={selectedYear}
          onChange={handleYearChange}
        >
          {Object.keys(bookingsDataByYear).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#007bff" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#007bff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#007bff"
              fillOpacity={1}
              fill="url(#colorBookings)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeOverviewChart;
