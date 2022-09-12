import {
    LOAD_SERVICE,
    SET_SERVICES,
    ADD_SERVICE,
    REMOVE_SERVICE,
    POST_SERVICE,
} from '../types/serviceTypes'


export const loadServices = () => ({type: LOAD_SERVICE})

export const setServices = (services) => {
    return {
        type: SET_SERVICES,
        payload: services
    }
}

export const addService = service => {
    return {
        type: ADD_SERVICE,
        payload: service
    }
}

export const postService = service => {
    return {
        type: POST_SERVICE,
        payload: service
    }
}

export const removeService = service_id => {
    return {
        type: REMOVE_SERVICE,
        payload: service_id
    }
}