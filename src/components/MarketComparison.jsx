import { ArrowUpRight, MapPin, Truck } from "lucide-react";

const markets = [
  {
    name: "Nashik Market",
    location: "Nashik",
    distance: 18,
    price: 4620,
    transport: 900,
  },
  {
    name: "Lasalgaon Market",
    location: "Nashik",
    distance: 32,
    price: 4510,
    transport: 1200,
  },
  {
    name: "Yeola Market",
    location: "Nashik",
    distance: 54,
    price: 4440,
    transport: 1750,
  },
  {
    name: "Pimpalgaon Market",
    location: "Nashik",
    distance: 42,
    price: 4380,
    transport: 1450,
  },
];

const quantity = 20;

function MarketComparison() {
  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Heading */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-green-600">
            Nearby Markets
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-800">
            Compare selling opportunities
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Estimated returns for 20 quintals of onion
          </p>
        </div>

        <button className="flex items-center gap-1 text-sm font-semibold text-green-600 hover:text-green-700">
          View all markets
          <ArrowUpRight size={16} />
        </button>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[700px] text-left">
          <thead>
            <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400">
              <th className="pb-3 font-semibold">Market</th>
              <th className="pb-3 font-semibold">Distance</th>
              <th className="pb-3 font-semibold">Price / Quintal</th>
              <th className="pb-3 font-semibold">Transport</th>
              <th className="pb-3 text-right font-semibold">
                Estimated Net
              </th>
            </tr>
          </thead>

          <tbody>
            {markets.map((market, index) => {
              const grossRevenue = market.price * quantity;
              const netReturn = grossRevenue - market.transport;

              return (
                <tr
                  key={market.name}
                  className="border-b border-slate-50 last:border-0"
                >
                  {/* Market */}
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                          index === 0
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <MapPin size={17} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {market.name}
                        </p>

                        <p className="text-xs text-slate-400">
                          {market.location}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Distance */}
                  <td className="py-4">
                    <span className="text-sm text-slate-600">
                      {market.distance} km
                    </span>
                  </td>

                  {/* Price */}
                  <td className="py-4">
                    <span className="text-sm font-semibold text-slate-800">
                      ₹{market.price.toLocaleString("en-IN")}
                    </span>
                  </td>

                  {/* Transport */}
                  <td className="py-4">
                    <div className="flex items-center gap-1.5 text-sm text-slate-500">
                      <Truck size={15} />
                      ₹{market.transport.toLocaleString("en-IN")}
                    </div>
                  </td>

                  {/* Net */}
                  <td className="py-4 text-right">
                    <span className="text-sm font-bold text-green-700">
                      ₹{netReturn.toLocaleString("en-IN")}
                    </span>

                    {index === 0 && (
                      <span className="ml-2 inline-flex rounded-full bg-green-50 px-2 py-1 text-[10px] font-semibold text-green-700">
                        Best
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Explanation */}
      <div className="mt-5 rounded-xl bg-slate-50 p-4">
        <p className="text-xs leading-5 text-slate-500">
          <span className="font-semibold text-slate-700">
            How we compare:
          </span>{" "}
          Estimated net return = market price × quantity − estimated
          transportation cost.
        </p>
      </div>
    </section>
  );
}

export default MarketComparison;