import { IUser } from "./IUser";

export interface IAuthContextProps {
  user: IUser;
  singIn: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
