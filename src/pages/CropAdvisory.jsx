import { useMemo, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Lightbulb,
  CalendarDays,
  IndianRupee,
  AlertCircle,
} from "lucide-react";

const advisoryData = {
  Onion: {
    trend: "Rising",
    change: "+8.4%",
    currentPrice: 4620,
    demand: "Strong",
    recommendation:
      "Prices are showing an upward movement. Compare today's available prices with nearby markets before selling.",
    points: [
      "Check nearby market prices before transporting your produce.",
      "Compare net returns instead of looking only at the highest price.",
      "Keep checking the latest available market data before making a selling decision.",
    ],
  },

  Soybean: {
    trend: "Stable",
    change: "+1.8%",
    currentPrice: 4580,
    demand: "Moderate",
    recommendation:
      "Prices are relatively stable. Compare multiple markets and transportation costs before deciding where to sell.",
    points: [
      "Compare at least two or three nearby markets.",
      "Consider transportation cost when comparing prices.",
      "Watch the recent price trend before finalizing your sale.",
    ],
  },

  Cotton: {
    trend: "Rising",
    change: "+5.2%",
    currentPrice: 7250,
    demand: "Strong",
    recommendation:
      "Cotton prices are showing positive movement. Monitor the latest market prices and compare net returns.",
    points: [
      "Check the latest available price before selling.",
      "Compare nearby markets based on expected net return.",
      "Track price movement over the coming days.",
    ],
  },

  Maize: {
    trend: "Falling",
    change: "-3.1%",
    currentPrice: 2320,
    demand: "Moderate",
    recommendation:
      "Recent prices show some downward movement. Compare available markets carefully before deciding when to sell.",
    points: [
      "Avoid choosing a market based only on distance.",
      "Calculate transport cost before selling.",
      "Monitor the latest available prices regularly.",
    ],
  },

  Tomato: {
    trend: "Rising",
    change: "+6.7%",
    currentPrice: 2250,
    demand: "Strong",
    recommendation:
      "Tomato prices are showing an upward movement. Compare nearby markets and estimated net returns.",
    points: [
      "Check prices at multiple nearby markets.",
      "Include transportation cost in your comparison.",
      "Use recent price trends as an additional decision factor.",
    ],
  },
};

function CropAdvisory() {
  const [crop, setCrop] = useState("Onion");

  const data = useMemo(() => advisoryData[crop], [crop]);

  const isRising = data.trend === "Rising";
  const isFalling = data.trend === "Falling";

  return (
    <main className="p-8">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-green-600">
          Smart Advisory
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-800">
          Crop Advisory
        </h1>

        <p className="mt-2 text-slate-500">
          Simple market-based insights to support your selling decisions.
        </p>
      </div>

      {/* Crop selector */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Select Crop
        </label>

        <select
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
          className="w-full max-w-md rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-green-500"
        >
          <option>Onion</option>
          <option>Soybean</option>
          <option>Cotton</option>
          <option>Maize</option>
          <option>Tomato</option>
        </select>
      </div>

      {/* Current market snapshot */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Latest Price
          </p>

          <p className="mt-2 flex items-center gap-1 text-2xl font-bold text-slate-800">
            <IndianRupee size={20} />
            {data.currentPrice.toLocaleString("en-IN")}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Per quintal
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Price Trend
          </p>

          <p
            className={`mt-2 flex items-center gap-2 text-2xl font-bold ${
              isRising
                ? "text-green-700"
                : isFalling
                  ? "text-red-600"
                  : "text-slate-700"
            }`}
          >
            {isRising ? (
              <TrendingUp size={22} />
            ) : isFalling ? (
              <TrendingDown size={22} />
            ) : (
              "→"
            )}

            {data.trend}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Recent movement
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Recent Change
          </p>

          <p
            className={`mt-2 text-2xl font-bold ${
              data.change.startsWith("+")
                ? "text-green-700"
                : "text-red-600"
            }`}
          >
            {data.change}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Indicative market movement
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Demand
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-800">
            {data.demand}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Market indicator
          </p>
        </div>
      </div>

      {/* Main recommendation */}
      <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
            <Lightbulb size={21} />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
              AgriMitra Insight
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-800">
              What you should consider
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              {data.recommendation}
            </p>
          </div>
        </div>
      </div>

      {/* Decision checklist */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <CalendarDays className="text-green-600" size={21} />

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Before you sell
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              A simple checklist for your selling decision
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {data.points.map((point, index) => (
            <div
              key={point}
              className="flex items-start gap-3 rounded-xl bg-slate-50 p-4"
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                {index + 1}
              </div>

              <p className="text-sm leading-6 text-slate-600">
                {point}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Warning */}
      <div className="mt-6 flex items-start gap-3 rounded-xl bg-amber-50 p-4">
        <AlertCircle
          size={18}
          className="mt-0.5 shrink-0 text-amber-600"
        />

        <p className="text-xs leading-5 text-amber-800">
          <strong>Important:</strong> These insights are indicative and
          based on prototype market data. They are not guaranteed price
          predictions or financial advice. Final selling decisions should
          consider actual market conditions.
        </p>
      </div>
    </main>
  );
}

export default CropAdvisory;