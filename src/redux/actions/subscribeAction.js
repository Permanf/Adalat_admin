import {
    GET_SUBSCRIBERS,
    SET_SUBSCRIBERS
} from "../types/subscribeTypes"


export const getSubscribers = page => {
    return {
        type: GET_SUBSCRIBERS,
        payload: page
    }
}

export const setSubscribers = subscribers => {
    return {
        type: SET_SUBSCRIBERS,
        payload: subscribers
    }
}