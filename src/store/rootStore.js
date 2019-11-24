import CartStore from '~s/cartStore.js';
import HomeStore from '~s/homeStore.js';
import ProductStore from '~s/productStore.js';
import CheckoutStore from '~s/checkoutStore.js';

import * as products from '~/requests/products.js';
import * as cart from '~/requests/cart.js';
import * as checkout from '~/requests/checkout.js';

class RootStore {
  constructor() {
    this.productsRequests = products;
    this.cartRequests = cart;
    this.checkoutRequests = checkout;

    this.cartStore = new CartStore(this);
    this.homeStore = new HomeStore(this);
    this.productStore = new ProductStore(this);
    this.checkoutStore = new CheckoutStore(this);
  };
}

export default new RootStore();