import React, { useState } from 'react';
import {
  Paper, makeStyles, Box, Typography, TextField, Button, Grid, Grow,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Redirect } from 'react-router-dom';
import logo from './logo.svg';
import { login } from '../../store/ducks/auth';

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper: {
    padding: theme.spacing(5),
  },
}));


const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const auth = useSelector((state) => state.auth);

  const submit = (e) => {
    e.preventDefault();
    dispatch(login({ email: user, password }));
  };


  return (
    auth.auth ? <Redirect to="/dashboard" />
      : (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
          <Grid
            item
            xs={5}
          >
            <Paper className={classes.paper}>
              <Box className={classes.box}>
                <img src={logo} width="120" alt="Logo de Codelco" />
                <Typography variant="h5">
                  Inicio de sesión
                </Typography>
                <Typography variant="h6">
                  Centro Integrado de Operaciones
                  Chuquicamata
                </Typography>
              </Box>
              <form>
                <TextField
                  margin="normal"
                  required
                  id="email"
                  label="Usuario"
                  name="username"
                  autoComplete="email"
                  autoFocus
                  fullWidth
                  onInput={(e) => setUser(e.target.value)}
                />
                <TextField
                  margin="normal"
                  label="Contraseña"
                  required
                  id="password"
                  name="password"
                  autoComplete="password"
                  fullWidth
                  onInput={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={(e) => submit(e)}
                >
                  Submit
                </Button>
              </form>
              {
          auth.rejected
            ? (
              <Grow timeout={800} in>
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  Usuario o contraseña invalidos
                </Alert>
              </Grow>
            )
            : console.log('ok')
        }
            </Paper>
          </Grid>
        </Grid>
      )
  );
};

export default Login;
