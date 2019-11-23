import CartStore from '~s/cartStore.js';
import HomeStore from '~s/homeStore.js';
import CheckoutStore from '~s/checkoutStore.js';
import ProductStore from '~s/productStore.js';

import * as products from '~/requests/products.js';
import * as cart from '~/requests/cart.js';

class RootStore {
  constructor() {
    this.productsRequests = products;
    this.cartRequests = cart;

    this.cartStore = new CartStore(this);
    this.homeStore = new HomeStore(this);
    this.checkoutStore = new CheckoutStore(this);
    this.productStore = new ProductStore(this);
  };
}

export default new RootStore();