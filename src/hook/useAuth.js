import { useContext, createContext, useState } from "react";
import http from "../http";

export const authContext = createContext(null);

export function useAuth() {
  return useContext(authContext);
}

export function useProvideAuth() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  const login = (email, password) =>
    http
      .post("/api/users/login", {
        email,
        password,
      })
      .then((response) => {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
      })
      .catch((error) => {
        throw error.response;
      });
  const signup = (userName, email, password) =>
    http
      .post("/api/users/signup", {
        userName,
        email,
        password,
      })
      .then((response) => {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
      })
      .catch((error) => {
        throw error.response;
      });

  const signout = () =>
    new Promise((resolve, _reject) => {
      setToken(null);
      setUser(null);
      localStorage.removeItem("token");
      resolve();
    });

  return {
    token,
    user,
    login,
    signup,
    signout,
  };
}
