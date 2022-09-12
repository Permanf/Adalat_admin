import {
    LOAD_DEPARTMENTS,
    SET_DEPARTMENTS,
    ADD_DEPARTMENT,
    REMOVE_DEPARTMENT,
    POST_DEPARTMENT,
    GET_DEPARTMENT,
    UPDATE_DEPARTMENT,
    ADD_DEPARTMENT_IMAGE,
    CHANGE_DEPARTMENT_IMAGE,
} from '../types/departmentTypes'


export const loadDepartments = page => {
    return {
        type: LOAD_DEPARTMENTS,
        payload: page
    }
}

export const getDepartment = id => {
    return {
        type: GET_DEPARTMENT,
        payload: id
    }
}

export const setDepartments = (departments) => {
    return {
        type: SET_DEPARTMENTS,
        payload: departments
    }
}

export const postDepartment = department => {
    return {
        type: POST_DEPARTMENT,
        payload: department
    }
}

export const addDepartment = department => {
    return {
        type: ADD_DEPARTMENT,
        payload: department
    }
}

export const updateDepartment = department => {
    return {
        type: UPDATE_DEPARTMENT,
        payload: department
    }
}

export const removeDepartment = department_id => {
    return {
        type: REMOVE_DEPARTMENT,
        payload: department_id
    }
}

export const addDepartmentImage = payload => {
    return {
        type: ADD_DEPARTMENT_IMAGE,
        payload
    }
}

export const changeDepartmentImage = payload => {
    return {
        type: CHANGE_DEPARTMENT_IMAGE,
        payload
    }
}