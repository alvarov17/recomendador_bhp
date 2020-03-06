import React from 'react';
import {
  Tab, Tabs, GridList, makeStyles,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import Recomendacion from './Recomendacion';
import { RECOM_HANDLE_TAB } from '../../../store/ducks/recom';
import RecomendacionNoData from './RecomendacionNoData';


const useStyles = makeStyles(() => ({
  tabs: {
    width: '100%',
  },
  tab: {
    width: '33%',
    minWidth: 12,
    fontSize: 12,
  },
}));

const RecomendacionBuilder = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const recom = useSelector((state) => state.recom);

  const handleTabs = (event, newValue) => {
    dispatch({ type: RECOM_HANDLE_TAB, id: newValue });
  };

  return (
    <>
      <Tabs
        value={recom.tab}
        indicatorColor="secondary"
        textColor="primary"
        onChange={handleTabs}
        className={classes.tabs}
      >
        <Tab label="Aceptadas" className={classes.tab} />
        <Tab label="Nuevas" className={classes.tab} />
        <Tab label="Rechazadas" className={classes.tab} />
      </Tabs>
      <GridList cols={1} style={{ height: '55vh' }}>
        {
          recom.loading ? '' : recom.recom.map((e) => {
            if (e.feedback === null && recom.tab === 1) {
              return (
                <Recomendacion
                  timestamp={e.TimeStamp}
                  area={e.Area}
                  modelo={e.modelo}
                  feedback={e.feedback}
                  key={e.id}
                  varName={e.Var_Name}
                  valActual={e.Actual_Value}
                  valRecom={e.Recommended_Value}
                  drivingFactor={e.Driving_Factor}
                  tag={e.Tag}
                />
              );
            } if (e.feedback === 1 && recom.tab === 0) {
              return (
                <Recomendacion
                  comentarioBd={e.comments}
                  modelo={e.modelo}
                  feedback={e.feedback}
                  key={e.id}
                  varName={e.Var_Name}
                  valActual={e.Actual_Value}
                  valRecom={e.Recommended_Value}
                  drivingFactor={e.Driving_Factor}
                  tag={e.Tag}
                />
              );
            }
            if (e.feedback === 0 && recom.tab === 2) {
              return (
                <Recomendacion
                  modelo={e.modelo}
                  comentarioBd={e.comments}
                  feedback={e.feedback}
                  key={e.id}
                  varName={e.Var_Name}
                  valActual={e.Actual_Value}
                  valRecom={e.Recommended_Value}
                  drivingFactor={e.Driving_Factor}
                  tag={e.Tag}
                />
              );
            }
          })
        }
        {/* {
          !recom.loading && recom.recom.length === 0 ? <RecomendacionNoData varName={e.Var_Name} /> : ''
        } */}
      </GridList>
    </>
  );
};

export default RecomendacionBuilder;
