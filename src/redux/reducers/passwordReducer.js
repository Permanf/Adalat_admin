import {
    ADD_PASSWORD,
    SET_PASSWORDS
} from "../types/passwordTypes"


const initialState = {
    passwords: [],
    total: 0,
    last_page: 0,
}

export const passwordReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case SET_PASSWORDS: {
            return {
                ...state,
                passwords: action.payload.data,
                total: action.payload.meta.total,
                last_page: action.payload.meta.last_page,
            }
        }

        case ADD_PASSWORD: {
            return {
                ...state,
                passwords: [
                    ...state.passwords,
                    action.payload
                ],
                total: state.total + 1
            }
        }

        default:
            return state
    }
}
