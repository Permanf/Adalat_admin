import {
    GET_ARCHIVES,
    SET_ARCHIVES,
} from "../types/archiveTypes"


export const getArchives = page => {
    return {
        type: GET_ARCHIVES,
        payload: page
    }
}

export const setArchives = archives => {
    return {
        type: SET_ARCHIVES,
        payload: archives
    }
}