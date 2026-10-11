
import { useEffect, useMemo, useState } from "react";
import { Search, TrendingUp, CalendarDays } from "lucide-react";

const API_URL = "https://agrimitra-api-9hld.onrender.com/api/mandi";

function MarketPrices() {
  const [search, setSearch] = useState("");
  const [crop, setCrop] = useState("All Crops");
  const [district, setDistrict] = useState("All Districts");

  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const result = await response.json();

        const records = Array.isArray(result)
          ? result
          : result.data;

        if (!Array.isArray(records)) {
          throw new Error("Invalid market data received.");
        }

        const normalizedData = records.map((item) => ({
          crop: item.crop ?? item.commodity ?? "Unknown",
          district: item.district ?? "Unknown",
          market: item.market ?? "Unknown",
          min: Number(item.min ?? item.minPrice ?? 0),
          max: Number(item.max ?? item.maxPrice ?? 0),
          modal: Number(item.modal ?? item.modalPrice ?? 0),
          date: item.date ?? "Date unavailable",
        }));

        setMarketData(normalizedData);
        setIsDemo(Boolean(result.isDemo));
      } catch (err) {
        console.error("Market data error:", err);
        setError(
          "Unable to load market data. Make sure the AgriMitra backend is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  const cropOptions = useMemo(
    () => [...new Set(marketData.map((item) => item.crop))],
    [marketData]
  );

  const districtOptions = useMemo(
    () => [...new Set(marketData.map((item) => item.district))],
    [marketData]
  );

  const filteredMarkets = useMemo(() => {
    return marketData.filter((item) => {
      const searchTerm = search.toLowerCase();

      const matchesSearch =
        item.market.toLowerCase().includes(searchTerm) ||
        item.crop.toLowerCase().includes(searchTerm);

      const matchesCrop = crop === "All Crops" || item.crop === crop;

      const matchesDistrict =
        district === "All Districts" || item.district === district;

      return matchesSearch && matchesCrop && matchesDistrict;
    });
  }, [marketData, search, crop, district]);

  const highestModalPrice =
    filteredMarkets.length > 0
      ? Math.max(...filteredMarkets.map((item) => item.modal))
      : null;

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      {/* Heading */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-green-600">
          Market Intelligence
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-800">
          Market Prices
        </h1>

        <p className="mt-2 text-slate-500">
          Check the available crop prices across selected markets.
        </p>
      </div>

      {/* Data status */}
      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3 text-sm">
        {loading ? (
          <p className="text-slate-500">Loading market data...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <p className="text-amber-700">
            {isDemo
              ? "Demo data: these illustrative prices are not verified live market rates."
              : "Market data loaded from the connected backend. Verify its source and date before making selling decisions."}
          </p>
        )}
      </div>

      {/* Filters */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-3">
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

          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-green-500"
          >
            <option>All Crops</option>
            {cropOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-green-500"
          >
            <option>All Districts</option>
            {districtOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Markets shown</p>
          <p className="mt-2 text-2xl font-bold text-slate-800">
            {loading ? "—" : filteredMarkets.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Highest modal price</p>
          <p className="mt-2 text-2xl font-bold text-green-700">
            {highestModalPrice === null
              ? "—"
              : `₹${highestModalPrice.toLocaleString("en-IN")}`}
          </p>
          <p className="mt-1 text-xs text-slate-400">Per quintal, if supplied data uses this unit</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Data date</p>
          <p className="mt-2 flex items-center gap-2 text-lg font-bold text-slate-800">
            <CalendarDays size={18} className="text-green-600" />
            {filteredMarkets.length > 0
              ? filteredMarkets[0].date
              : "Unavailable"}
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
            {isDemo
              ? "Illustrative demo prices only; not verified market rates."
              : "Check the data source and reporting date before using these prices."}
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
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-5 py-12 text-center text-slate-500">
                    Loading market prices...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="7" className="px-5 py-12 text-center text-red-600">
                    {error}
                  </td>
                </tr>
              ) : filteredMarkets.length > 0 ? (
                filteredMarkets.map((item, index) => (
                  <tr
                    key={`${item.crop}-${item.market}-${index}`}
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
                  <td colSpan="7" className="px-5 py-12 text-center text-sm text-slate-500">
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
