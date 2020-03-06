import Axios from 'axios';

// Actions
const GRAPH_FETCH_SAG = 'GRAPH_FETCH_SAG';
const GRAPH_FETCH_SAG_SUCCESS = 'GRAPH_FETCH_SAG_SUCCESS';

export const GRAPH_SET_SAG_INTERVALID = 'GRAPH_SET_SAG_INTERVALID';
export const GRAPH_CLEAR_SAG_INTERVALID = 'GRAPH_CLEAR_SAG_INTERVALID';

// Initial State
const InitialState = {
  loading: true,
  varName: '',
  tag: '',
  intervalID: 0,
  dataset: [],
};

// Reducer
export default function reducer(state = InitialState, action = {}) {
  switch (action.type) {
    case GRAPH_FETCH_SAG:
      return {
        ...state,
        varName: '',
        tag: '',
        dataset: [],
        loading: true,
      };
    case GRAPH_FETCH_SAG_SUCCESS:
      return {
        ...state,
        varName: action.varName,
        tag: action.tag,
        dataset: action.dataset,
        loading: false,
      };
    case GRAPH_SET_SAG_INTERVALID:
      return {
        ...state,
        intervalID: action.id,
      };
    case GRAPH_CLEAR_SAG_INTERVALID:
      return {
        ...state,
        intervalID: 0,
      };
    default:
      return state;
  }
}

// Action Creators
export function fetchGraphSag(tag, varName) {
  return async (dispatch) => {
    dispatch({ type: GRAPH_FETCH_SAG });
    if (varName === 'RECUPERACIÓN') {
      const response = await Axios.get('http://10.18.18.235:3002/getChartRecuperacion');
      dispatch({
        type: GRAPH_FETCH_SAG_SUCCESS, dataset: response.data, tag, varName,
      });
    } else {
      const response = await Axios.get(`http://10.18.18.235:3002/GetChart2?variable=${tag}`);
      dispatch({
        type: GRAPH_FETCH_SAG_SUCCESS, dataset: response.data, tag, varName,
      });
    }
  };
}
