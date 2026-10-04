import { MapPin, Navigation, Truck, IndianRupee } from "lucide-react";

const markets = [
  {
    name: "Nashik Market",
    district: "Nashik",
    distance: 18,
    price: 4620,
    transport: 900,
    position: "left-[55%] top-[28%]",
  },
  {
    name: "Lasalgaon Market",
    district: "Nashik",
    distance: 32,
    price: 4510,
    transport: 1200,
    position: "left-[38%] top-[40%]",
  },
  {
    name: "Yeola Market",
    district: "Nashik",
    distance: 54,
    price: 4440,
    transport: 1750,
    position: "left-[68%] top-[52%]",
  },
  {
    name: "Pimpalgaon Market",
    district: "Nashik",
    distance: 42,
    price: 4380,
    transport: 1450,
    position: "left-[48%] top-[65%]",
  },
];

function MarketMap() {
  return (
    <main className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Market Map</h1>
        <p className="mt-1 text-sm text-slate-500">
          Explore nearby agricultural markets and estimated selling returns.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Map Area */}
        <div className="lg:col-span-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <div>
              <h2 className="font-semibold text-slate-800">
                Nearby Markets
              </h2>
              <p className="text-xs text-slate-400">
                Prototype market locations
              </p>
            </div>

            <button className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-700">
              <Navigation size={16} />
              My Location
            </button>
          </div>

          <div className="relative h-[500px] overflow-hidden bg-green-50">
            {/* Map-like background */}
            <div className="absolute inset-0 opacity-40">
              <div className="absolute left-[15%] top-0 h-full w-px bg-green-200" />
              <div className="absolute left-[35%] top-0 h-full w-px bg-green-200" />
              <div className="absolute left-[55%] top-0 h-full w-px bg-green-200" />
              <div className="absolute left-[75%] top-0 h-full w-px bg-green-200" />

              <div className="absolute left-0 top-[25%] h-px w-full bg-green-200" />
              <div className="absolute left-0 top-[50%] h-px w-full bg-green-200" />
              <div className="absolute left-0 top-[75%] h-px w-full bg-green-200" />
            </div>

            {/* Roads */}
            <div className="absolute left-0 top-[48%] h-2 w-full rotate-6 bg-white shadow-sm" />
            <div className="absolute left-[48%] top-0 h-full w-2 -rotate-12 bg-white shadow-sm" />

            {/* Farmer location */}
            <div className="absolute left-[25%] top-[70%]">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white shadow-lg">
                <Navigation size={21} />
              </div>
              <p className="mt-1 whitespace-nowrap text-xs font-semibold text-green-700">
                Your Location
              </p>
            </div>

            {/* Market pins */}
            {markets.map((market, index) => (
              <div
                key={market.name}
                className={`absolute ${market.position} group`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-4 border-white shadow-lg ${
                    index === 0 ? "bg-green-600" : "bg-orange-500"
                  }`}
                >
                  <MapPin size={19} className="text-white" />
                </div>

                <div className="absolute left-1/2 top-12 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-2 text-xs shadow-lg group-hover:block">
                  <p className="font-semibold text-slate-800">
                    {market.name}
                  </p>
                  <p className="text-slate-500">
                    {market.distance} km · ₹{market.price}/q
                  </p>
                </div>
              </div>
            ))}

            <div className="absolute bottom-4 left-4 rounded-lg bg-white/90 px-3 py-2 text-xs text-slate-500 shadow">
              Map visualization — prototype
            </div>
          </div>
        </div>

        {/* Market List */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-4">
            <h2 className="font-semibold text-slate-800">
              Market Details
            </h2>
            <p className="text-xs text-slate-400">
              Based on current prototype data
            </p>
          </div>

          <div className="space-y-3 p-4">
            {markets.map((market, index) => {
              const netReturn = market.price * 20 - market.transport;

              return (
                <div
                  key={market.name}
                  className={`rounded-xl border p-4 ${
                    index === 0
                      ? "border-green-200 bg-green-50"
                      : "border-slate-100 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <MapPin
                          size={16}
                          className={
                            index === 0
                              ? "text-green-600"
                              : "text-slate-400"
                          }
                        />
                        <h3 className="text-sm font-semibold text-slate-800">
                          {market.name}
                        </h3>
                      </div>

                      {index === 0 && (
                        <span className="mt-2 inline-block rounded-full bg-green-100 px-2 py-1 text-[10px] font-bold text-green-700">
                          RECOMMENDED
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-medium text-slate-500">
                      {market.distance} km
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-white p-2">
                      <p className="text-[10px] text-slate-400">
                        Market Price
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-800">
                        ₹{market.price}
                        <span className="text-[10px] font-normal">
                          /q
                        </span>
                      </p>
                    </div>

                    <div className="rounded-lg bg-white p-2">
                      <p className="text-[10px] text-slate-400">
                        Transport
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-800">
                        ₹{market.transport}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <IndianRupee size={13} />
                      Est. Net Return
                    </div>

                    <span className="text-sm font-bold text-green-700">
                      ₹{netReturn.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-slate-100 p-4">
            <div className="flex gap-3 rounded-xl bg-amber-50 p-3">
              <Truck
                size={18}
                className="mt-0.5 shrink-0 text-amber-600"
              />

              <p className="text-xs leading-5 text-amber-700">
                Transport costs shown here are estimated prototype values.
                Actual costs may vary by vehicle, route and quantity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MarketMap;