import React from 'react';
import { Typography, GridListTile } from '@material-ui/core';

const RecomendacionNoData = ({ varName }) => (
  <GridListTile cols={1}>
    <Typography variant="h6">
      No se han generado recomendaciones para
      {' '}
      {varName}
    </Typography>
  </GridListTile>
);

export default RecomendacionNoData;
