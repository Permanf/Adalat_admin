import {
    LOAD_SITES,
    SET_SITES,
    ADD_SITE,
    POST_SITE,
    REMOVE_SITE,
    DELETE_CONFIRM,
    DELETE_SITE,
} from '../types/siteTypes'


export const loadSites = page => {
    return {
        type: LOAD_SITES,
        payload: page
    }
}

export const setSites = (sites) => {
    return {
        type: SET_SITES,
        payload: sites
    }
}

export const addSite = site => {
    return {
        type: ADD_SITE,
        payload: site
    }
}

export const postSite = site => {
    return {
        type: POST_SITE,
        payload: site
    }
}

export const removeSite = site_id => {
    return {
        type: REMOVE_SITE,
        payload: site_id
    }
}

export const deleteConfirm = confirm => {
    return {
        type: DELETE_CONFIRM,
        payload: confirm
    }
}

export const deleteSite = site_id => {
    return {
        type: DELETE_SITE,
        payload: site_id
    }
}
