import * as Cart from "./Constans"

const initialState = {
    cart: [
        {
			_id: "63778776f2606c5b5a978802",
			name: "Milk Boba",
			description: "Fresh Milk Boba",
			price: 10000,
			image_url: "6a1287eb7a87ed9ef47db3a26a01b937.jpg",
			
		}
    ]
}

const CartReducer = (state = initialState, action) => {
    switch(action.types) {
        case Cart.cart:
            return {
            ...state,
            cart: action.value
          }
        default:
            return state
    }
}
export default CartReducer