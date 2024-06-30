import { Avatar, Box, Grid } from "@mui/material";

import { HomeOutlined, LogoutRounded } from "@mui/icons-material";

import { ItemMenu } from "./ItemMenu";

import { useAuth } from "../hooks/useAuth";

export const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <Grid
        item
        xs={2.5}
        sx={{
          height: "100%",
          width: "100%",
          backgroundColor: "#191919",
          borderRadius: "0px 10px 10px 0px",
        }}
      >
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          p='12px 18px'
          height='100%'
        >
          <Box
            display='flex'
            width='100%'
            flex='1'
            flexDirection='column'
            gap={2}
          >
            <ItemMenu icon={<HomeOutlined />}>DashBoard</ItemMenu>

            <ItemMenu icon={<LogoutRounded />} onClick={logout}>
              Sair
            </ItemMenu>
          </Box>

          <Box
            display='flex'
            height='100px'
            width='100%'
            gap={2}
            color='white'
            alignItems='center'
          >
            {user && (
              <>
                <Avatar>{user.nome?.toUpperCase()?.substring(0, 2)}</Avatar>
                <span>{user.nome}</span>
              </>
            )}
          </Box>
        </Box>
      </Grid>
    </>
  );
};
