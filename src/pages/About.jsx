import {
  Sprout,
  Database,
  TrendingUp,
  MapPin,
  Calculator,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: Database,
    title: "Market Price Information",
    description:
      "Helps farmers view the latest available agricultural market prices.",
  },
  {
    icon: TrendingUp,
    title: "Price Trends",
    description:
      "Shows historical price patterns to help understand market movement.",
  },
  {
    icon: Calculator,
    title: "Net Return Calculation",
    description:
      "Compares selling price with estimated transportation cost to calculate net return.",
  },
  {
    icon: MapPin,
    title: "Market Comparison",
    description:
      "Allows farmers to compare nearby markets based on price, distance and estimated return.",
  },
];

const steps = [
  "Select the crop and location.",
  "Enter the quantity available for selling.",
  "View available market prices.",
  "Compare estimated transport costs and returns.",
  "Choose a suitable market based on the available information.",
];

function About() {
  return (
    <main className="p-8">
      {/* Header */}
      <section className="rounded-2xl bg-gradient-to-r from-green-700 to-green-600 p-8 text-white shadow-sm">
        <div className="flex items-start gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15">
            <Sprout size={30} />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-green-100">
              Smart Agricultural Market Intelligence
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              About AgriMitra
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-green-50">
              AgriMitra is a prototype decision-support system designed to
              help farmers understand agricultural market prices, compare
              nearby markets and estimate potential selling returns.
            </p>
          </div>
        </div>
      </section>

      {/* Problem & Objective */}
      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800">
            The Problem
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Farmers may find it difficult to identify where to sell their
            produce because prices can vary between markets. Comparing prices,
            distance and transportation expenses manually can take time and
            may lead to poor selling decisions.
          </p>
        </div>

        <div className="rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-green-800">
            Our Objective
          </h2>

          <p className="mt-3 text-sm leading-6 text-green-700">
            AgriMitra aims to provide market information in one place and
            support farmers in making better selling decisions using market
            prices, historical trends, distance and estimated transportation
            costs.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="mt-8">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-800">
            Key Features
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Main capabilities of the AgriMitra prototype.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <Icon size={21} />
                </div>

                <h3 className="mt-4 text-sm font-bold text-slate-800">
                  {feature.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800">
          How AgriMitra Works
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-5">
          {steps.map((step, index) => (
            <div key={step} className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                {index + 1}
              </div>

              <p className="mt-3 text-sm leading-5 text-slate-600">
                {step}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Calculation */}
      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800">
            Return Calculation
          </h2>

          <div className="mt-5 rounded-xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">
              Estimated Net Return
            </p>

            <p className="mt-3 text-lg font-bold text-green-700">
              Gross Revenue − Transport Cost
            </p>

            <p className="mt-3 text-xs leading-5 text-slate-500">
              Gross revenue is estimated using market price multiplied by the
              quantity being sold. Transportation cost is then deducted to
              estimate the potential net return.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-blue-600" size={22} />

            <h2 className="text-lg font-bold text-blue-800">
              Important Note
            </h2>
          </div>

          <p className="mt-4 text-sm leading-6 text-blue-700">
            AgriMitra is a decision-support prototype. Market prices,
            transportation costs and trend information may change. The system
            should not be treated as a guaranteed price prediction or
            financial advice.
          </p>
        </div>
      </section>

      {/* Data source */}
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800">
          Data & Future Development
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          The prototype currently uses sample market data for demonstration.
          In the next development stage, the system will integrate official
          agricultural market data through an API and store validated data in
          the backend database.
        </p>

        <div className="mt-4 rounded-xl bg-green-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
            Planned Technology Stack
          </p>

          <p className="mt-2 text-sm text-green-800">
            React · Node.js · Express · MongoDB · Official Market Data API ·
            Python/ML
          </p>
        </div>
      </section>

      {/* Footer */}
      <div className="py-8 text-center">
        <p className="text-xs text-slate-400">
          AgriMitra — Smart Agricultural Market Information & Price Advisory
          System
        </p>
        <p className="mt-1 text-xs text-slate-400">
          College Project Prototype
        </p>
      </div>
    </main>
  );
}

export default About;