import {
    SET_YEARS,
} from '../types/yearTypes'


const initialState = {
    years: [],
}

export const yearReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case SET_YEARS: {
            return {
                ...state,
                years: action.payload,
            }
        }

        default:
            return state
    }
}
