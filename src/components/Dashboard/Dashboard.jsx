import React, { useEffect } from 'react';
import {
  Grid, makeStyles,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import CabeceraBuilder from './Cabeceras/CabeceraBuilder';
import Recomendaciones from './Recomendaciones/Recomendaciones';
import GraficoBuilder from './Graficos/GraficoBuilder';
import { logout } from '../../store/ducks/auth';
import { fetchRecom } from '../../store/ducks/recom';
import Navbar from './Navbar';

const useStyles = makeStyles((theme) => ({
  grid: { padding: theme.spacing(2) },
}));

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleCerrarSesion = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(fetchRecom());
  }, []);

  return (
    <>
      <Navbar handleCerrarSesion={handleCerrarSesion} />
      <Grid className={classes.grid} spacing={2} container>
        <CabeceraBuilder />
        <GraficoBuilder />
        <Recomendaciones />
      </Grid>
    </>
  );
};
export default Dashboard;
