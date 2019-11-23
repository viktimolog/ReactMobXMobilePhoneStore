import React from 'react';
import withStore from '~/hocs/withStore.js';

class Product extends React.Component {
  render() {
    return (<div>Product page</div>)
  }
}

export default withStore(Product);