"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DataSeries {
  dataKey: string;
  stroke: string;
  name: string;
}

interface DataChartProps {
  data: any[];
  series: DataSeries[];
  xAxisKey: string;
  height?: number;
  yAxisFormatter?: (value: number) => string;
}

export default function DataChart({
  data,
  series,
  xAxisKey,
  height = 300,
  yAxisFormatter,
}: DataChartProps) {
  const defaultYAxisFormatter = (value: number) => `£${(value / 1000).toFixed(0)}k`;
  const formatter = yAxisFormatter || defaultYAxisFormatter;

  return (
    <div style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
          <XAxis
            dataKey={xAxisKey}
            stroke="#71717a"
            style={{ fontSize: "12px" }}
          />
          <YAxis
            stroke="#71717a"
            style={{ fontSize: "12px" }}
            tickFormatter={formatter}
          />
          <Tooltip
            formatter={(value: number | undefined) => [
              value !== undefined
                ? `£${value.toLocaleString("en-GB", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`
                : "",
            ]}
            labelStyle={{ color: "#18181b" }}
            contentStyle={{
              backgroundColor: "#fafafa",
              border: "1px solid #e4e4e7",
              borderRadius: "6px",
            }}
          />
          <Legend />
          {series.map((s) => (
            <Line
              key={s.dataKey}
              type="monotone"
              dataKey={s.dataKey}
              stroke={s.stroke}
              strokeWidth={2}
              name={s.name}
              dot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
