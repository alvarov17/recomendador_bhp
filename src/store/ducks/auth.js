import Axios from 'axios';

// Actions
const AUTH_REQUEST = 'AUTH_REQUEST';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const AUTH_FAILURE = 'AUTH_FAILURE';
const AUTH_LOGOUT = 'AUTH_LOGOUT';

// Initial State
const initialState = {
  user: { firstname: '', lastname: '' },
  auth: false,
  loading: false,
  rejected: false,
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        auth: false,
        loading: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload,
        auth: true,
        loading: false,
        rejected: false,
      };
    case AUTH_FAILURE:
      return {
        ...state,
        user: {
          username: '',
          lastname: '',
        },
        auth: false,
        loading: false,
        rejected: true,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        user: { firstname: '', lastname: '' },
        auth: false,
        loading: false,
        rejected: false,
      };
    default:
      return state;
  }
}

// Action Creators
export function login(user) {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_REQUEST });
      const response = await Axios.post('http://10.18.18.235:3002/login', { email: user.email, password: user.password });
      dispatch({ type: AUTH_SUCCESS, payload: response.data });
      localStorage.setItem('user', `${response.data.firstname} ${response.data.lastname}`);
    } catch (error) {
      dispatch({ type: AUTH_FAILURE });
    }
  };
}

export function logout() {
  return async (dispatch) => {
    dispatch({ type: AUTH_LOGOUT });
    localStorage.clear('user');
  };
}
