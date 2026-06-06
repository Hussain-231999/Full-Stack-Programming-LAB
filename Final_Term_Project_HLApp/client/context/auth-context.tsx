"use client";

import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { apiRequest, AuthResponse, AuthUser, Role } from "@/lib/api";

type Credentials = {
  email: string;
  password: string;
};

type RegisterPayload = Credentials & {
  name: string;
  role: Role;
};

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (credentials: Credentials) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const tokenKey = "healthcare_auth_token";
const userKey = "healthcare_auth_user";

function persistSession(token: string, user: AuthUser) {
  localStorage.setItem(tokenKey, token);
  localStorage.setItem(userKey, JSON.stringify(user));
  document.cookie = `auth_token=${token}; path=/; max-age=604800; samesite=lax`;
}

function clearSession() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(userKey);
  document.cookie = "auth_token=; path=/; max-age=0; samesite=lax";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(tokenKey);
    const storedUser = localStorage.getItem(userKey);

    if (!storedToken) {
      setIsLoading(false);
      return;
    }

    setToken(storedToken);

    if (storedUser) {
      setUser(JSON.parse(storedUser) as AuthUser);
    }

    apiRequest<{ user: AuthUser }>("/auth/me", { token: storedToken })
      .then(({ user: freshUser }) => {
        setUser(freshUser);
        persistSession(storedToken, freshUser);
      })
      .catch(() => {
        clearSession();
        setToken(null);
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const applyAuthResponse = useCallback((data: AuthResponse) => {
    setToken(data.token);
    setUser(data.user);
    persistSession(data.token, data.user);
    router.push("/dashboard");
  }, [router]);

  const login = useCallback(async (credentials: Credentials) => {
    const data = await apiRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials)
    });

    applyAuthResponse(data);
  }, [applyAuthResponse]);

  const register = useCallback(async (payload: RegisterPayload) => {
    const data = await apiRequest<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload)
    });

    applyAuthResponse(data);
  }, [applyAuthResponse]);

  const logout = useCallback(async () => {
    if (token) {
      await apiRequest("/auth/logout", { method: "POST", token }).catch(() => null);
    }

    clearSession();
    setToken(null);
    setUser(null);
    router.push("/login");
  }, [router, token]);

  const value = useMemo(
    () => ({ user, token, isLoading, login, register, logout }),
    [user, token, isLoading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

