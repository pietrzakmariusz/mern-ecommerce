import { combineReducers } from 'redux';
import { productListReducer, productDetailsReducer } from './product.reducers';
import { cartReducer } from './cart.reducer';

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
});

export default reducer;
