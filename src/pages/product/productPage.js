import React, { useEffect } from 'react';
import { Button, Card, CardColumns } from 'react-bootstrap';
import LoaderComponent from '~c/loaderComponent.js';
import E404 from '~c/404.js';
import withStore from '~/hocs/withStore.js';
const { Body, Title, Text } = Card;

const Product = ({match, store: {cartStore, productStore}}) => {
  useEffect(() => productStore.getProductById(Number(match.params.id)), []);

  const { id , fullName, price, rest } = productStore.getProduct;

  return(
    <>
      {[productStore.getServerResponseStatus
        , cartStore.getServerResponseStatus].includes('pending')
        ? <LoaderComponent/>
        : productStore.serverResponseStatus === 'rejected'
          ? <E404/>
          : <CardColumns>
            <Card key={id} className="text-center">
              <Body>
              <Title>{fullName}</Title>
              <Text>
                Price: {price} <br/>
                Left in stock: {rest}
              </Text>
              <Button
                variant={cartStore.isCartProduct(id) ? 'warning' : 'primary'}
                onClick={() => {
                  cartStore.isCartProduct(id)
                    ? cartStore.removeCartProduct(id)
                    : cartStore.addCartProduct(productStore.getProduct);
                }}
              >
                {cartStore.isCartProduct(id) ? 'Delete from cart' : 'Add to cart'}
              </Button>
              </Body>
            </Card>
          </CardColumns>}
    </>
  )
};

export default withStore(Product);