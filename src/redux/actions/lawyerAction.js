import {
    ADD_LAWYER,
    DELETE_LAWYER,
    GET_LAWYER,
    GET_LAWYER_COMMENTS,
    LOAD_LAWYERS, POST_LAWYER, PUT_LAWYER, SET_LAWYER, SET_LAWYERS, SET_LAWYER_COMMENTS
} from '../types/lawyerTypes'


export const loadLawyers = page => {
    return {
        type: LOAD_LAWYERS,
        payload: page
    }
}

export const setLawyers = lawyers => {
    return {
        type: SET_LAWYERS,
        payload: lawyers
    }
}

export const postLawyer = lawyer => {
    return {
        type: POST_LAWYER,
        payload: lawyer
    }
}

export const putLawyer = lawyer => {
    return {
        type: PUT_LAWYER,
        payload: lawyer
    }
}

export const addLawyer = lawyer => {
    return {
        type: ADD_LAWYER,
        payload: lawyer
    }
}

export const getLawyer = lawyer_id => {
    return {
        type: GET_LAWYER,
        payload: lawyer_id
    }
}

export const setLawyer = lawyer => {
    return {
        type: SET_LAWYER,
        payload: lawyer
    }
}

export const deleteLawyer = lawyer_id => {
    return {
        type: DELETE_LAWYER,
        payload: lawyer_id
    }
}

export const getLawyerComments = lawyer_id => {
    return {
        type: GET_LAWYER_COMMENTS,
        payload: lawyer_id
    }
}

export const setLawyerComments = comment => {
    return {
        type: SET_LAWYER_COMMENTS,
        payload: comment
    }
}
