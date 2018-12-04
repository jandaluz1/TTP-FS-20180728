import { IEXClient } from 'iex-api';
import * as _fetch from 'isomorphic-fetch';
import history from '../history';

const iex = new IEXClient(_fetch);

const ADD_STOCK = 'ADD_STOCK';
const CLEAR_ORDER = 'CLEAR_ORDER';

export const addStock = stock => ({ type: ADD_STOCK, stock });

export const clearOrder = () => ({ type: CLEAR_ORDER });

export const fetchStock = (symbol, quantity) => async dispatch => {
  try {
    console.log('FETCHSTOCK', symbol);
    const res = await iex.stockQuote(symbol);
    const stock = {
      symbol,
      name: res.companyName,
      price: res.latestPrice,
      quantity
    };
    console.log(stock);
    // stock ? dispatch(addStock(stock)) : dispatch();
    if (stock) {
      dispatch(addStock(stock));
    }
  } catch (err) {
    console.error(err);
  }
};

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STOCK:
      return action.stock;
    case CLEAR_ORDER:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
