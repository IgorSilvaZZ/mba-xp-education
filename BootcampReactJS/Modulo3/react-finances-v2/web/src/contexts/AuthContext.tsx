import { ReactNode, createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { IUser } from "../interfaces/IUser";
import { IAuthContextProps } from "../interfaces/IAuthContextProps";

import { api } from "../lib/axios";

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as IAuthContextProps);

export const AuthContextProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState<IUser>({} as IUser);

  const history = useHistory();

  async function getUser() {
    try {
      const { data } = await api.get("/sessao/usuario");

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function singIn(email: string, password: string): Promise<void> {
    try {
      await api.post("/sessao/criar", {
        email,
        senha: password,
      });

      const userResponse = await getUser();

      localStorage.setItem("user", JSON.stringify(userResponse));

      console.log(userResponse);

      history.push("/despesas");
    } catch (error) {
      console.log(error);

      toast.error("Email/Senha incorretos!");
    }
  }

  async function loadStorage() {
    const userInStorage = localStorage.getItem("user");

    if (userInStorage) {
      const userStorage = JSON.parse(userInStorage);

      localStorage.setItem("user", JSON.stringify(userStorage));

      setUser(userStorage);
    } else {
      history.push("/login");
    }
  }

  useEffect(() => {
    loadStorage();
  }, []);

  function logout() {
    setUser({} as IUser);

    history.push("/login");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        singIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
