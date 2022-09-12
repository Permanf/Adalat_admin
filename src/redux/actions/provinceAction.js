import {
    LOAD_PROVINCE,
    SAVE_PROVINCE,
    SET_PROVINCE,
} from '../types/provinceTypes'


export const loadProvinces = () => ({type: LOAD_PROVINCE})

export const setProvinces = provinces => {
    return {
        type: SET_PROVINCE,
        payload: provinces
    }
}

export const saveProvince = province => {
    return {
        type: SAVE_PROVINCE,
        payload: province
    }
}