import {
    LOAD_YEARS,
    SET_YEARS,
} from '../types/yearTypes'


export const loadYears = () => ({type: LOAD_YEARS})

export const setYears = (years) => {
    return {
        type: SET_YEARS,
        payload: years
    }
}
