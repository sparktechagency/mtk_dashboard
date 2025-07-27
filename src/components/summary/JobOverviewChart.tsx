import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useGetJobGrowthQuery } from '../../redux/features/dashboard/dashboardApi';
import calculateChartMetrics from '../../utils/calculateChartMetrics';
import JobOverviewLoading from '../loader/JobOverviewLoading';
import { yearOptions } from '../../data/options.data';
import type { TGrowth } from '../../types/year.type';




const JobOverviewChart = () => {
  const date = new Date();
  const currentYear = date.getFullYear().toString();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [barData, setBarData] = useState([])
  const {data, isLoading, isError} = useGetJobGrowthQuery(selectedYear);
  const [domain, setDomain] = useState<number[]>([]);
  const [ticks, setTicks] = useState<number[]>([]);



  useEffect(() => {
    if (!isLoading && data) {
      const result = data?.data?.data;
      const formatted = result?.map((item:TGrowth) => ({
        month: item.month,
        jobs: item.count,
      }));
      setBarData(formatted);
      const metrics = calculateChartMetrics(formatted);
      setDomain(metrics?.domain as number[]);
      setTicks(metrics?.ticks as number[])
    }
  }, [data, isLoading]);



  if(isLoading){
    return <JobOverviewLoading/>
  }

  if (!isLoading && isError) {
    return <h1 className="text-lg text-red-500">Server Error Occured</h1>;
  }



  return (
    <div className="md:p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Job Overview</h2>
        <select
          className="border bg-white rounded px-2 py-1"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
         {yearOptions.map((year) => (
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
              domain={domain}
              ticks={ticks}
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

export default JobOverviewChart;
