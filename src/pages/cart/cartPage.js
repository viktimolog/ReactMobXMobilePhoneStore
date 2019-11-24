import React from 'react';
import LoaderComponent from '~c/loaderComponent.js';
import MinMax from '~c/inputs/minmax.js';
import LinkButton from '~c/links/button';
import withStore from '~/hocs/withStore.js';
import { Button } from 'react-bootstrap';
import { RoutesMap } from '~/routes';

const Cart = ({store: {cartStore}}) => {
  const clearCart = () => cartStore.clearCart().catch(error => console.error(error));

  const productsRows = cartStore.cartsProducts.map(product =>
    <tr key={product.id}>
      <td>{product.title}</td>
      <td align="right">{product.price}</td>
      <td align="center">
        <MinMax
          quantity={product.quantity}
          min={1}
          max={product.rest}
          onChange={newQuant => cartStore.updateCartProduct(product.id, newQuant)}
        />
      </td>
      <td align="right">{product.quantity * product.price}</td>
      <td align="center">
        <button onClick={() => {
          cartStore.removeCartProduct(product.id)
        }}>X
        </button>
      </td>
    </tr>);

  return (
    <>
      {cartStore.getServerResponseStatus === 'pending'
        ? <LoaderComponent/>
        : <>
          <h2>Cart</h2>
          <table className="table table-bordered">
            <tbody>
            <tr>
              <td align="center">Title</td>
              <td align="center">Price</td>
              <td align="center">Quantity</td>
              <td align="center">Total</td>
              <td align="center">Delete</td>
            </tr>
            {productsRows}
            <tr>
              <td colSpan="3">
                <strong>Total price</strong>
              </td>
              <td colSpan="2" align="right">
                <strong>{cartStore.totalPrice}</strong>
              </td>
            </tr>
            </tbody>
          </table>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <LinkButton
              to={RoutesMap.checkout}
              className="btn btn-primary"
              disabled={!cartStore.cartsProductsCnt}
            >
              Checkout
            </LinkButton>
            <Button
              variant="danger"
              onClick={() => {
                clearCart()
              }}
              disabled={!cartStore.cartsProductsCnt}
            >
              Clear cart
            </Button>
          </div>
        </>}
    </>
  )
};

export default withStore(Cart);