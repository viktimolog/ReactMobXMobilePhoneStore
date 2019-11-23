import DataStore from '~/dataStore';

const getProducts = () => DataStore.getProducts().then(response => response);

export {getProducts};