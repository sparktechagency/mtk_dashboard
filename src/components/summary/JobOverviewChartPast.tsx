import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { TJobYear } from '../../types/year.type';



const barDataByYear: Record<string, TJobYear[]> = {
  "2025": [
    { month: 'Jan', jobs: 300 },
    { month: 'Feb', jobs: 250 },
    { month: 'Mar', jobs: 400 },
    { month: 'Apr', jobs: 350 },
    { month: 'May', jobs: 500 },
    { month: 'Jun', jobs: 480 },
    { month: 'Jul', jobs: 520 },
    { month: 'Aug', jobs: 600 },
    { month: 'Sep', jobs: 450 },
    { month: 'Oct', jobs: 700 },
    { month: 'Nov', jobs: 620 },
    { month: 'Dec', jobs: 750 },
  ],
  "2026": [
    { month: 'Jan', jobs: 400 },
    { month: 'Feb', jobs: 380 },
    { month: 'Mar', jobs: 420 },
    { month: 'Apr', jobs: 460 },
    { month: 'May', jobs: 500 },
    { month: 'Jun', jobs: 600 },
    { month: 'Jul', jobs: 650 },
    { month: 'Aug', jobs: 680 },
    { month: 'Sep', jobs: 700 },
    { month: 'Oct', jobs: 740 },
    { month: 'Nov', jobs: 800 },
    { month: 'Dec', jobs: 850 },
  ],
  "2027": [
    { month: 'Jan', jobs: 450 },
    { month: 'Feb', jobs: 480 },
    { month: 'Mar', jobs: 500 },
    { month: 'Apr', jobs: 900 },
    { month: 'May', jobs: 650 },
    { month: 'Jun', jobs: 700 },
    { month: 'Jul', jobs: 350 },
    { month: 'Aug', jobs: 800 },
    { month: 'Sep', jobs: 420 },
    { month: 'Oct', jobs: 670 },
    { month: 'Nov', jobs: 900 },
    { month: 'Dec', jobs: 950 },
  ],
  "2028": [
    { month: 'Jan', jobs: 300 },
    { month: 'Feb', jobs: 250 },
    { month: 'Mar', jobs: 400 },
    { month: 'Apr', jobs: 350 },
    { month: 'May', jobs: 500 },
    { month: 'Jun', jobs: 480 },
    { month: 'Jul', jobs: 520 },
    { month: 'Aug', jobs: 600 },
    { month: 'Sep', jobs: 450 },
    { month: 'Oct', jobs: 700 },
    { month: 'Nov', jobs: 620 },
    { month: 'Dec', jobs: 750 },
  ],
};

const JobOverviewChartPast = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const barData = barDataByYear[selectedYear];


  return (
    <div className="md:p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Job Overview</h2>
        <select
          className="border bg-white rounded px-2 py-1"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {Object.keys(barDataByYear).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={barData}
            margin={{ top: 5, right: 30, left: 20, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis
              domain={[0, 1000]}
              ticks={[0, 200, 400, 600, 800, 1000]}
              tickFormatter={(value) =>
                new Intl.NumberFormat('en').format(value)
              }
            />
            <Tooltip
              formatter={(value) => [
                new Intl.NumberFormat('en').format(value as number),
                'jobs',
              ]}
              cursor={{ fill: '#E7F0FA' }}
            />
            <Bar dataKey="jobs" fill="#22385C" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default JobOverviewChartPast;
