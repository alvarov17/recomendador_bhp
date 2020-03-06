import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Skeleton } from '@material-ui/lab';
import { Grid } from '@material-ui/core';
import Grafico from './Grafico';
import { fetchGraphSag, GRAPH_SET_SAG_INTERVALID } from '../../../store/ducks/graphSag';


const GraficoBuilder = () => {
  const graphSag = useSelector((state) => state.graphSag);
  const graphRecom = useSelector((state) => state.graphRecom);

  const [IntervalId, setIntervalId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGraphSag('MA2:3WIC110', 'SAG 16'));
    const id = setInterval(() => {
      setIntervalId(id);
      dispatch(fetchGraphSag('MA2:3WIC110', 'SAG 16'));
    }, 60000);
    dispatch({ type: GRAPH_SET_SAG_INTERVALID, id });
  }, []);

  return (
    <>
      <Grid item sm={12} md={8} style={{ order: 0 }}>
        <Grid direction="column" container spacing={2}>
          {graphSag.loading ? (
            <Grid item>
              <Skeleton variant="rect" height={190} />
              <Skeleton variant="text" />
            </Grid>
          ) : (
            <Grafico
              name="GRAFICO 1"
              data={graphSag.dataset}
              nombre={graphSag.nombre}
              varName={graphSag.varName}
            />
          )}

          {graphRecom.loading ? (
            <></>
          ) : (
            <Grafico
              name="GRAFICO 2"
              data={graphRecom.recom}
              nombre={graphRecom.nombre}
              varName={graphRecom.varName}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};


export default GraficoBuilder;
