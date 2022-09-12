import {
    GET_LEGISLATION_FILE,
    PUT_LEGISLATION_FILE,
    DELETE_LEGISLATION_FILE,
    SET_LEGISLATION_FILE,
    SET_LEGISLATION_FILES,
    GET_LEGISLATION_FILES,
    STORE_LEGISLATION_FILE,
   

} from "../types/legislationFileTypes"

export const getLegislationFiles = () => {
    return {
        type: GET_LEGISLATION_FILES,
    }
}

export const setLegislationFiles = legislation_files => {
    return {
        type: SET_LEGISLATION_FILES,
        payload:legislation_files
    }
}

export const getLegislationFile = (le_id) => {
    return {
        type: GET_LEGISLATION_FILE,
        payload:le_id
    }
}
export const setLegislationFile = (legislation) => {
    return {
        type: SET_LEGISLATION_FILE,
        payload: legislation
    }
}

export const storeLegislationFile = legislation => {
    return {
        type: STORE_LEGISLATION_FILE,
        payload: legislation
    }
}

export const putLegislationFile = legislation => {
    return {
        type: PUT_LEGISLATION_FILE,
        payload: legislation
    }
}

export const deleteLegislationFile = le_id => {
    return {
        type: DELETE_LEGISLATION_FILE,
        payload: le_id
    }
}