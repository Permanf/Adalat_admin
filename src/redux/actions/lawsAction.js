import {
    ADD_LAW,
    ADD_LAW_FILE_IMAGE,
    DELETE_LAW,
    DELETE_LAW_FILE,
    GET_FILES,
    GET_LAST_UPDATED,
    GET_LAW,
    GET_LAW_FILE,
    LOAD_LAWS,
    LOAD_LAW_CONFIRM_DEPARTMENTS,
    POST_LAW,
    POST_LAW_CATEGORY,
    PUT_LAW,
    PUT_LAW_CATEGORY,
    SAVE_LAST_UPDATED,
    SET_FILES,
    SET_LAST_UPDATED,
    SET_LAW,
    SET_LAWS,
    SET_LAW_CONFIRM_DEPARTMENTS,
    SET_LAW_FILE,
} from "../types/lawsTypes"

export const loadLaws = page => {
    return {
        type: LOAD_LAWS,
        payload: page
    }
}

export const loadLawConfirmDepartments = () => ({ type: LOAD_LAW_CONFIRM_DEPARTMENTS })

export const getFiles = lawfile_id => {
    return {
        type: GET_FILES,
        payload: lawfile_id
    }
}

export const setFiles = files => {
    return {
        type: SET_FILES,
        payload: files
    }
}

export const setLawConfirmDepartments = law_confirm_departments => {
    return {
        type: SET_LAW_CONFIRM_DEPARTMENTS,
        payload: law_confirm_departments
    }
}

export const postLawCategory = laws => {
    return {
        type: POST_LAW_CATEGORY,
        payload: laws
    }
}

export const putLawCategory = laws => {
    return {
        type: PUT_LAW_CATEGORY,
        payload: laws
    }
}

export const postLaw = law => {
    return {
        type: POST_LAW,
        payload: law
    }
}

export const putLaw = law => {
    return {
        type: PUT_LAW,
        payload: law
    }
}

export const addImageLaw = image => {
    return {
        type: ADD_LAW_FILE_IMAGE,
        payload: image
    }
}

export const setLaws = laws => {
    return {
        type: SET_LAWS,
        payload: laws
    }
}

export const addLaw = law => {
    return {
        type: ADD_LAW,
        payload: law
    }
}

export const getLaw = law_id => {
    return {
        type: GET_LAW,
        payload: law_id
    }
}

export const getLawFile = law_file_id => {
    return {
        type: GET_LAW_FILE,
        payload: law_file_id
    }
}


export const setLaw = law => {
    return {
        type: SET_LAW,
        payload: law
    }
}

export const setLawFile = law_file => {
    return {
        type: SET_LAW_FILE,
        payload: law_file
    }
}

export const deleteLaw = law_id => {
    return {
        type: DELETE_LAW,
        payload: law_id
    }
}

export const deleteLawFile = law_file_id => {
    return {
        type: DELETE_LAW_FILE,
        payload: law_file_id
    }
}

export const getLastUpdated = () => ({type: GET_LAST_UPDATED})

export const setLastUpdated = last_updated => {
    return {
        type: SET_LAST_UPDATED,
        payload: last_updated
    }
}

export const saveLastUpdated = last_updated => {
    return {
        type: SAVE_LAST_UPDATED,
        payload: last_updated
    }
}