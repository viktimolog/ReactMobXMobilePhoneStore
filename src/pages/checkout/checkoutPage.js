import React from 'react';
import styles from './index.module.css';
import LoaderComponent from '~c/loaderComponent.js';
import ProductsTable from '~c/productsTable.js';
import CheckoutForm from '~f/checkoutForm.js';
import { Button, Modal } from 'react-bootstrap';
import withStore from '~/hocs/withStore.js'
import { Link } from 'react-router-dom';
import { RoutesMap } from '~/routes';
const { Header, Title, Body, Footer } = Modal;

class Checkout extends React.Component {
  state = {
    verifyModal: false,
    confirmModal: false
  };

  handleVerifyModal = verifyModal => this.setState({verifyModal});

  handleConfirmModal = confirmModal => {
    if (confirmModal) {
      return this.setState({confirmModal})
    }

    this.setState({confirmModal});
    this.props.history.push(RoutesMap.home);
  };

  placeOrder = () => {
    const { checkoutStore } = this.props.store;

    this.handleVerifyModal(false);
    checkoutStore.setServerResponseStatus('pending');
    checkoutStore.placeOrder().then(response => {
      this.handleConfirmModal(true);
      checkoutStore.setServerResponseStatus('fulfilled');
    }).catch(error => {
      console.error(error);
      checkoutStore.setServerResponseStatus('rejected');
    });
  };

  render() {
    const { checkoutStore, cartStore } = this.props.store;

    return(
      <>
        {checkoutStore.getServerResponseStatus === 'pending'
          ? <LoaderComponent/>
          : <>
            <Link to={RoutesMap.cart} className="btn btn-secondary">Back to Cart</Link>
            <h1 className={styles.h1}>Tell us about you</h1>
            <CheckoutForm
              handleVerifyModal={this.handleVerifyModal}
            />

            <Modal
              show={this.state.verifyModal}
              onHide={() => this.handleVerifyModal(false)}
              backdrop='static'>
              <Header closeButton>
                <Title>Verify you order</Title>
              </Header>
              <Body>
              <ProductsTable
                cartsProducts={cartStore.cartsProducts}
                totalPrice={cartStore.totalPrice}
              />
              <strong>Delivery address: </strong>{checkoutStore.getCustomerData.address}
              </Body>
              <Footer>
                <Button variant="primary" onClick={this.placeOrder}>
                  Place your order
                </Button>
                <Button variant="secondary" onClick={() => this.handleVerifyModal(false)}>
                  Close
                </Button>
              </Footer>
            </Modal>

            <Modal
              show={this.state.confirmModal}
              onHide={() => this.handleConfirmModal(false)}
              backdrop='static'
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Thank you for buying, {checkoutStore.tempDataForResultPage.customer.name}!
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>Your order: </h4>
                <ProductsTable
                  cartsProducts={checkoutStore.tempDataForResultPage.cartsProducts}
                  totalPrice={checkoutStore.tempDataForResultPage.totalPrice}
                />
                <h4>Will be send to: {checkoutStore.tempDataForResultPage.customer.address}</h4>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => this.handleConfirmModal(false)}>Close</Button>
              </Modal.Footer>
            </Modal>

          </>}
      </>
    )
  }
}

export default withStore(Checkout);