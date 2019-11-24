import React from 'react';
import PropTypes from 'prop-types';

const ProductsTable = ({cartsProducts, totalPrice}) =>
  <>
    <table className="table table-bordered">
      <tbody>
      <tr>
        <td align="center">Title</td>
        <td align="center">Price</td>
        <td align="center">Quantity</td>
        <td align="center">Total</td>
      </tr>
      {cartsProducts.map(product =>
        <tr key={product.id}>
          <td>{product.title}</td>
          <td align="right">{product.price}</td>
          <td align="center">{product.quantity}</td>
          <td align="right">{product.price * product.quantity}</td>
        </tr>)}
      <tr>
        <td colSpan="3"><strong>Total price</strong></td>
        <td align="right"><strong>{totalPrice}</strong></td>
      </tr>
      </tbody>
    </table>
  </>;

ProductsTable.propTypes = {
  cartsProducts: PropTypes.array.isRequired,
  totalPrice: PropTypes.number.isRequired
};

export default ProductsTable;