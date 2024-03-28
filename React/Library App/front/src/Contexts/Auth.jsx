import { useState, createContext, useCallback } from "react";

export const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState((_) => {
    const user = window.localStorage.getItem("user");
    const role = window.localStorage.getItem("role");
    const id = window.localStorage.getItem("id");
    return user
      ? {
          user,
          role,
          id,
        }
      : null;
  });

  //Login
  const login = useCallback(
    (user, role, id) => {
      window.localStorage.setItem("user", user);
      window.localStorage.setItem("role", role);
      window.localStorage.setItem("id", id);
      setuser({
        user,
        role,
        id,
      });
    },
    [setuser]
  );

  //Logout @ useLogin

  return (
    <Auth.Provider value={{ user, setuser, login }}>{children}</Auth.Provider>
  );
};
