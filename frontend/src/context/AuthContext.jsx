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

    // Backend returns the user fields directly
    const loggedInUser = {
      _id: data._id,
      name: data.name,
      email: data.email,
      role: data.role,
    };

    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "user",
      JSON.stringify(loggedInUser)
    );

    api.defaults.headers.common.Authorization = `Bearer ${data.token}`;

    setUser(loggedInUser);

    return loggedInUser;
  };

  const register = async (formData) => {
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    const { data } = await api.post(
      "/auth/register",
      payload
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
      login,
      register,
      logout,
      loading: false,
      isAuthenticated: !!user,
      isUser: user?.role === "user",
      isHospital: user?.role === "hospital",
      isAdmin: user?.role === "admin",
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