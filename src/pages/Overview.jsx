import HeroSection from "../components/HeroSection";
import MarketOverview from "../components/MarketOverview";
import RecommendedMandi from "../components/RecommendedMandi";
import PriceTrend from "../components/PriceTrend";
import MarketComparison from "../components/MarketComparison";
import CropAdvisory from "../components/CropAdvisory";

function Overview() {
  return (
    <main className="p-8">
      <HeroSection />
      <MarketOverview />
      <RecommendedMandi />
      <PriceTrend />
      <MarketComparison />
      <CropAdvisory />
    </main>
  );
}

export default Overview;