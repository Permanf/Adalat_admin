import {
    SET_AUTH,
    SET_USER
} from "../types/userTypes"

const InitialState = {
    user: [],
    isAuth: false,
}

export const userReducer = (state = InitialState, action) => {
    switch(action.type)
    {
        case SET_USER: {
            return {
                ...state,
                user: action.payload,
            }
        }

        case SET_AUTH: {
            return {
                ...state,
                isAuth: action.payload,
            }
        }

        default:
            return state
    }
}
