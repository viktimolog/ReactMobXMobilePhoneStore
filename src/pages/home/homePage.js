import React, { useEffect } from 'react';
import withStore from '~/hocs/withStore.js';
import LoaderComponent from '~c/loaderComponent.js';
import ServerErrorComponent from '~c/serverErrorComponent.js';
import { Button, Card, CardColumns } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UrlBuild } from '~/routes';
const { Body, Title, Text, Footer } = Card;

const Home = ({store: {cartStore, homeStore}}) => {
  useEffect(() => homeStore.getProducts(), []);

  return(
    <>
      {[homeStore.getServerResponseStatus
        , cartStore.getServerResponseStatus].includes('pending')
        ? <LoaderComponent/>
        : homeStore.getServerResponseStatus === 'rejected'
          ? <ServerErrorComponent/>
          : <CardColumns>
            {homeStore.products.map(product =>
                <Card key={product.id} className="text-center">
                    <Body>
                        <Title>{product.title}</Title>
                        <Text>
                            Price: {product.price}
                        </Text>
                        <Button
                            variant={cartStore.isCartProduct(product.id) ? 'warning' : 'primary'}
                            onClick={() => {
                                cartStore.isCartProduct(product.id)
                                    ? cartStore.removeCartProduct(product.id)
                                    : cartStore.addCartProduct(product);
                            }}
                        >
                            {cartStore.isCartProduct(product.id) ? 'Delete from cart' : 'Add to cart'}
                        </Button>
                    </Body>
                    <Footer>
                        <Link to={UrlBuild('product', {id: product.id})}>
                            More info
                        </Link>
                    </Footer>
                </Card>
            )}
          </CardColumns>}
    </>
  )
};

export default withStore(Home);
