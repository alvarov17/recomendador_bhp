import Axios from 'axios';

// Actions
const CABECERA_REQUEST = 'CABECERA_REQUEST';
const CABECERA_SUCCESS = 'CABECERA_SUCCESS';

// Initial State
const initialState = {
  payload: [],
  loading: true,
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CABECERA_REQUEST:
      return {
        ...state,
        payload: [],
        loading: true,
      };
    case CABECERA_SUCCESS:
      return {
        ...state,
        payload: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

// Action Creators
export function fetchCabecera() {
  return async (dispatch) => {
    try {
      dispatch({ type: CABECERA_REQUEST });
      const response = await Axios.get('http://10.18.18.235:3002/cabeceras');
      let val;
      response.data.map((x) => {
        val = { ...val, [x.nombre]: x.valor };
        return val;
      });
      dispatch({ type: CABECERA_SUCCESS, payload: val });
    } catch (error) {
      dispatch({ type: CABECERA_REQUEST });
    }
  };
}
