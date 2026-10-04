import { ArrowRight, MapPin, Truck, IndianRupee } from "lucide-react";

const recommendedMandi = {
  name: "Nashik Mandi",
  location: "Nashik",
  distance: 18,
  price: 4620,
  quantity: 20,
  transport: 900,
};

function RecommendedMandi() {
  const grossRevenue =
    recommendedMandi.price * recommendedMandi.quantity;

  const netReturn =
    grossRevenue - recommendedMandi.transport;

  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Section heading */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-green-600">
            Recommended for your harvest
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-800">
            Make the most of this harvest
          </h2>
        </div>

        <button className="flex items-center gap-1 text-sm font-semibold text-green-600 hover:text-green-700">
          Compare markets
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Main card */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        
        {/* Mandi */}
        <div className="rounded-2xl bg-green-50 p-5 lg:col-span-1">
          <div className="flex items-center gap-2 text-green-700">
            <MapPin size={18} />
            <span className="text-sm font-medium">
              Recommended Market
            </span>
          </div>

          <h3 className="mt-3 text-2xl font-bold text-slate-800">
            {recommendedMandi.name}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {recommendedMandi.location} · {recommendedMandi.distance} km away
          </p>

          <div className="mt-5 flex items-center gap-2">
            <IndianRupee size={18} className="text-green-600" />

            <div>
              <p className="text-xs text-slate-500">
                Modal price
              </p>

              <p className="text-lg font-bold text-slate-800">
                ₹{recommendedMandi.price.toLocaleString("en-IN")}
                <span className="ml-1 text-xs font-normal text-slate-400">
                  / quintal
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Calculation */}
        <div className="rounded-2xl border border-slate-100 p-5 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-3">
            
            <div>
              <p className="text-xs text-slate-500">
                Quantity
              </p>

              <p className="mt-1 text-lg font-bold text-slate-800">
                {recommendedMandi.quantity} quintals
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Gross revenue
              </p>

              <p className="mt-1 text-lg font-bold text-slate-800">
                ₹{grossRevenue.toLocaleString("en-IN")}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Transport estimate
              </p>

              <div className="mt-1 flex items-center gap-1">
                <Truck size={16} className="text-slate-400" />

                <p className="text-lg font-bold text-slate-800">
                  ₹{recommendedMandi.transport.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </div>

          {/* Net return */}
          <div className="mt-5 flex flex-col justify-between gap-4 rounded-xl bg-slate-50 p-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-medium text-slate-500">
                Estimated net return
              </p>

              <p className="mt-1 text-2xl font-bold text-green-700">
                ₹{netReturn.toLocaleString("en-IN")}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Gross revenue − estimated transport cost
              </p>
            </div>

            <button className="rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700">
              View Market Details
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecommendedMandi;