import DataStore from '~/dataStore';

const placeOrder = () => DataStore.placeOrder().then(response => response);

export {placeOrder};