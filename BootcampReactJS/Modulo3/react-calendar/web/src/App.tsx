import { Component, ReactNode, useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Calendar from "./pages/Calendar";
import Login from "./pages/Login";

import { IUser } from "./interfaces/Calendar";

import { getUser } from "./utils/calendarUtils";

import { authContext } from "./contexts/authContext";

const themeProvider = createTheme({
  palette: {
    mode: "light",
  },
});

function App2() {
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
        <authContext.Provider value={{ user, onSignOut }}>
          <BrowserRouter>
            <Switch>
              <ThemeProvider theme={themeProvider}>
                <CssBaseline />
                <Route path='/calendar/:month'>
                  <Calendar />
                </Route>
                <Redirect
                  to={{
                    pathname: `/calendar/2021-05`,
                  }}
                />
              </ThemeProvider>
            </Switch>
          </BrowserRouter>
        </authContext.Provider>
      </>
    );
  } else {
    return <Login onLogin={setUser} />;
  }
}

class App extends Component<object, { user: IUser | null }> {
  setUser: (user: IUser | null) => void;
  onSignOut: () => void;

  constructor(props: object) {
    super(props);
    this.state = {
      user: null,
    };

    this.setUser = (user: IUser | null) => {
      this.setState({ user });
    };

    this.onSignOut = () => {
      this.setState({ user: null });
    };
  }

  render(): ReactNode {
    const { user } = this.state;

    if (user) {
      return (
        <>
          <authContext.Provider value={{ user, onSignOut: this.onSignOut }}>
            <BrowserRouter>
              <Switch>
                <ThemeProvider theme={themeProvider}>
                  <CssBaseline />
                  <Route path='/calendar/:month'>
                    <Calendar />
                  </Route>
                  <Redirect
                    to={{
                      pathname: `/calendar/2021-05`,
                    }}
                  />
                </ThemeProvider>
              </Switch>
            </BrowserRouter>
          </authContext.Provider>
        </>
      );
    } else {
      return <Login onLogin={this.setUser} />;
    }
  }

  componentDidMount() {
    getUser().then(this.setUser, () => this.setUser(null));
  }
}

export default App;
