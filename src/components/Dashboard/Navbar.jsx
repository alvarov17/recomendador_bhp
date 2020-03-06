import React from 'react';
import {
  AppBar, Toolbar, Typography, Button, Drawer, Divider, makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    flexShrink: 0,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  return (
    <>
      <Drawer styles={classes.drawer} variant="permanent" anchor="left">
        <Divider />
      </Drawer>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h5" style={{ flexGrow: 1 }}><b>RECOMENDADOR</b></Typography>

          <Button color="inherit">Sugerencias</Button>
          <Button color="inherit">Cerrar Sesión</Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
