import { useState } from "react";
import { Eye, EyeOff, Sprout } from "lucide-react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login, isAuthenticated, user } = useAuth();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated && user?.role === "admin") {
    return (
      <Navigate
        to={location.state?.from || "/"}
        replace
      />
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(username.trim(), password);
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#f4f8f1]">
      <section className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-green-950 via-green-800 to-green-600 text-white">
        <div className="flex items-center gap-3 mb-12">
          <Sprout size={42} />
          <div>
            <h1 className="text-3xl font-bold">AgriMitra</h1>
            <p className="text-sm text-green-100">
              SMART MARKET INTELLIGENCE
            </p>
          </div>
        </div>

        <h2 className="text-5xl font-bold leading-tight">
          Better market insights.
          <span className="block text-green-200">
            Better decisions.
          </span>
        </h2>

        <p className="mt-6 max-w-lg text-lg text-green-50">
          Compare mandi prices, explore crop trends and
          make informed agricultural market decisions.
        </p>
      </section>

      <section className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-800">
              <Sprout size={30} />
            </div>

            <p className="text-sm font-bold uppercase tracking-widest text-green-700">
              Admin Portal
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Welcome back
            </h2>

            <p className="mt-2 text-slate-500">
              Sign in to access AgriMitra.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-slate-200 bg-white p-7 shadow-xl"
          >
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-semibold"
              >
                Username
              </label>

              <input
                id="username"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-green-700 py-3 font-semibold text-white transition hover:bg-green-800 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in as Admin"}
            </button>

            <p className="text-center text-xs text-slate-500">
              Authorized administrators only.
            </p>
          </form>

          <p className="mt-6 text-center text-xs text-slate-400">
            AgriMitra · Smart Agricultural Markets
          </p>
        </div>
      </section>
    </div>
  );
}