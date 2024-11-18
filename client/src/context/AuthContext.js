import React, { createContext, useState, useEffect } from "react";
import axios from "../utils/axiosConfig";

// Create the Auth Context
export const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user information
  const [loading, setLoading] = useState(true); // Indicates if the app is loading
  const [error, setError] = useState(null); // Stores authentication errors

  // Fetch current user on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/user");
        setUser(res.data);
      } catch (err) {
        setUser(null);
        // Optionally, handle errors (e.g., user not authenticated)
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      // Fetch CSRF token before login
      const csrfRes = await axios.get("/csrf-token");
      const csrfToken = csrfRes.data.csrfToken;

      // Perform login
      const res = await axios.post(
        "/signin",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        }
      );

      // Fetch the current user after successful login
      const userRes = await axios.get("/user");
      setUser(userRes.data);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (username, email, password) => {
    setLoading(true);
    setError(null);
    try {
      // Fetch CSRF token before registration
      const csrfRes = await axios.get("/csrf-token");
      const csrfToken = csrfRes.data.csrfToken;

      // Perform registration
      const res = await axios.post(
        "/signup",
        { username, email, password },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        }
      );

      // Fetch the current user after successful registration
      const userRes = await axios.get("/user");
      setUser(userRes.data);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch CSRF token before logout
      const csrfRes = await axios.get("/csrf-token");
      const csrfToken = csrfRes.data.csrfToken;

      // Perform logout
      await axios.post(
        "/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        }
      );

      setUser(null);
    } catch (err) {
      setError(err.response?.data?.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
