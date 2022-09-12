import {
    SET_SUBSCRIBERS
} from '../types/subscribeTypes'

const initialState = {
    subscribers: [],
    total: 0,
    last_page: 0,
}

export const subscribeReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case SET_SUBSCRIBERS: {
            return {
                ...state,
                subscribers: action.payload.data,
                total: action.payload.meta.total,
                last_page: action.payload.meta.last_page,
            }
        }

        default:
            return state
    }
}
