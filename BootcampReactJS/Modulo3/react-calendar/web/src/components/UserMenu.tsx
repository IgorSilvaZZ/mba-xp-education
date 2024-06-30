import { useState } from "react";

import { Person } from "@mui/icons-material";
import { Avatar, Box, IconButton, Menu, MenuItem } from "@mui/material";
import { logout } from "../utils/calendarUtils";

import { useAuthContext } from "../hooks/useAuthContext";

export const UserMenu = () => {
  const { user, onSignOut } = useAuthContext();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  async function singOut() {
    await logout();

    onSignOut();
  }

  return (
    <>
      <div>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <Avatar>
            <Person />
          </Avatar>
        </IconButton>
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={() => setAnchorEl(null)}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            p='16px'
            textAlign='center'
            borderBottom='1px solid rgb(224, 224, 244)'
            gap='10px'
          >
            <Avatar>
              <Person />
            </Avatar>

            <div>{user.name}</div>
            <small>{user.email}</small>
          </Box>
          <MenuItem onClick={singOut}>Sair</MenuItem>
        </Menu>
      </div>
    </>
  );
};
