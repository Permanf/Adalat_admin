import {
    GET_QUESTION_ANSWERS,
    SET_QUESTION_ANSWERS,
    GET_QUESTION_ANSWER,
    SET_QUESTION_ANSWER,
    GET_QUESTION_CATEGORIES,
    SET_QUESTION_CATEGORIES,
    GET_QUESTION_CATEGORY,
    SET_QUESTION_CATEGORY,
    STORE_QUESTION_CATEGORY,
    GET_QUESTION_SUB_CATEGORIES,
    GET_CATEGORY_QUESTION_ANSWERS,
    SET_CATEGORY_QUESTION_ANSWERS,
    STORE_CATEGORY_QUESTION_ANSWERS,
    STORE_QUESTION_SUB_CATEGORY,
    UPDATE_QUESTION_CATEGORY,
    DELETE_QUESTION_CATEGORY,
    PUT_QUESTION_ANSWER,
    DELETE_QUESTION_ANSWER,
} from "../types/questionAnswerTypes"


export const getQuestionAnswers = () => {
    return {
        type: GET_QUESTION_ANSWERS,
    }
}

export const setQuestionAnswers = (questionAnswers) => {
    return {
        type: SET_QUESTION_ANSWERS,
        payload: questionAnswers
    }
}

export const getQuestionAnswer = (qa_id) => {
    return {
        type: GET_QUESTION_ANSWER,
        payload:qa_id
    }
}

export const setQuestionAnswer = (questionAnswer) => {
    return {
        type: SET_QUESTION_ANSWER,
        payload: questionAnswer
    }
}

///mine

export const putQuestionAnswer = question_answer => {
    return {
        type: PUT_QUESTION_ANSWER,
        payload: question_answer
    }
}

///mine


export const storeQuestionCategory = (category) => {
    return {
        type: STORE_QUESTION_CATEGORY,
        payload: category
    }
}

export const updateQuestionCategory = (category) => {
    return {
        type: UPDATE_QUESTION_CATEGORY,
        payload: category
    }
}

export const deleteQuestionCategory = (category_id) => {
    return {
        type: DELETE_QUESTION_CATEGORY,
        payload: category_id
    }
}

export const storeQuestionSubCategory = (category) => {
    return {
        type: STORE_QUESTION_SUB_CATEGORY,
        payload: category
    }
}

export const getQuestionCategories = () => {
    return {
        type: GET_QUESTION_CATEGORIES,
    }
}

export const getQuestionSubCategories = (category_id) => {
    return {
        type: GET_QUESTION_SUB_CATEGORIES,
        payload: category_id,
    }
}

export const setQuestionCategories = (categories) => {
    return {
        type: SET_QUESTION_CATEGORIES,
        payload: categories
    }
}

export const getQuestionCategory = () => {
    return {
        type: GET_QUESTION_CATEGORY,
    }
}

export const setQuestionCategory = (category) => {
    return {
        type: SET_QUESTION_CATEGORY,
        payload: category
    }
}

export const getCategoryQuestionAnswers = (category_id) => {
    return {
        type: GET_CATEGORY_QUESTION_ANSWERS,
        payload: category_id,
    }
}

export const setCategoryQuestionAnswers = (question_answers) => {
    return {
        type: SET_CATEGORY_QUESTION_ANSWERS,
        payload: question_answers,
    }
}

export const storeCategoryQuestionAnswers = (question_answer) => {
    return {
        type: STORE_CATEGORY_QUESTION_ANSWERS,
        payload: question_answer,
    }
}

export const deleteQuestionAnswer = qa_id => {
    return {
        type: DELETE_QUESTION_ANSWER,
        payload: qa_id
    }
}