import { combineReducers } from 'redux';
import { productListReducer, productDetailsReducer } from './product.reducers';

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
});

export default reducer;
