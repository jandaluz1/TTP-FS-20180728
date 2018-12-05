import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStocks } from '../store/stocks';
class Portfolio extends Component {
  componentDidMount() {
    this.props.loadQuote();
  }
  render() {
    const owned = this.props.owned;
    const quotes = this.props.quotes;
    return (
      <div>
        <h3>Stocks you own</h3>
        {console.log('QUOTES', quotes)}
        <table>
          <thead>
            <tr>
              <td>Stock</td>
              <td>Shares</td>
              <td>Value</td>
            </tr>
          </thead>
          <tbody>
            {quotes &&
              Object.keys(quotes).map((stock, idx) => (
                <tr key={idx}>
                  <td>
                    {quotes[stock].quote.companyName}({stock})
                  </td>
                  <td>{owned[stock]}</td>
                  <td>
                    $
                    {(quotes[stock].quote.latestPrice * owned[stock]).toFixed(
                      2
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}
const mapState = state => ({
  quotes: state.portfolio,
  owned: state.user.stocks
});
const mapDispatch = dispatch => ({
  loadQuote: () => dispatch(fetchStocks())
});
export default connect(
  mapState,
  mapDispatch
)(Portfolio);
