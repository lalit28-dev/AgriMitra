import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, CalendarDays } from "lucide-react";

const trendData = {
  Onion: {
    Nashik: [
      { month: "Apr", price: 3820 },
      { month: "May", price: 3950 },
      { month: "Jun", price: 4100 },
      { month: "Jul", price: 4020 },
      { month: "Aug", price: 4350 },
      { month: "Sep", price: 4620 },
    ],
    Pune: [
      { month: "Apr", price: 3600 },
      { month: "May", price: 3780 },
      { month: "Jun", price: 3900 },
      { month: "Jul", price: 3850 },
      { month: "Aug", price: 4200 },
      { month: "Sep", price: 4480 },
    ],
  },

  Soybean: {
    Jalgaon: [
      { month: "Apr", price: 4100 },
      { month: "May", price: 4250 },
      { month: "Jun", price: 4180 },
      { month: "Jul", price: 4350 },
      { month: "Aug", price: 4480 },
      { month: "Sep", price: 4580 },
    ],
  },

  Cotton: {
    Dhule: [
      { month: "Apr", price: 6900 },
      { month: "May", price: 7050 },
      { month: "Jun", price: 6980 },
      { month: "Jul", price: 7150 },
      { month: "Aug", price: 7200 },
      { month: "Sep", price: 7250 },
    ],
  },
};

function PriceTrends() {
  const [crop, setCrop] = useState("Onion");
  const [district, setDistrict] = useState("Nashik");

  const chartData = useMemo(() => {
    return trendData[crop]?.[district] || [];
  }, [crop, district]);

  const firstPrice = chartData[0]?.price || 0;
  const latestPrice = chartData[chartData.length - 1]?.price || 0;

  const percentageChange =
    firstPrice > 0
      ? (((latestPrice - firstPrice) / firstPrice) * 100).toFixed(1)
      : 0;

  const trend =
    latestPrice > firstPrice
      ? "Rising"
      : latestPrice < firstPrice
        ? "Falling"
        : "Stable";

  return (
    <main className="p-8">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-green-600">
          Historical Analysis
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-800">
          Price Trends
        </h1>

        <p className="mt-2 text-slate-500">
          Understand how crop prices have changed over time.
        </p>
      </div>

      {/* Filters */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Crop
            </label>

            <select
              value={crop}
              onChange={(e) => {
                setCrop(e.target.value);

                if (e.target.value === "Onion") {
                  setDistrict("Nashik");
                } else if (e.target.value === "Soybean") {
                  setDistrict("Jalgaon");
                } else if (e.target.value === "Cotton") {
                  setDistrict("Dhule");
                }
              }}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-green-500"
            >
              <option>Onion</option>
              <option>Soybean</option>
              <option>Cotton</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              District
            </label>

            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-green-500"
            >
              {crop === "Onion" && (
                <>
                  <option>Nashik</option>
                  <option>Pune</option>
                </>
              )}

              {crop === "Soybean" && <option>Jalgaon</option>}

              {crop === "Cotton" && <option>Dhule</option>}
            </select>
          </div>
        </div>
      </div>

      {chartData.length > 0 ? (
        <>
          {/* Summary */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">
                Latest Price
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-800">
                ₹{latestPrice.toLocaleString("en-IN")}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Per quintal
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">
                Change since April
              </p>

              <p className="mt-2 flex items-center gap-2 text-2xl font-bold text-green-700">
                <TrendingUp size={22} />
                {percentageChange}%
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">
                Current Trend
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-800">
                {trend}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Based on historical data
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {crop} price trend
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {district} · Historical modal price
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
                <CalendarDays size={15} />
                Last 6 months
              </div>
            </div>

            <div className="mt-8 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
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

          {/* Disclaimer */}
          <div className="mt-4 rounded-xl bg-amber-50 p-4">
            <p className="text-xs leading-5 text-amber-800">
              <strong>Note:</strong> The current chart uses prototype
              historical data. It will be replaced with verified market
              records when the official data source is connected.
            </p>
          </div>
        </>
      ) : (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-slate-500">
            Historical data is not available for this selection yet.
          </p>
        </div>
      )}
    </main>
  );
}

export default PriceTrends;