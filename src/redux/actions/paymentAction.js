import {
    CHANGE_STATUS,
    GET_PAYMENT,
    GET_PAYMENTS,
    SET_PAYMENT,
    SET_PAYMENTS,
} from "../types/paymentTypes"


export const getPayments = page => {
    return {
        type: GET_PAYMENTS,
        payload: page
    }
}

export const getPayment = order_id => {
    return {
        type: GET_PAYMENT,
        payload: order_id
    }
}

export const setPayments = archives => {
    return {
        type: SET_PAYMENTS,
        payload: archives
    }
}

export const setPayment = order => {
    return {
        type: SET_PAYMENT,
        payload: order
    }
}

export const paymentChangeStatus = status => {
    return {
        type: CHANGE_STATUS,
        payload: status
    }
}