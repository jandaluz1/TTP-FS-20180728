import axios from 'axios';

const GET_STOCKS = 'GET_STOCKS';
const CLEAR = 'CLEAR';

const getStocks = portfolio => ({ type: GET_STOCKS, portfolio });

export const fetchStocks = () => async dispatch => {
  try {
    const res = await axios.get('/api/stocks/quote');
    console.log(res.data);
    dispatch(getStocks(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const clear = () => ({ type: CLEAR });

const reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_STOCKS:
      return action.portfolio || {};
    case CLEAR:
      return {};
    default:
      return state;
  }
};

export default reducer;
