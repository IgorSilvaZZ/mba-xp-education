import { createContext } from "react";

import { IUser } from "../interfaces/Calendar";

export interface IAuthContext {
  user: IUser;
  onSignOut: () => void;
}

export const userContext = createContext<IUser>({
  name: "Anonimo",
  email: "",
});

export const logoutContext = createContext<() => void>(() => {});

export const authContext = createContext<IAuthContext>({
  user: {
    name: "Anonimo",
    email: "",
  },
  onSignOut: () => {},
});
