import { Box, Grid } from "@mui/material";
import { EmailOutlined, HttpsOutlined } from "@mui/icons-material";

import loginImage from "../assets/login-image.png";

export default function Login() {
  return (
    <>
      <Grid
        container
        sx={{ height: "100vh", width: "100vw" }}
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <Box
          sx={{
            width: "450px",
            height: "400px",
            backgroundColor: "#191919",
            borderRadius: "15px",
            color: "white",
          }}
        >
          <Box
            display='flex'
            flexDirection='column'
            gap='5px'
            justifyContent='center'
            alignItems='center'
            height='100%'
          >
            <img src={loginImage} style={{ width: "100px" }} />

            <span style={{ fontSize: "18px", fontWeight: 600 }}>
              Bem vindo de volta
            </span>
            <p style={{ color: "grey", fontSize: "14px" }}>
              Insira suas informações para continuar
            </p>

            <Box
              display='flex'
              alignItems='center'
              gap='5px'
              width='80%'
              p='9px'
              sx={{ backgroundColor: "#121212", borderRadius: "8px" }}
            >
              <EmailOutlined />
              <input
                placeholder='Email'
                style={{
                  color: "white",
                  width: "90%",
                  background: "transparent",
                  outline: "none",
                  border: "none",
                }}
              />
            </Box>

            <Box
              display='flex'
              alignItems='center'
              gap='5px'
              width='80%'
              p='9px'
              sx={{ backgroundColor: "#121212", borderRadius: "8px" }}
            >
              <HttpsOutlined />
              <input
                type='password'
                placeholder='Senha'
                style={{
                  color: "white",
                  width: "90%",
                  background: "transparent",
                  outline: "none",
                  border: "none",
                }}
              />
            </Box>

            <button
              style={{
                padding: "10px",
                borderRadius: "12px",
                width: "50%",
                color: "white",
                backgroundColor: "rgb(124 58 237)",
                marginTop: "10px",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </Box>
        </Box>
      </Grid>
    </>
  );
}
