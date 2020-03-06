import React from 'react';
import {
  Grid, Paper, Typography, makeStyles,
} from '@material-ui/core';
import {
  LineChart, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer,
} from 'recharts';

import nombreConvert from '../../../utils/nombreConvert';

const useStyles = makeStyles((theme) => ({
  grid: { padding: theme.spacing(1) },
}));


const Grafico = ({
  data, nombre, varName, name,
}) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.grid}>
      <Grid item xs={12}>
        <Paper>
          <Typography variant="h6" style={{ textAlign: 'center' }}>
            {nombreConvert(varName)}
          </Typography>
          <ResponsiveContainer height={190}>
            <LineChart
              data={data}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <XAxis stroke="black" dataKey="time" />
              {varName === 'RECUPERACIÓN'
                ? <YAxis stroke="black" domain={['auto', 'auto']} />
                : <YAxis stroke="black" />}
              <Tooltip labelStyle={{ color: 'black' }} />
              <Legend />
              <Line type="monotone" dataKey="hl" stroke="#0098AA" dot={false} strokeWidth={3} />
              <Line type="monotone" dataKey="tag" stroke="#E55302" dot={false} strokeWidth={3} />
              <Line type="monotone" dataKey="ll" stroke="#0098AA" dot={false} strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Grafico;
