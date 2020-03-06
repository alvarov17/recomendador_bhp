import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import { ThemeProvider, CssBaseline, createMuiTheme } from '@material-ui/core';
import { blue, deepPurple } from '@material-ui/core/colors';
import { Login } from './components';
import Dashboard from './components/Dashboard/Dashboard';


const theme = createMuiTheme({
  typography: {
    fontFamily: 'roboto',
  },
  palette: {
    type: 'light',
    primary: { main: blue[500] },
    secondary: { main: blue[500] },
    warning: { main: deepPurple[500] },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard />
    </ThemeProvider>

  );
}

export default App;
