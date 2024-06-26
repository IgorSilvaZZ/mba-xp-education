import { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Calendar from "./pages/Calendar";
import Login from "./pages/Login";

import { IUser } from "./interfaces/Calendar";

import { getUser } from "./utils/calendarUtils";

const themeProvider = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  const [user, setUser] = useState<IUser | null>(null);

  function onSignOut() {
    setUser(null);
  }

  useEffect(() => {
    getUser().then(setUser, () => setUser(null));
  }, []);

  if (user) {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <ThemeProvider theme={themeProvider}>
              <CssBaseline />
              <Route path='/calendar/:month'>
                <Calendar user={user} onSignOut={onSignOut} />
              </Route>
              <Redirect
                to={{
                  pathname: `/calendar/2021-05`,
                }}
              />
            </ThemeProvider>
          </Switch>
        </BrowserRouter>
      </>
    );
  } else {
    return <Login onLogin={setUser} />;
  }
}

export default App;
