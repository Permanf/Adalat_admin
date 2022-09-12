import {
    CHANGE_STATUS,
    GET_APP_LIST,
    GET_APP_ORDER,
    GET_APP_ORDERS,
    SET_APP_LIST,
    SET_APP_ORDER,
    SET_APP_ORDERS,
} from "../types/adalatAppTypes"


export const getAppOrders = page => {
    return {
        type: GET_APP_ORDERS,
        payload: page
    }
}

export const getAppOrder = order_id => {
    return {
        type: GET_APP_ORDER,
        payload: order_id
    }
}

export const getAppList = () => ({type: GET_APP_LIST})

export const setAppOrders = archives => {
    return {
        type: SET_APP_ORDERS,
        payload: archives
    }
}

export const setAppOrder = order => {
    return {
        type: SET_APP_ORDER,
        payload: order
    }
}

export const setAppList = apps => {
    return {
        type: SET_APP_LIST,
        payload: apps
    }
}

export const appOrderChangeStatus = status => {
    return {
        type: CHANGE_STATUS,
        payload: status
    }
}