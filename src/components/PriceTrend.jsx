import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const priceData = [
  { month: "Apr", price: 3820 },
  { month: "May", price: 3950 },
  { month: "Jun", price: 4100 },
  { month: "Jul", price: 4020 },
  { month: "Aug", price: 4350 },
  { month: "Sep", price: 4620 },
];

function PriceTrend() {
  return (
    <section className="mt-6 grid gap-6 lg:grid-cols-3">
      {/* Chart */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-green-600">
              Price Trend
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-800">
              Onion prices in Nashik
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Historical modal price · ₹ per quintal
            </p>
          </div>

          <span className="rounded-lg bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
            6 Months
          </span>
        </div>

        <div className="mt-6 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={55}
              />

              <Tooltip
                formatter={(value) => [
                  `₹${value.toLocaleString("en-IN")}`,
                  "Modal Price",
                ]}
              />

              <Line
                type="monotone"
                dataKey="price"
                stroke="#16a34a"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insight */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-green-600">
          Market Insight
        </p>

        <h2 className="mt-2 text-xl font-bold text-slate-800">
          Onion prices are rising
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Modal prices in Nashik have increased over the recent months.
          The latest available price is ₹4,620 per quintal.
        </p>

        <div className="mt-6 rounded-xl bg-green-50 p-4">
          <p className="text-xs font-medium text-slate-500">
            Change since April
          </p>

          <p className="mt-1 text-2xl font-bold text-green-700">
            +20.9%
          </p>
        </div>

        <button className="mt-5 w-full rounded-xl border border-green-200 px-4 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50">
          Explore Price Trends
        </button>
      </div>
    </section>
  );
}

export default PriceTrend;