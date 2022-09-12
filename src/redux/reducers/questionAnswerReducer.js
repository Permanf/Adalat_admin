import {
    SET_QUESTION_ANSWERS,
    SET_QUESTION_ANSWER,
    SET_QUESTION_CATEGORIES,
    SET_QUESTION_CATEGORY,
    SET_CATEGORY_QUESTION_ANSWERS,
} from "../types/questionAnswerTypes"


const initialState = {
    question_answers: [],
    question_answer: [],
    category_question_answers: [],
    category_question_answer: [],
    categories: [],
    category: [],
    total: 0,
    last_page: 0,
}

export const questionAnswerReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case SET_QUESTION_CATEGORIES: {
            return {
                ...state,
                categories: action.payload,
            }
        }

        case SET_QUESTION_CATEGORY: {
            return {
                ...state,
                category: action.payload,
            }
        }
        case SET_QUESTION_ANSWERS: {
            return {
                ...state,
                question_answers: action.payload,
            }
        }

        case SET_QUESTION_ANSWER: {
            return {
                ...state,
                question_answer: action.payload,
            }
        }

        case SET_CATEGORY_QUESTION_ANSWERS: {
            return {
                ...state,
                category_question_answers: action.payload
            }
        }

        default:
            return state
    }
}
