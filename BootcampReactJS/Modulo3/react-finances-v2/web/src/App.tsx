import { ThemeProvider, createTheme } from "@mui/material/styles";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Routes from "./Routes";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <ToastContainer />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
