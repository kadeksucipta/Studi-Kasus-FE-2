import * as Cart from "./Constans"

export const setCart = (value) => {
    return { //pilot
        type: Cart.cart,
        value
    }
}