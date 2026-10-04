import { Bell, MapPin } from "lucide-react";

function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
      
      {/* Location & Status */}
      <div>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <MapPin size={17} className="text-green-600" />
          Maharashtra
          <span className="text-slate-300">/</span>
          Market Desk
        </div>

        <p className="mt-1 text-xs text-slate-400">
          Latest available market data
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">
        <button
          className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-green-700"
          aria-label="Notifications"
        >
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-green-500" />
        </button>

        <div className="flex items-center gap-3 border-l border-slate-200 pl-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
            LB
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">
              Lalit Bari
            </p>

            <p className="text-xs text-slate-400">
              Farmer
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;