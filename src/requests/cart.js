import DataStore from '~/dataStore';

const getCartProducts = () =>
  DataStore.getCartProducts().then(response => response);

const addCartProduct = cartProduct =>
  DataStore.addCartProduct(cartProduct).then(response => response);

const removeCartProduct = id =>
  DataStore.removeCartProduct(id).then(response => response);

const updateCartProduct = cartProduct =>
  DataStore.updateCartProduct(cartProduct).then(response => response);

const clearCart = () =>
  DataStore.clearCart().then(response => response);

export {getCartProducts, addCartProduct, removeCartProduct, updateCartProduct, clearCart};