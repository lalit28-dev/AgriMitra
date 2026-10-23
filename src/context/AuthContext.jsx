import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const API_URL = (
  import.meta.env.VITE_API_URL ||
  "https://agrimitra-api-9hld.onrender.com"
).replace(/\/+$/, "");

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => sessionStorage.getItem("agrimitra_admin_token")
  );
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(Boolean(token));

  useEffect(() => {
    if (!token) {
      setUser(null);
      setChecking(false);
      return;
    }

    let active = true;

    fetch(`${API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Session expired");
        return data;
      })
      .then((data) => {
        if (active) setUser(data.user);
      })
      .catch(() => {
        sessionStorage.removeItem("agrimitra_admin_token");
        if (active) {
          setToken(null);
          setUser(null);
        }
      })
      .finally(() => {
        if (active) setChecking(false);
      });

    return () => {
      active = false;
    };
  }, [token]);

  async function login(username, password) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    sessionStorage.setItem("agrimitra_admin_token", data.token);
    setUser(data.user);
    setToken(data.token);
    setChecking(false);
  }

  function logout() {
    sessionStorage.removeItem("agrimitra_admin_token");
    setToken(null);
    setUser(null);
    setChecking(false);
  }

  const isAuthenticated = Boolean(token && user);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        checking,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be inside AuthProvider");
  }

  return context;
}
