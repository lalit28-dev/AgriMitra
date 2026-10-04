import { useMemo, useState } from "react";
import { MapPin, Truck, IndianRupee, Trophy } from "lucide-react";

const marketData = [
  {
    name: "Nashik Market",
    district: "Nashik",
    distance: 18,
    price: 4620,
    transportPerQuintal: 45,
  },
  {
    name: "Lasalgaon Market",
    district: "Nashik",
    distance: 32,
    price: 4510,
    transportPerQuintal: 60,
  },
  {
    name: "Yeola Market",
    district: "Nashik",
    distance: 54,
    price: 4440,
    transportPerQuintal: 85,
  },
  {
    name: "Pimpalgaon Market",
    district: "Nashik",
    distance: 42,
    price: 4380,
    transportPerQuintal: 70,
  },
];

function CompareMarkets() {
  const [crop, setCrop] = useState("Onion");
  const [quantity, setQuantity] = useState(20);

  const results = useMemo(() => {
    const qty = Number(quantity) || 0;

    return marketData
      .map((market) => {
        const grossRevenue = market.price * qty;
        const transportCost = market.transportPerQuintal * qty;
        const netReturn = grossRevenue - transportCost;

        return {
          ...market,
          grossRevenue,
          transportCost,
          netReturn,
        };
      })
      .sort((a, b) => b.netReturn - a.netReturn);
  }, [quantity]);

  const bestMarket = results[0];

  return (
    <main className="p-8">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-green-600">
          Smart Comparison
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-800">
          Compare Markets
        </h1>

        <p className="mt-2 text-slate-500">
          Find the market that could give you the best estimated net return.
        </p>
      </div>

      {/* Inputs */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Crop
            </label>

            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-green-500"
            >
              <option>Onion</option>
              <option>Soybean</option>
              <option>Cotton</option>
              <option>Maize</option>
              <option>Tomato</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Quantity (Quintals)
            </label>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-green-500"
            />
          </div>
        </div>
      </div>

      {/* Best market */}
      {bestMarket && (
        <div className="mt-6 rounded-2xl bg-green-700 p-6 text-white shadow-sm">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2 text-green-100">
                <Trophy size={18} />
                <span className="text-sm font-medium">
                  Best estimated net return
                </span>
              </div>

              <h2 className="mt-2 text-2xl font-bold">
                {bestMarket.name}
              </h2>

              <p className="mt-1 text-sm text-green-100">
                {bestMarket.distance} km away · {crop}
              </p>
            </div>

            <div>
              <p className="text-sm text-green-100">
                Estimated net return
              </p>

              <p className="mt-1 text-3xl font-bold">
                ₹{bestMarket.netReturn.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Comparison cards */}
      <div className="mt-6 space-y-4">
        {results.map((market, index) => (
          <div
            key={market.name}
            className={`rounded-2xl border bg-white p-6 shadow-sm ${
              index === 0
                ? "border-green-300 ring-1 ring-green-100"
                : "border-slate-200"
            }`}
          >
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              
              {/* Market info */}
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                    index === 0
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <MapPin size={21} />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-800">
                      {market.name}
                    </h3>

                    {index === 0 && (
                      <span className="rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold uppercase text-green-700">
                        Best Option
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    {market.district} · {market.distance} km away
                  </p>
                </div>
              </div>

              {/* Calculations */}
              <div className="grid gap-5 sm:grid-cols-4 xl:min-w-[650px]">
                <div>
                  <p className="text-xs text-slate-400">
                    Market Price
                  </p>

                  <p className="mt-1 font-bold text-slate-800">
                    ₹{market.price.toLocaleString("en-IN")}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Gross Revenue
                  </p>

                  <p className="mt-1 font-bold text-slate-800">
                    ₹{market.grossRevenue.toLocaleString("en-IN")}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Transport
                  </p>

                  <p className="mt-1 flex items-center gap-1 font-bold text-slate-700">
                    <Truck size={14} />
                    ₹{market.transportCost.toLocaleString("en-IN")}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Net Return
                  </p>

                  <p className="mt-1 flex items-center gap-1 font-bold text-green-700">
                    <IndianRupee size={15} />
                    {market.netReturn.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Formula */}
      <div className="mt-6 rounded-xl bg-slate-100 p-4">
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-slate-800">
            Calculation:
          </span>{" "}
          Net Return = Market Price × Quantity − Estimated Transport Cost
        </p>
      </div>

      <p className="mt-4 text-xs text-slate-400">
        * Current values are prototype data. Actual market prices and
        transportation estimates will be connected to verified data sources.
      </p>
    </main>
  );
}

export default CompareMarkets;