import {
    ADD_PASSWORD,
    GET_PASSWORDS,
    SET_PASSWORDS,
    POST_PASSWORD,
} from "../types/passwordTypes"


export const getPasswords = page => {
    return {
        type: GET_PASSWORDS,
        payload: page
    }
}

export const setPasswords = passwords => {
    return {
        type: SET_PASSWORDS,
        payload: passwords
    }
}

export const addPassword = password => {
    return {
        type: ADD_PASSWORD,
        payload: password
    }
}

export const postPassword = password => {
    return {
        type: POST_PASSWORD,
        payload: password
    }
}