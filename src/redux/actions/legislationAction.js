import {
    GET_LEGISLATION,
    PUT_LEGISLATION,
    DELETE_LEGISLATION,
    SET_LEGISLATION,
    SET_LEGISLATIONS,
    GET_LEGISLATIONS,
    STORE_LEGISLATION,
    SET_PARENT_LEGISLATION,

} from "../types/legislationTypes"

export const getLegislations = () => {
    return {
        type: GET_LEGISLATIONS,
    }
}

export const setLegislations = legislations => {
    return {
        type: SET_LEGISLATIONS,
        payload:legislations
    }
}
export const setParentLegislation = parents => {
    return {
        type: SET_PARENT_LEGISLATION,
        payload:parents
    }
}
export const getLegislation = (le_id) => {
    return {
        type: GET_LEGISLATION,
        payload:le_id
    }
}
export const setLegislation = (legislation) => {
    return {
        type: SET_LEGISLATION,
        payload: legislation
    }
}

export const storeLegislation = legislation => {
    return {
        type: STORE_LEGISLATION,
        payload: legislation
    }
}

export const putLegislation = legislation => {
    return {
        type: PUT_LEGISLATION,
        payload: legislation
    }
}

export const deleteLegislation = le_id => {
    return {
        type: DELETE_LEGISLATION,
        payload: le_id
    }
}