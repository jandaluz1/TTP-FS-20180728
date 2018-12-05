import React, { Component } from 'react';
import { Text, Heading } from 'rebass';
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
        <Heading>Stocks you own</Heading>
        <table>
          <thead>
            <tr>
              <td>
                <Text>Stock</Text>
              </td>
              <td>
                <Text>Shares</Text>
              </td>
              <td>
                <Text>Value</Text>
              </td>
            </tr>
          </thead>
          <tbody>
            {quotes &&
              Object.keys(quotes).map((stock, idx) => (
                <tr key={idx}>
                  <td>
                    <Text>
                      {quotes[stock].quote.companyName}({stock})
                    </Text>
                  </td>
                  <td>
                    <Text>{owned[stock]}</Text>
                  </td>
                  <td>
                    {quotes[stock].quote.latestPrice -
                      quotes[stock].quote.open >
                      0 && (
                      <Text color="lightgreen">
                        $
                        {(
                          quotes[stock].quote.latestPrice * owned[stock]
                        ).toFixed(2)}
                      </Text>
                    )}
                    {quotes[stock].quote.latestPrice -
                      quotes[stock].quote.open <
                      0 && (
                      <Text color="red">
                        $
                        {(
                          quotes[stock].quote.latestPrice * owned[stock]
                        ).toFixed(2)}
                      </Text>
                    )}
                    {quotes[stock].quote.latestPrice -
                      quotes[stock].quote.open ===
                      0 && (
                      <Text color="gray">
                        $
                        {(
                          quotes[stock].quote.latestPrice * owned[stock]
                        ).toFixed(2)}
                      </Text>
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
