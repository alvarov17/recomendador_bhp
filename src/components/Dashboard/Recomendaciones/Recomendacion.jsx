import React, { useState, useEffect } from 'react';
import {
  GridListTile, DialogTitle, Box, Typography, Button, Chip,
  makeStyles, CardActionArea, TextField, Dialog, DialogContent,
  DialogContentText, DialogActions,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { fetchGraphRecom, GRAPH_SET_RECOM_INTERVALID, GRAPH_CLEAR_RECOM_INTERVALID } from '../../../store/ducks/graphRecom';
import { postEnviarRecom } from '../../../store/ducks/recom';


const useStyles = makeStyles((theme) => ({
  GridListTile: {
    marginTop: theme.spacing(1),
    width: '100%',
  },
  button: {
    height: theme.spacing(4),
    width: '100%',
  },
  chip: {
    fontSize: theme.spacing(1.1),
    marginRight: theme.spacing(0.5),
  },
}));

const Recomendacion = ({
  varName, valActual, valRecom, drivingFactor, tag, feedback, timestamp, modelo, comentarioBd,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const auth = useSelector((state) => state.auth);
  const intId = useSelector((state) => state.graphRecom.intervalID);

  const [commentRechazo, setCommentRechazo] = useState('');
  const [commentAceptar, setCommentAceptar] = useState('');
  const [categoria, setCategoria] = useState('');
  const [openAceptar, setOpenAceptar] = useState(false);
  const [openRechazar, setOpenRechazar] = useState(false);

  const handleClickOpenAceptar = () => {
    setOpenAceptar(true);
  };

  const handleCloseAceptar = () => {
    setOpenAceptar(false);
  };

  const handleClickOpenRechazar = () => {
    setOpenRechazar(true);
  };

  const handleCloseRechazar = () => {
    setOpenRechazar(false);
  };

  const handleGraficoRecomendacion = () => {
    clearInterval(intId);
    dispatch({ type: GRAPH_CLEAR_RECOM_INTERVALID });
    dispatch(fetchGraphRecom(tag, varName));
    const id = setInterval(() => {
      dispatch(fetchGraphRecom(tag, varName));
    }, 60000);
    dispatch({ type: GRAPH_SET_RECOM_INTERVALID, id });
  };

  const handleAceptarRecomendacion = () => {
    const fecha = new Date(timestamp);
    const fechaUtc = new Date(fecha.getTime() + fecha.getTimezoneOffset() * 60000);
    const fechaVar = `${fechaUtc.getFullYear()}-${fechaUtc.getMonth() + 1}-${fechaUtc.getDate()} ${fechaUtc.getHours()}:${fechaUtc.getMinutes()}:${fechaUtc.getSeconds()}`;
    const usuario = `${auth.user.firstname} ${auth.user.lastname}`;
    const feed = 1;
    dispatch(postEnviarRecom({
      fecha: fechaVar, tag, comentario: commentAceptar, feedback: feed, usuario,
    }, modelo));
    setOpenAceptar(false);
  };

  const handleCategorizacion = async (e) => {
    setCommentRechazo(e.target.value);
    const res = await Axios.post('http://10.18.18.235:3002/getCategorias', { texto: e.target.value });
    if (res.data.length > 0) {
      setCategoria(res.data[0].salida_categoria);
    } if (res.data.length === 0) {
      setCategoria('');
    }
  };

  const handleRechazarRecomendacion = () => {
    const fecha = new Date(timestamp);
    const fechaUtc = new Date(fecha.getTime() + fecha.getTimezoneOffset() * 60000);
    const fechaVar = `${fechaUtc.getFullYear()}-${fechaUtc.getMonth() + 1}-${fechaUtc.getDate()} ${fechaUtc.getHours()}:${fechaUtc.getMinutes()}:${fechaUtc.getSeconds()}`;
    const usuario = `${auth.user.firstname} ${auth.user.lastname}`;
    const feed = 0;

    dispatch(postEnviarRecom({
      fecha: fechaVar, tag, comentario: commentRechazo, feedback: feed, usuario, categoria,
    }, modelo));
    handleCloseRechazar();
  };

  return (
    // <Card style={{ width: '100%', padding: '0.2em' }}>
    <>
      <GridListTile className={classes.GridListTile}>
        <CardActionArea onClick={handleGraficoRecomendacion}>
          <Box display="flex" style={{ marginBottom: '20px' }}>
            <Box flexGrow={1} style={{ textAlign: 'center' }}>
              <Typography variant="body1"><b>{varName}</b></Typography>
            </Box>
          </Box>
          <Box display="flex" style={{ marginBottom: '5px' }}>
            <Box style={{ width: '50%' }}>
              <Typography variant="body2">Actual</Typography>
              <Typography variant="body2">{valActual}</Typography>
            </Box>
            <Box style={{ width: '50%' }}>
              <Typography variant="body2">Recomendado</Typography>
              <Typography variant="body2">{valRecom}</Typography>

            </Box>
          </Box>
        </CardActionArea>
        <Box display="flex">
          {
          feedback === null ? (
            <>
              <Button
                className={classes.button}
                variant="outlined"
                color="secondary"
                onClick={handleClickOpenAceptar}
              >
                Aceptar
              </Button>
              <Button
                className={classes.button}
                variant="outlined"
                color="secondary"
                onClick={handleClickOpenRechazar}
              >
                Rechazar
              </Button>
            </>
          ) : (
            <>
              <TextField
                size="small"
                id="outlined-multiline-static"
                label="Comentario"
                multiline
                rows="2"
                defaultValue={comentarioBd}
                variant="outlined"
                fullWidth
              />
            </>
          )
        }
        </Box>
      </GridListTile>
      <Dialog open={openAceptar} onClose={handleCloseAceptar}>
        <DialogTitle>
          Recomendacion para
          {' '}
          {varName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingrese comentario de aceptación
          </DialogContentText>
          <TextField
            autoFocus
            id="standard-multiline"
            label="Comentario"
            multiline
            rowsMax="4"
            fullWidth
            onInput={(e) => setCommentAceptar(e.target.value)}
          />
          <DialogActions>
            <Button color="secondary" onClick={handleAceptarRecomendacion}>
              Acepto
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Dialog open={openRechazar} onClose={handleCloseRechazar}>
        <DialogTitle>
          Rechazo de recomendación
          {' '}
          { varName }
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Escriba el motivo de su rechazo
          </DialogContentText>
          <TextField
            autoFocus
            id="standard-multiline-flexible"
            label="Motivo"
            multiline
            rowsMax="4"
            fullWidth
            onChange={handleCategorizacion}
          />
          {categoria === '' ? <></> : <Chip color="secondary" label={categoria} size="small" />}
          <DialogActions>
            <Button color="secondary" onClick={handleRechazarRecomendacion}>
              Enviar
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      {/* <Snackbar open={snackOpen} onClose={SlideTransition} TransitionComponent="Fade" /> */}
    </>
    /* </Card> */
  );
};

Recomendacion.defaultProps = {
  varName: '',
  valActual: '',
  valRecom: '',
  drivingFactor: '',
  tag: '',
  feedback: '',
};

Recomendacion.propTypes = {
  varName: PropTypes.string,
  valActual: PropTypes.number,
  valRecom: PropTypes.number,
  drivingFactor: PropTypes.string,
  tag: PropTypes.string,
  feedback: PropTypes.string,
};

export default Recomendacion;
