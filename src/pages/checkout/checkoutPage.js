import React from 'react';
import withStore from '~/hocs/withStore.js'

class Checkout extends React.Component {
  render() {
    return (<div>Checkout page</div>)
  }
}

export default withStore(Checkout);