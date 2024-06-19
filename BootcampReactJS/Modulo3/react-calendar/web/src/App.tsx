import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Calendar from "./pages/Calendar";

const themeProvider = createTheme({
  palette: {
    mode: "dark",
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
