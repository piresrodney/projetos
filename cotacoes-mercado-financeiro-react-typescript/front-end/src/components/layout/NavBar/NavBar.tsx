import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import themeNavBar from "./NavBarTheme/NavBarTheme";
import NavBarList from "./NavBarList/NavBarList";

export default function NavBar() {
  const [open, setOpen] = React.useState<boolean>(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <ThemeProvider theme={themeNavBar}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer open={open} onClose={toggleDrawer(false)}>
              <NavBarList toggleList={toggleDrawer} userLogged={false} />
            </Drawer>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Cotação de Ativos
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
