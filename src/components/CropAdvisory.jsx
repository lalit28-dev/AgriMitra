import {
  Lightbulb,
  TrendingUp,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

const insights = [
  {
    icon: TrendingUp,
    title: "Price momentum",
    text: "Onion prices have shown an upward movement in the selected market.",
  },
  {
    icon: CalendarDays,
    title: "Selling window",
    text: "Compare the latest available prices before deciding when and where to sell.",
  },
  {
    icon: Lightbulb,
    title: "Smart decision",
    text: "A higher market price may not mean higher profit after transportation costs.",
  },
];

function CropAdvisory() {
  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-green-600">
            Crop Advisory
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-800">
            Market insights for your crop
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Simple insights based on available market information.
          </p>
        </div>

        <button className="flex items-center gap-1 text-sm font-semibold text-green-600 hover:text-green-700">
          View advisory
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {insights.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-xl border border-slate-100 bg-slate-50 p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
                <Icon size={19} />
              </div>

              <h3 className="mt-4 text-sm font-bold text-slate-800">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CropAdvisory;