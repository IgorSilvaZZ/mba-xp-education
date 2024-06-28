import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import App from "./App";

export default function Routes() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/despesas/:year-:month' component={App} />
          <Route path='/despesas' component={App} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
