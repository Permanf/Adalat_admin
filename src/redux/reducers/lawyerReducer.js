import {
    ADD_LAWYER,
    DELETE_LAWYER,
    SET_LAWYER,
    SET_LAWYERS,
    SET_LAWYER_COMMENTS,
} from '../types/lawyerTypes'


const initialState = {
    lawyers: [],
    lawyer: [],
    comments: [],
    total: 0,
    last_page: 0,
}

export const lawyerReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case SET_LAWYERS: {
            return {
                ...state,
                lawyers: action.payload.data,
                total: action.payload.meta.total,
                last_page: action.payload.meta.last_page,
            }
        }

        case ADD_LAWYER: {
            return {
                ...state,
                lawyers: [
                    ...state.lawyers,
                    action.payload
                ]
            }
        }

        case SET_LAWYER: {
            return {
                ...state,
                lawyer: action.payload
            }
        }

        case SET_LAWYER_COMMENTS: {
            return {
                ...state,
                comments: action.payload
            }
        }

        case DELETE_LAWYER: {
            return {
                ...state,
                lawyers: state.lawyers.filter(lawyer => lawyer.id !== action.payload),
                total: state.lawyers.length - 1
            }
        }

        default:
            return state
    }
}
