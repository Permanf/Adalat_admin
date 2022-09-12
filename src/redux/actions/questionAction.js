import {
    GET_QUESTION,
    GET_QUESTIONS,
    SET_QUESTION,
    SET_QUESTIONS
} from '../types/questionTypes'

export const getQuestions = page => {
    return {
        type: GET_QUESTIONS,
        payload: page
    }
}

export const setQuestions = questions => {
    return {
        type: SET_QUESTIONS,
        payload: questions
    }
}

export const getQuestion = question_id => {
    return {
        type: GET_QUESTION,
        payload: question_id
    }
}

export const setQuestion = question => {
    return {
        type: SET_QUESTION,
        payload: question
    }
}
