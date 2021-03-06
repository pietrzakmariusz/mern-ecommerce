import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducers/reducer';

const cartItemsFromStorage =
	JSON.parse(localStorage.getItem('cartItems')) || [];

const initialState = {
	cart: {
		cartItems: cartItemsFromStorage,
	},
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
