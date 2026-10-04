import { useMemo, useState } from "react";
import { Search, TrendingUp, CalendarDays } from "lucide-react";

const marketData = [
  {
    crop: "Onion",
    district: "Nashik",
    market: "Nashik Market",
    min: 4100,
    max: 4800,
    modal: 4620,
    date: "04 Oct 2026",
  },
  {
    crop: "Onion",
    district: "Nashik",
    market: "Lasalgaon Market",
    min: 4000,
    max: 4700,
    modal: 4510,
    date: "04 Oct 2026",
  },
  {
    crop: "Onion",
    district: "Nashik",
    market: "Yeola Market",
    min: 3950,
    max: 4650,
    modal: 4440,
    date: "04 Oct 2026",
  },
  {
    crop: "Soybean",
    district: "Jalgaon",
    market: "Jalgaon Market",
    min: 4200,
    max: 4900,
    modal: 4580,
    date: "04 Oct 2026",
  },
  {
    crop: "Cotton",
    district: "Dhule",
    market: "Dhule Market",
    min: 6800,
    max: 7600,
    modal: 7250,
    date: "04 Oct 2026",
  },
  {
    crop: "Maize",
    district: "Pune",
    market: "Pune Market",
    min: 2100,
    max: 2500,
    modal: 2320,
    date: "04 Oct 2026",
  },
  {
    crop: "Tomato",
    district: "Pune",
    market: "Pune Market",
    min: 1800,
    max: 2600,
    modal: 2250,
    date: "04 Oct 2026",
  },
];

function MarketPrices() {
  const [search, setSearch] = useState("");
  const [crop, setCrop] = useState("All Crops");
  const [district, setDistrict] = useState("All Districts");

  const filteredMarkets = useMemo(() => {
    return marketData.filter((item) => {
      const matchesSearch =
        item.market.toLowerCase().includes(search.toLowerCase()) ||
        item.crop.toLowerCase().includes(search.toLowerCase());

      const matchesCrop =
        crop === "All Crops" || item.crop === crop;

      const matchesDistrict =
        district === "All Districts" || item.district === district;

      return matchesSearch && matchesCrop && matchesDistrict;
    });
  }, [search, crop, district]);

  return (
    <main className="p-8">
      {/* Heading */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-green-600">
          Market Intelligence
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-800">
          Market Prices
        </h1>

        <p className="mt-2 text-slate-500">
          Check the latest available crop prices across selected markets.
        </p>
      </div>

      {/* Filters */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-3">
          {/* Search */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search crop or market..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none focus:border-green-500"
            />
          </div>

          {/* Crop */}
          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-green-500"
          >
            <option>All Crops</option>
            <option>Onion</option>
            <option>Soybean</option>
            <option>Cotton</option>
            <option>Maize</option>
            <option>Tomato</option>
          </select>

          {/* District */}
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-green-500"
          >
            <option>All Districts</option>
            <option>Nashik</option>
            <option>Jalgaon</option>
            <option>Dhule</option>
            <option>Pune</option>
          </select>
        </div>
      </div>

      {/* Summary cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Markets shown</p>
          <p className="mt-2 text-2xl font-bold text-slate-800">
            {filteredMarkets.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Highest modal price</p>
          <p className="mt-2 text-2xl font-bold text-green-700">
            {filteredMarkets.length
              ? `₹${Math.max(
                  ...filteredMarkets.map((item) => item.modal)
                ).toLocaleString("en-IN")}`
              : "—"}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Data date</p>
          <p className="mt-2 flex items-center gap-2 text-lg font-bold text-slate-800">
            <CalendarDays size={18} className="text-green-600" />
            Latest available
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="text-lg font-bold text-slate-800">
            Available Market Prices
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Prices shown here are currently mock values and will later be
            replaced with official market data.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wider text-slate-400">
                <th className="px-5 py-4">Crop</th>
                <th className="px-5 py-4">Market</th>
                <th className="px-5 py-4">District</th>
                <th className="px-5 py-4">Min Price</th>
                <th className="px-5 py-4">Max Price</th>
                <th className="px-5 py-4">Modal Price</th>
                <th className="px-5 py-4">Date</th>
              </tr>
            </thead>

            <tbody>
              {filteredMarkets.length > 0 ? (
                filteredMarkets.map((item) => (
                  <tr
                    key={`${item.crop}-${item.market}`}
                    className="border-b border-slate-50 transition hover:bg-green-50/40"
                  >
                    <td className="px-5 py-4">
                      <span className="font-semibold text-slate-800">
                        {item.crop}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-700">
                      {item.market}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {item.district}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      ₹{item.min.toLocaleString("en-IN")}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      ₹{item.max.toLocaleString("en-IN")}
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1 rounded-lg bg-green-50 px-3 py-1.5 text-sm font-bold text-green-700">
                        <TrendingUp size={14} />
                        ₹{item.modal.toLocaleString("en-IN")}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {item.date}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-12 text-center text-sm text-slate-500"
                  >
                    No market data found for the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default MarketPrices;