import React, { useState } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts';

const AnalyticsPage = ({ predictionData }) => {
  // nothing to show if no data
  if (!predictionData) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">No prediction data</h2>
          <p className="text-gray-400">Please run a prediction first.</p>
        </div>
      </div>
    );
  }

  const {
    failure_prediction,
    failure_probability,
    rul_prediction
  } = predictionData;

  const percent = failure_probability * 100;
  const pieData = [
    { name: 'Failure',      value: failure_probability },
    { name: 'No Failure',   value: 1 - failure_probability }
  ];
  const COLORS = ['#FF4C4C', '#14FFEC'];

  // track which slice is hovered
  const [activeIndex, setActiveIndex] = useState(null);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-extrabold text-teal-400 mb-8 text-center">
          Prediction Results
        </h2>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-700 p-6 rounded-lg flex flex-col items-center">
            <span className="text-sm text-gray-400">Outcome</span>
            <span
              className={
                failure_prediction
                  ? 'mt-2 text-lg font-bold text-red-500'
                  : 'mt-2 text-lg font-bold text-green-400'
              }
            >
              {failure_prediction ? 'Likely to Fail' : 'Not Likely'}
            </span>
          </div>

          <div className="bg-gray-700 p-6 rounded-lg flex flex-col items-center">
            <span className="text-sm text-gray-400">Fail Prob.</span>
            <span className="mt-2 text-2xl font-extrabold text-teal-400">
              {percent.toFixed(1)}%
            </span>
          </div>

          <div className="bg-gray-700 p-6 rounded-lg flex flex-col items-center">
            <span className="text-sm text-gray-400">RUL (hrs)</span>
            <span className="mt-2 text-2xl font-extrabold text-gray-100">
              {rul_prediction ?? '—'}
            </span>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="relative w-full h-72">
          {/* center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-4xl font-extrabold text-teal-400">
              {percent.toFixed(1)}%
            </span>
            <span className="text-sm text-gray-400">Failure chance</span>
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                innerRadius="60%"
                outerRadius="80%"
                paddingAngle={2}
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
              >
                {pieData.map((entry, idx) => (
                  <Cell
                    key={`slice-${idx}`}
                    fill={COLORS[idx]}
                    fillOpacity={activeIndex === idx ? 1 : 0.6}
                  />
                ))}
              </Pie>
              <Tooltip
                wrapperStyle={{ outline: 'none' }}
                contentStyle={{
                  backgroundColor: '#2d3748',
                  border: 'none',
                  borderRadius: '8px'
                }}
                formatter={(value, name) => [
                  `${(value * 100).toFixed(2)}%`,
                  name
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
