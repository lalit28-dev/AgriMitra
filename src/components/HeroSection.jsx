import { useState } from "react";
import { Search, MapPin, Wheat } from "lucide-react";

function HeroSection() {
  const [crop, setCrop] = useState("Onion");
  const [district, setDistrict] = useState("Nashik");
  const [quantity, setQuantity] = useState(20);

  const handleSearch = () => {
    console.log({
      crop,
      district,
      quantity,
    });
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-green-700 p-8 text-white shadow-sm md:p-10">
      
      {/* Decorative background */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-600 opacity-40" />
      <div className="absolute -bottom-24 right-20 h-72 w-72 rounded-full bg-green-800 opacity-40" />

      <div className="relative z-10 max-w-3xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-green-50">
          <Wheat size={14} />
          Maharashtra Market Intelligence
        </div>

        <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          Sell smarter.
          <br />
          <span className="text-green-200">Grow stronger.</span>
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-6 text-green-50 md:text-base">
          Compare mandi prices, estimate your net return, and find better
          selling opportunities for your harvest.
        </p>

        {/* Search Box */}
        <div className="mt-8 rounded-2xl bg-white p-4 shadow-xl">
          <div className="grid gap-3 md:grid-cols-4">
            
            {/* Crop */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-500">
                I WANT TO SELL
              </label>

              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-medium text-slate-800 outline-none focus:border-green-500"
              >
                <option>Onion</option>
                <option>Soybean</option>
                <option>Cotton</option>
                <option>Maize</option>
                <option>Tomato</option>
              </select>
            </div>

            {/* District */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-500">
                MY DISTRICT
              </label>

              <div className="relative">
                <MapPin
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600"
                />

                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-9 pr-3 text-sm font-medium text-slate-800 outline-none focus:border-green-500"
                >
                  <option>Nashik</option>
                  <option>Jalgaon</option>
                  <option>Dhule</option>
                  <option>Pune</option>
                  <option>Ahmednagar</option>
                </select>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-500">
                QUANTITY (QUINTALS)
              </label>

              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-medium text-slate-800 outline-none focus:border-green-500"
              />
            </div>

            {/* Search */}
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
              >
                <Search size={17} />
                Find Best Mandi
              </button>
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            We'll compare available markets and estimate your net return.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;