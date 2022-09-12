import {
    GET_RECEPTION,
    PUT_RECEPTION,
    DELETE_RECEPTION,
    SET_RECEPTION,
    SET_RECEPTIONS,
    GET_RECEPTIONS,
    STORE_RECEPTION,

} from "../types/receptionTypes"

export const getReceptions = () => {
    return {
        type: GET_RECEPTIONS,
    }
}

export const setReceptions = receptions => {
    return {
        type: SET_RECEPTIONS,
        payload:receptions
    }
}

export const getReception = (le_id) => {
    return {
        type: GET_RECEPTION,
        payload:le_id
    }
}
export const setReception = (reception) => {
    return {
        type: SET_RECEPTION,
        payload: reception
    }
}

export const storeReception = reception => {
    return {
        type: STORE_RECEPTION,
        payload:reception
    }
}

export const putReception = reception => {
    return {
        type: PUT_RECEPTION,
        payload: reception
    }
}

///mine



export const deleteReception = le_id => {
    return {
        type: DELETE_RECEPTION,
        payload: le_id
    }
}