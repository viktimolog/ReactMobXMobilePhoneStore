import DataStore from '~/dataStore';

const getProducts = () => DataStore.getProducts().then(response => response);

const getProductById = id => DataStore.getProductById(id).then(response => response);

export {getProducts, getProductById};