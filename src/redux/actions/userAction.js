import { SET_AUTH, SET_USER } from '../types/userTypes'


export const setUser = user => {
    return {
        type: SET_USER,
        payload: user
    }
}

export const setAuth = auth => {
    return {
        type: SET_AUTH,
        payload: auth
    }
}