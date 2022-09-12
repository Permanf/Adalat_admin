import {
    REMOVE_CLIENT,
    SET_CLIENTS
} from "../types/clientTypes"

const InitialState = {
    clients: [],
    total: 0,
    last_page: 0,
}

export const clientReducer = (state = InitialState, action) => {
    switch(action.type)
    {
        case SET_CLIENTS: {
            return {
                ...state,
                clients: action.payload.data,
                total: action.payload.meta.total,
                last_page: action.payload.meta.last_page,
            }
        }

        case REMOVE_CLIENT: {
            return {
                ...state,
                clients: state.clients.filter(client => client.id !== action.payload)
            }
        }

        default:
            return state
    }
}
