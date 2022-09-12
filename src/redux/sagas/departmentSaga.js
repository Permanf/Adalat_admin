import i18n from 'i18next'
import toast from 'react-hot-toast'
import { takeLatest, put, call } from 'redux-saga/effects'
import api from '../../services/api.service'

import {
    addDepartment,
    changeDepartmentImage,
    setDepartments
} from '../actions/departmentAction'

import {
    setLoading,
    setRedirect
} from '../reducers/mainReducer'

import {
    ADD_DEPARTMENT_IMAGE,
    GET_DEPARTMENT,
    LOAD_DEPARTMENTS,
    POST_DEPARTMENT,
    REMOVE_DEPARTMENT,
    UPDATE_DEPARTMENT
} from '../types/departmentTypes'


function* loadDepartmentsWorker(action)
{
    try {
        const result = yield call(api.get, `department?page=${action.payload}`)

        yield put(setDepartments(result.data))
        yield put(setLoading(false))
    }
    catch (err) {
        yield put(setLoading(false))
   
        console.log(err)
    }
}


function* getDepartmentWorker(action)
{
    try {
        const result = yield call(api.get, `department/${action.payload}`)

        yield put(addDepartment(result.data.data))
        yield put(setLoading(false))
    }
    catch (err) {
        yield put(setLoading(false))
   
        console.log(err)
    }
}

function* postDepartmentWorker(action)
{
    const formData = new FormData()

    formData.append('title', JSON.stringify(action.payload.title))
    formData.append('image', action.payload.image)
    formData.append('address', action.payload.address)
    formData.append('boss', action.payload.boss)
    formData.append('deputy_head', action.payload.deputy_head)
    formData.append('email', action.payload.email)
    formData.append('phone', action.payload.phone)
    formData.append('latitude', action.payload.latitude)
    formData.append('longitude', action.payload.longitude)
    formData.append('province_id', action.payload.province_id)

    try {
        const result = yield call(api.post, 'department', formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        })

        yield put(addDepartment(result.data.department))
        yield put(setLoading(false))
        yield put(setRedirect(false))

        toast.success(i18n.t('success_added'), {
            duration: 2000,
        })
    }
    catch (err) {
        yield put(setLoading(false))
        yield put(setRedirect(false))

        toast.error(i18n.t('error_not_added'), {
            duration: 2000,
        })

        console.log(err)    
    }
}


function* addDepartmentImageWorker(action)
{
    const formData = new FormData()

    formData.append('image', action.payload.image)

    try {
        const result = yield call(api.post, `department/${action.payload.id}/image`, formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        })

        yield put(changeDepartmentImage(result.data))
        yield put(setLoading(false))
        yield put(setRedirect(false))

        toast.success(i18n.t('success_added'), {
            duration: 2000,
        })
    }
    catch (err) {
        yield put(setLoading(false))
        yield put(setRedirect(false))

        toast.error(i18n.t('error_not_added'), {
            duration: 2000,
        })

        console.log(err)
    }
}


function* updateDepartmentWorker(action)
{
    try {
        yield call(api.put, `department/${action.payload.id}`, action.payload)

        yield put(setRedirect(true))
        yield put(setLoading(false))
        yield put(setRedirect(false))

        toast.success(i18n.t('success_saved'), {
            duration: 2000,
        })
    }
    catch (err) {
        yield put(setLoading(false))

        toast.error(i18n.t('error_not_saved'), {
            duration: 2000,
        })

        console.log(err)    
    }
}


function* removeDepartmentWorker(action)
{
    try {
        yield call(api.delete, `department/${action.payload}`)

        yield put(setLoading(false))

        toast.success(i18n.t('success_deleted'), {
            duration: 2000,
        })
    }
    catch (err) {
        yield put(setLoading(false))

        toast.error(i18n.t('error'), {
            duration: 2000,
        })

        console.log(err)    
    }
}


export function* loadDepartmentsWatcher()
{
    yield takeLatest(LOAD_DEPARTMENTS, loadDepartmentsWorker)
}

export function* getDepartmentWatcher()
{
    yield takeLatest(GET_DEPARTMENT, getDepartmentWorker)
}

export function* postDepartmentWatcher()
{
    yield takeLatest(POST_DEPARTMENT, postDepartmentWorker)
}

export function* addDepartmentImageWatcher()
{
    yield takeLatest(ADD_DEPARTMENT_IMAGE, addDepartmentImageWorker)
}

export function* updateDepartmentWatcher()
{
    yield takeLatest(UPDATE_DEPARTMENT, updateDepartmentWorker)
}

export function* removeDepartmentWatcher()
{
    yield takeLatest(REMOVE_DEPARTMENT, removeDepartmentWorker)
}
