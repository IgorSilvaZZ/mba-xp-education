import { useContext } from "react";

import { IAuthContextProps } from "../interfaces/IAuthContextProps";

import { AuthContext } from "../contexts/AuthContext";

export const useAuth = (): IAuthContextProps => {
  const context = useContext(AuthContext);

  return context;
};
