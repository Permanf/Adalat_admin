import {
    ADD_BANNER,
    DELETE_BANNER,
    LOAD_BANNERS,
    POST_BANNER,
    SET_BANNERS
} from '../types/bannerTypes'

export const loadBanners = page => {
    return {
        type: LOAD_BANNERS,
        payload: page
    }
}

export const setBanners = banners => {
    return {
        type: SET_BANNERS,
        payload: banners
    }
}

export const postBanner = payload => {
    return {
        type: POST_BANNER,
        payload
    }
}

export const addBanner = banner => {
    return {
        type: ADD_BANNER,
        payload: banner
    }
}

export const deleteBanner = banner_id => {
    return {
        type: DELETE_BANNER,
        payload: banner_id
    }
}