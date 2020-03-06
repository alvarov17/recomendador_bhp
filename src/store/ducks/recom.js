import Axios from 'axios';

// Actions
const RECOM_FETCH = 'RECOM_FETCH';
const RECOM_FETCH_SUCCESS = 'RECOM_FETCH_SUCCESS';
const RECOM_SET = 'RECOM_SET';
const RECOM_SET_SUCCESS = 'RECOM_SET_SUCCESS';
export const RECOM_HANDLE_TAB = 'RECOM_HANDLE_TAB';

// Initial State
const InitialState = {
  loading: true,
  tab: 1,
  recom: [],
};

// Reducer
export default function reducer(state = InitialState, action = {}) {
  switch (action.type) {
    case RECOM_SET:
      return {
        ...state,
        loading: true,
      };
    case RECOM_SET_SUCCESS:
      return {
        ...state,
        loading: false,
        recom: action.payload,
      };
    case RECOM_FETCH:
      return {
        ...state,
        recom: [],
        loading: true,
      };
    case RECOM_FETCH_SUCCESS:
      return {
        ...state,
        recom: action.payload,
        tab: 1,
        loading: false,
      };
    case RECOM_HANDLE_TAB:
      return {
        ...state,
        tab: action.id,
      };
    default:
      return state;
  }
}

// Action Creators
export function fetchRecom(modelo = 'SAG1') {
  return async (dispatch) => {
    dispatch({ type: RECOM_FETCH });
    const response = await (await Axios.get('http://10.18.18.235:3002/get_recom')).data.filter((e) => e.modelo === modelo);
    dispatch({ type: RECOM_FETCH_SUCCESS, payload: response });
  };
}

export function postEnviarRecom(data, modelo) {
  const {
    fecha, tag, comentario, feedback, usuario, categoria,
  } = data;
  return async (dispatch) => {
    dispatch({ type: RECOM_SET });
    await Axios.post('http://10.18.18.235:3002/set_recom', {
      fecha, tag, comentario, feedback, usuario, categoria,
    });
    const response = await (await Axios.get('http://10.18.18.235:3002/get_recom')).data.filter((e) => e.modelo === modelo);
    dispatch({ type: RECOM_SET_SUCCESS, payload: response });
  };
}
