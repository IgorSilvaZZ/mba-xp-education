import { FormEvent, useState } from "react";

import { Box, Button, Container, TextField } from "@mui/material";
import { login } from "../utils/calendarUtils";
import { IUser } from "../interfaces/Calendar";

interface LoginProps {
  onLogin: (user: IUser) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("danilo@email.com");
  const [password, setPassword] = useState("1234");

  const [errors, setErrors] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      const user = await login(email, password);

      onLogin(user);
    } catch (error) {
      console.log(error);

      setErrors("Email não encontrado ou senha incorreta!");
    }
  }

  return (
    <>
      <Container maxWidth='sm'>
        <h1>React Calendar</h1>

        <p>
          Digite e-mail e senha para entrar no sistema. Para testar, use o
          e-mail <kbd>danilo@email.com</kbd> e a senha <kbd>1234</kbd>
        </p>

        <form onSubmit={handleSubmit}>
          <TextField
            margin='normal'
            variant='outlined'
            label='E-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />

          <TextField
            type='password'
            margin='normal'
            variant='outlined'
            label='Senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />

          {errors && (
            <Box
              sx={{
                backgroundColor: "rgb(253, 236, 234)",
                borderRadius: "4px",
                p: "16px",
                m: "16px 0",
              }}
            >
              {errors}
            </Box>
          )}

          <Box textAlign='right' mt='16px'>
            <Button type='submit' variant='contained' color='primary'>
              Entrar
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
}
