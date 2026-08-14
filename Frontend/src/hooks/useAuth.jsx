import React, { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const raw = localStorage.getItem("authUser");

      if (token && raw) {
        const parsed = JSON.parse(raw);

        if (parsed.expiration) {
          const exp = Date.parse(parsed.expiration);

          if (!isNaN(exp) && Date.now() > exp) {
            localStorage.removeItem("token");
            localStorage.removeItem("authUser");
            setAuthUser(null);
            setIsInitializing(false);
            return;
          }
        }

        setAuthUser(parsed);
      }
    } catch (e) {
      localStorage.removeItem("token");
      localStorage.removeItem("authUser");
      setAuthUser(null);
    } finally {
      setIsInitializing(false);
    }
  }, []);

  const setAuthSession = (resp) => {
    const {
      token,
      expiration,
      userId,
      email: respEmail,
      firstName,
      lastName,
      role,
    } = resp;

    if (!token) {
      localStorage.removeItem("token");
      setAuthUser(null);
      return resp;
    }

    localStorage.setItem("token", token);

    const user = {
      userId,
      email: respEmail,
      firstName,
      lastName,
      role,
      expiration,
    };

    localStorage.setItem("authUser", JSON.stringify(user));
    setAuthUser(user);

    return resp;
  };

  const login = async (email, password) => {
    const resp = await authService.login(email, password);
    return setAuthSession(resp);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (e) {
      // Continue logout even if API request fails
    }

    localStorage.removeItem("token");
    localStorage.removeItem("authUser");
    setAuthUser(null);
  };

  const value = {
    authUser,
    isAuthenticated: !!authUser,
    isInitializing,
    login,
    logout,
    setAuthSession,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}