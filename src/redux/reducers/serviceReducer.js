import {
    SET_SERVICES,
    ADD_SERVICE,
    REMOVE_SERVICE,
} from '../types/serviceTypes'


const initialState = {
    services: [],
    count: 0,
}

export const serviceReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case SET_SERVICES: {
            return {
                ...state,
                services: action.payload.services,
                count: action.payload.count
            }
        }

        case ADD_SERVICE: {
            return {
                ...state,
                services: [
                    ...state.services,
                    action.payload
                ]
            }
        }

        case REMOVE_SERVICE: {
            return {
                ...state,
                services: state.services.filter(service => service.id !== action.payload)
            }
        }

        default:
            return state
    }
}
