import { authContext, userContext } from "../contexts/authContext"

export const useAuthContext = () => {
    return userContext(authContext);
}