import { IndianRupee, Store, MapPin, Clock } from "lucide-react";

const marketStats = [
  {
    title: "Best Modal Price",
    value: "₹4,620",
    subtitle: "+4.2% this week",
    icon: IndianRupee,
  },
  {
    title: "Top Market",
    value: "Nashik",
    subtitle: "Highest estimated return",
    icon: Store,
  },
  {
    title: "Markets Nearby",
    value: "12",
    subtitle: "Within 100 km",
    icon: MapPin,
  },
  {
    title: "Latest Available Data",
    value: "Today",
    subtitle: "Market data",
    icon: Clock,
  },
];

function MarketOverview() {
  return (
    <section className="mt-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {marketStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>

                  <p className="mt-2 text-2xl font-bold text-slate-800">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {stat.subtitle}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <Icon size={19} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default MarketOverview;