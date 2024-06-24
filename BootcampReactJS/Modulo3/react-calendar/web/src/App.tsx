import { BrowserRouter, Switch, Route } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Calendar from "./pages/Calendar";

import { getToday } from "./utils/dateUtils";

const themeProvider = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  const month = getToday().substring(0, 7);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <ThemeProvider theme={themeProvider}>
            <CssBaseline />
            <Route path='/calendar/:month' component={Calendar} />
            {/* <Redirect
              to={{
                pathname: `/calendar/${month}`,
              }}
            /> */}
          </ThemeProvider>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
