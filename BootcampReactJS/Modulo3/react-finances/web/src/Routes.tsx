import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from "./App";

export default function Routes() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path='/despesas/:year-:month' component={App} />
          <Route path='/despesas' component={App} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
