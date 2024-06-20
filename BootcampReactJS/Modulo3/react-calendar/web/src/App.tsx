import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Calendar from "./pages/Calendar";

const themeProvider = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={themeProvider}>
        <CssBaseline />
        <Calendar />
      </ThemeProvider>
    </>
  );
}

export default App;
