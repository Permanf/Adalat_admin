import {
    ADD_QUESTION,
    SET_QUESTION,
    SET_QUESTIONS,
} from "../types/questionTypes"

const InitialState = {
    questions: [],
    question: [],
    total: 0,
    last_page: 0,
}

export const questionReducer = (state = InitialState, action) => {
    switch(action.type)
    {
        case SET_QUESTIONS: {
            return {
                ...state,
                questions: action.payload.data,
                total: action.payload.meta.total,
                last_page: action.payload.meta.last_page,
            }
        }

        case SET_QUESTION: {
            return {
                ...state,
                question: action.payload,
            }
        }

        default:
            return state
    }
}
