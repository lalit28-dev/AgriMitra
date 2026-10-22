
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import MarketPrices from "./pages/MarketPrices";
import CompareMarkets from "./pages/CompareMarkets";
import PriceTrends from "./pages/PriceTrends";
import CropAdvisoryPage from "./pages/CropAdvisory";
import MarketMap from "./pages/MarketMap";
import About from "./pages/About";
import Overview from "./pages/Overview";
import Login from "./pages/Login";

import { useAuth } from "./context/AuthContext";

// Protect dashboard pages
function ProtectedDashboard({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
}

// Dashboard layout
function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <div className="ml-64">
        <Header />

        <Routes>
          <Route path="/" element={<Overview />} />
          <Route
            path="/market-prices"
            element={<MarketPrices />}
          />
          <Route
            path="/compare-markets"
            element={<CompareMarkets />}
          />
          <Route
            path="/price-trends"
            element={<PriceTrends />}
          />
          <Route
            path="/crop-advisory"
            element={<CropAdvisoryPage />}
          />
          <Route
            path="/market-map"
            element={<MarketMap />}
          />
          <Route path="/about" element={<About />} />
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/*"
        element={
          <ProtectedDashboard>
            <DashboardLayout />
          </ProtectedDashboard>
        }
      />
    </Routes>
  );
}

export default App;
