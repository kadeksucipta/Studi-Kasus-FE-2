import * as Login from "./Constant"

const initialState = {
    user: null
}

const LoginReducer = (state = initialState, action) => {
    switch(action.type) {
        case Login.userData:
            return {
            ...state,
            user: action.value
          }
        // case counter.DEC:
        //     return {
        //     password: state.password
        //     }
        default:
            return state
    }
}
export default LoginReducer