import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Main from "./pages/Main";

import { AuthContextProvider } from "./contexts/AuthContext";

export default function Routes() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <AuthContextProvider>
            <Route path='/login' component={Login} />
            <Route path='/despesas/:year-:month' component={Main} />
            <Redirect to='/despesas/2020-01' />
          </AuthContextProvider>
        </Switch>
      </BrowserRouter>
    </>
  );
}
