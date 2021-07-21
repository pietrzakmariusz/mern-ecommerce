import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstans';

export const cartReducer = (state = { cartItems: [] }, action) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const currentItem = action.payload;

			// check if chosen item is already in cart
			const existItem = state.cartItems.find(
				item => item.id === currentItem.id
			);

			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map(item =>
						item.id === existItem.id ? currentItem : item
					),
				};
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, currentItem],
				};
			}
		case CART_REMOVE_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter(item => item.id !== action.payload),
			};
		default:
			return state;
	}
};
