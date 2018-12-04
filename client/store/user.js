import axios from 'axios';
import history from '../history';

const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me');
    console.log('ME');
    const user = {
      name: res.data.name,
      email: res.data.email,
      balance: res.data.balance
    };
    dispatch(getUser(user || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const signUp = user => async dispatch => {
  try {
    const res = await axios.post('/auth/signup', user);
    dispatch(getUser(res.data));
    history.push('/profile');
  } catch (err) {
    console.error(err);
  }
};

export const login = info => async dispatch => {
  try {
    const res = await axios.post('/auth/login', info);
    if (res.data) {
      const user = {
        name: res.data.name,
        email: res.data.email,
        balance: res.data.balance
      };
      dispatch(getUser(user));
      history.push('/profile');
    }
  } catch (err) {
    console.error(err);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout');
    dispatch(removeUser());
    history.push('/login');
  } catch (err) {
    console.error(err);
  }
};
const defaultUser = {};
const reducer = (state = defaultUser, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
};

export default reducer;
