import {AUTH_LOGOUT, AUTH_SUCCESS} from "../action/actionTypes";

const initialState = {
    token: null,
    auth: false
}

export default function authReducer(state = initialState, action){
    switch (action.type) {
        case  AUTH_SUCCESS:
            return {...state, token: action.token, auth: action.expDate};
        case AUTH_LOGOUT:
            return {...state, token: null};
        default:
            return state

    }
}

