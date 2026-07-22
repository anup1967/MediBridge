import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import api from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      return JSON.parse(savedUser);
    }

    return null;
  });

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    api.defaults.headers.common.Authorization =
      `Bearer ${data.token}`;

    setUser(data.user);

    return data.user;
  };

  const register = async (formData) => {
    const { data } = await api.post(
      "/auth/register",
      formData
    );

    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    delete api.defaults.headers.common.Authorization;

    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading: false,
      login,
      register,
      logout,
      isAuthenticated: !!user,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}