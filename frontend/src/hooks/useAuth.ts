import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { create } from "zustand";

type User = { id: string; username: string; role: "ADMIN" | "EMPLOYEE" } | null;

type AuthState = {
  user: User;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  login: (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ token, user });
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ token: null, user: null });
  }
}));

export function getAuthToken() {
  return localStorage.getItem("token");
}

export function useAuth() {
  const store = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        store.login(token, user);
      } catch {
        store.logout();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = (token: string, user: User) => {
    store.login(token, user);
    navigate("/employees");
  };
  const logout = () => {
    store.logout();
    navigate("/login");
  };

  return { user: store.user, token: store.token, login, logout };
}

export { useAuthStore };
