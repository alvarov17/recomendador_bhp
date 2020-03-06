import React from 'react';
import {
  Grid, Typography, Box,
  Card, CardActionArea, Container, Badge,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from '@material-ui/lab';
import { fetchGraphSag, GRAPH_SET_SAG_INTERVALID, GRAPH_CLEAR_SAG_INTERVALID } from '../../../store/ducks/graphSag';
import { fetchRecom } from '../../../store/ducks/recom';
import { GRAPH_FETCH_RECOM } from '../../../store/ducks/graphRecom';

const Cabecera = ({
  opt, real, pred, loading, varName, name, tag, modelo, pop,
}) => {
  const dispatch = useDispatch();
  const intIdGraphSag = useSelector((state) => state.graphSag.intervalID);
  const intIdGraphRecom = useSelector((state) => state.graphRecom.intervalID);

  const handleGraficoCabecera = () => {
    clearInterval(intIdGraphSag);
    clearInterval(intIdGraphRecom);
    dispatch({ type: GRAPH_CLEAR_SAG_INTERVALID });
    dispatch({ type: GRAPH_FETCH_RECOM });
    dispatch(fetchGraphSag(tag, varName));
    const t = setInterval(() => {
      dispatch(fetchGraphSag(tag, varName));
    }, 60000);
    dispatch(fetchRecom(modelo));
    dispatch({ type: GRAPH_SET_SAG_INTERVALID, id: t });
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      {
        loading ? (
          <>
            <Skeleton onClick={handleGraficoCabecera} variant="rect" height={80}>
              <Typography variant="h6" style={{ textAlign: 'center' }}><b>{name}</b></Typography>
            </Skeleton>
            <Skeleton variant="text" />
          </>
        )
          : (
            <Badge badgeContent={pop} color="secondary" style={{ width: '100%', badge: { width: '50px' } }}>
              <Card style={{ width: '100%' }} onClick={handleGraficoCabecera}>
                <CardActionArea>
                  <Container>
                    <Box display="flex">
                      <Box flexGrow={1}>
                        <Typography variant="h6" style={{ textAlign: 'center' }}><b>{name }</b></Typography>
                      </Box>
                      <Box />
                    </Box>
                    <Box display="flex" justifyContent="space-between" style={{ marginTop: '20px', textAlign: 'center' }}>
                      <Box>
                        <Typography variant="body2">
                          Real
                        </Typography>
                        <Typography variant="body2">
                          <b>{real}</b>
                        </Typography>
                      </Box>
                      {varName === 'MoBo 19' ? <></> : (
                        <Box>
                          <Typography variant="body2">
                            Predicción
                          </Typography>
                          <Typography variant="body2">
                            <b>
                              {pred}
                            </b>
                          </Typography>
                        </Box>
                      )}
                      <Box>
                        <Typography variant="body2">
                          Optimizado
                        </Typography>
                        <Typography variant="body2">
                          <b>{opt}</b>
                        </Typography>
                      </Box>
                    </Box>
                  </Container>
                </CardActionArea>
              </Card>
            </Badge>
          )
      }
    </Grid>
  );
};

Cabecera.defaultProps = {
  varName: '',
  opt: 0,
  pred: '',
  loading: '',
  real: '',
  tag: '',
  modelo: '',
};

Cabecera.propTypes = {
  varName: PropTypes.string,
  modelo: PropTypes.string,
  opt: PropTypes.number,
  pred: PropTypes.number,
  loading: PropTypes.bool,
  real: PropTypes.number,
  tag: PropTypes.string,
};

export default Cabecera;
