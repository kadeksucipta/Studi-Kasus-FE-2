import * as Login from "./Constant"

export const setUserData = (value) => {
    return { //pilot
        type: Login.userData,
        value
    }
}

// export const decrementWitchCheckingAction = (value) => {
//     return (dispatch, getState) => {
//         if(getState().counter.count > 0) {
//             dispatch(decrement(value))
//         }
//     }
// }