import {
    GET_CLIENTS,
    REMOVE_CLIENT,
    SET_CLIENTS
} from '../types/clientTypes'


export const getClients = page => {
    return {
        type: GET_CLIENTS,
        payload: page
    }
}

export const setClients = clients => {
    return {
        type: SET_CLIENTS,
        payload: clients
    }
}

export const removeClient = client_id => {
    return {
        type: REMOVE_CLIENT,
        payload: client_id
    }
}