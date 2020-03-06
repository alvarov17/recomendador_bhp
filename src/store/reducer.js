import { combineReducers } from 'redux';
import auth from './ducks/auth';
import graphSag from './ducks/graphSag';
import graphRecom from './ducks/graphRecom';
import recom from './ducks/recom';
import cabeceras from './ducks/cabeceras';

export default combineReducers({
  auth, graphSag, graphRecom, recom, cabeceras,
});
