import {
    SET_ARCHIVES,
} from "../types/archiveTypes"


const initialState = {
    archives: [],
    total: 0,
    last_page: 0,
}

export const archiveReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case SET_ARCHIVES: {
            return {
                ...state,
                archives: action.payload.data,
                total: action.payload.meta.total,
                last_page: action.payload.meta.last_page,
            }
        }

        default:
            return state
    }
}
