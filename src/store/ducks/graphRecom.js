import Axios from 'axios';

// Actions
export const GRAPH_FETCH_RECOM = 'GRAPH_FETCH_RECOM';
const GRAPH_FETCH_RECOM_SUCCESS = 'GRAPH_FETCH_RECOM_SUCCESS';

export const GRAPH_SET_RECOM_INTERVALID = 'GRAPH_SET_RECOM_INTERVALID';
export const GRAPH_CLEAR_RECOM_INTERVALID = 'GRAPH_CLEAR_RECOM_INTERVALID';

// Initial State
const InitialState = {
  loading: true,
  varName: '',
  tag: '',
  intervalID: 0,
  recom: [],
};

// Reducer
export default function reducer(state = InitialState, action = {}) {
  switch (action.type) {
    case GRAPH_FETCH_RECOM:
      return {
        ...state,
        recom: [],
        varName: '',
        tag: '',
        loading: true,
      };
    case GRAPH_FETCH_RECOM_SUCCESS:
      return {
        ...state,
        recom: action.recom,
        varName: action.varName,
        tag: action.tag,
        loading: false,
      };
    case GRAPH_SET_RECOM_INTERVALID:
      return {
        ...state,
        intervalID: action.id,
      };
    case GRAPH_CLEAR_RECOM_INTERVALID:
      return {
        ...state,
        intervalID: 0,
      };
    default:
      return state;
  }
}

// Action Creators
export function fetchGraphRecom(tag, varName) {
  return async (dispatch) => {
    dispatch({ type: GRAPH_FETCH_RECOM });
    const response = await Axios.get(`http://10.18.18.235:3002/GetChart2?variable=${tag}`);
    dispatch({
      type: GRAPH_FETCH_RECOM_SUCCESS, recom: response.data, tag, varName,
    });
  };
}
