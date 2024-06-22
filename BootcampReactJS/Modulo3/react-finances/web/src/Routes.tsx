import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from "./App";

export default function Routes() {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/despesas/:year-:month' component={App} />
          <Route path='/despesas' component={App} />
        </Switch>
      </Router>
    </>
  );
}
