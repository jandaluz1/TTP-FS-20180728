import axios from 'axios';

const GET_STOCKS = 'GET_STOCKS';

const getStocks = portfolio => ({ type: GET_STOCKS, portfolio });

export const fetchStocks = () => async dispatch => {
  try {
    const res = await axios.get('/api/user/portfolio');
    console.log(res.data);
    dispatch(getStocks(res.data));
  } catch (err) {
    console.error(err);
  }
};

const reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_STOCKS:
      return action.portfolio || {};
    default:
      return state;
  }
};

export default reducer;
