import {
    SET_LEGISLATION,
    SET_LEGISLATIONS,
    SET_PARENT_LEGISLATION,

} from "../types/legislationTypes"


const initialState = {
    legislations: [],
    legislation: [],
    total: 0,
    last_page: 0,
    parents:[]
}

export const legislationReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case SET_LEGISLATION: {
            return {
                ...state,
                legislation: action.payload,
            }
        }
        case SET_PARENT_LEGISLATION: {
            return {
                ...state,
                parents: action.payload,
            }
        }
        case SET_LEGISLATIONS: {
            return {
                ...state,
                legislations: action.payload,
            }
        }

       
        default:
            return state
    }
}
