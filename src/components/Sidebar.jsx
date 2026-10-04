import {
  LayoutDashboard,
  Store,
  GitCompare,
  TrendingUp,
  Sprout,
  Map,
  BookOpen,
  Info,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Overview", icon: LayoutDashboard, path: "/" },
  { name: "Market Prices", icon: Store, path: "/market-prices" },
  { name: "Compare Markets", icon: GitCompare, path: "/compare-markets" },
  { name: "Price Trends", icon: TrendingUp, path: "/price-trends" },
  { name: "Crop Advisory", icon: Sprout, path: "/crop-advisory" },
  { name: "Market Map", icon: Map, path: "/market-map" },
];

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      
      {/* Logo */}
      <div className="border-b border-slate-100 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-xl">
            🌾
          </div>

          <div>
            <h1 className="text-lg font-bold text-green-700">
              AgriMitra
            </h1>

            <p className="text-[10px] font-semibold tracking-widest text-slate-400">
              SMART MARKET INTELLIGENCE
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-5">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Main Menu
        </p>

        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-green-50 text-green-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-green-700"
                  }`
                }
              >
                <Icon size={19} strokeWidth={1.8} />
                {item.name}
              </NavLink>
            );
          })}
        </div>

        {/* Support */}
        <div className="mt-8">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Support
          </p>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-green-50 text-green-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-green-700"
              }`
            }
          >
            <BookOpen size={19} strokeWidth={1.8} />
            Market Basics Guide
          </NavLink>

          <NavLink
            to="/about"
            className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-green-700"
          >
            <Info size={19} strokeWidth={1.8} />
            About AgriMitra
          </NavLink>
        </div>
      </nav>

      {/* Farmer Profile */}
      <div className="border-t border-slate-100 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
            RK
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800">
              Ramesh Kumar
            </p>

            <p className="text-xs text-slate-500">
              Farmer Dashboard
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;