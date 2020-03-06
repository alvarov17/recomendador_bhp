import React, { useReducer } from 'react';
import {
  Paper, Typography, Divider, Container, Chip, makeStyles, Grid,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import RecomendacionBuilder from './RecomendacionBuilder';
import nombreConvert from '../../../utils/nombreConvert';


const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: 'center',
    height: '72vh',
  },
  chip: {
    marginTop: theme.spacing(1),
    fontSize: 11,
  },
  tabs: {
    marginBottom: theme.spacing(1),
  },

}));

const Recomendaciones = () => {
  const classes = useStyles();
  const varName = useSelector((state) => state.graphSag.varName);

  return (
    <Grid item sm={12} md={4}>
      <Paper className={classes.paper}>
        <Container>
          {varName ? (
            <Typography variant="body1">
              Recomendaciones para
              {' '}
              {nombreConvert(varName)}
            </Typography>
          ) : ''}
          <Divider />
          <RecomendacionBuilder />
        </Container>
      </Paper>
    </Grid>
  );
};

export default Recomendaciones;
