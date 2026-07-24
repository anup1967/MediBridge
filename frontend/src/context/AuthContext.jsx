import {
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import api from "../api/api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (!token || !savedUser) {
      return null;
    }

    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    try {
      return JSON.parse(savedUser);
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete api.defaults.headers.common.Authorization;
      return null;
    }
  });

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", {
      email,
      password,
    });

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

    const { data } = await api.post("/auth/register", payload);

    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    delete api.defaults.headers.common.Authorization;

    setUser(null);
  };

  const updateUser = useCallback((updates) => {
    setUser((prev) => {
      if (!prev) return prev;

      const updatedUser = {
        ...prev,
        ...updates,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      return updatedUser;
    });
  }, []);

  const hasRole = useCallback(
    (role) => user?.role === role,
    [user]
  );

  const value = useMemo(
    () => ({
      user,

      login,
      register,
      logout,
      updateUser,

      loading: false,

      isAuthenticated: !!user,
      isUser: hasRole("user"),
      isHospital: hasRole("hospital"),
      isAdmin: hasRole("admin"),

      hasRole,
    }),
    [user, updateUser, hasRole]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}