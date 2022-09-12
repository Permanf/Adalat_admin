import i18n from 'i18next'
import toast from 'react-hot-toast'
import { takeLatest, put, call } from 'redux-saga/effects'
import api from '../../services/api.service'

import {
    addLawyer,
    setLawyer,
    setLawyerComments,
    setLawyers
} from '../actions/lawyerAction'
import { setLoading, setRedirect } from '../reducers/mainReducer'

import {
    DELETE_LAWYER,
    GET_LAWYER,
    GET_LAWYER_COMMENTS,
    LOAD_LAWYERS,
    POST_LAWYER,
    PUT_LAWYER
} from '../types/lawyerTypes'


function* loadLawyerWorker(action)
{
    const result = yield call(api.get, `lawyer?page=${action.payload}`)

    yield put(setLawyers(result.data))
}

function* getLawyerWorker(action)
{
    try {
        const result = yield call(api.get, `lawyer/${action.payload}`)

        yield put(setLawyer(result.data.data))
    }
    catch (err) {
        console.log(err)
    }
}

function* getLawyerCommentsWorker(action)
{
    try {
        const result = yield call(api.get, `lawyer/${action.payload}/comments`)

        yield put(setLawyerComments(result.data.data))
    }
    catch (err) {
        console.log(err)
    }
}

function* postLawyerWorker(action)
{
    try {
        const result = yield call(api.post, 'lawyer', action.payload)

        yield put(addLawyer(result.data.lawyer))
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

function* putLawyerWorker(action)
{
    try {
        const result = yield call(api.put, `lawyer/${action.payload.id}`, action.payload.data)

        yield put(setLoading(false))
        yield put(setRedirect(false))

        toast.success(i18n.t('success_saved'), {
            duration: 2000,
        })
    }
    catch (err) {
        yield put(setLoading(false))
        yield put(setRedirect(false))
        
        toast.error(i18n.t('error_not_saved'), {
            duration: 2000,
        })
        
        console.log(err)
    }
}

function* deleteLawyerWorker(action)
{
    try {
        const result = yield call(api.delete, `lawyer/${action.payload}`)

        yield put(setLoading(false))

        toast.success(i18n.t('success_deleted'), {
            duration: 2000,
        })
    }
    catch (err) {
        yield put(setLoading(false))
        
        toast.error(i18n.t('error_not_deleted'), {
            duration: 2000,
        })
        
        console.log(err)
    }
}



export function* loadLawyerWatcher()
{
    yield takeLatest(LOAD_LAWYERS, loadLawyerWorker)
}

export function* getLawyerWatcher()
{
    yield takeLatest(GET_LAWYER, getLawyerWorker)
}

export function* getLawyerCommentsWatcher()
{
    yield takeLatest(GET_LAWYER_COMMENTS, getLawyerCommentsWorker)
}

export function* postLawyerWatcher()
{
    yield takeLatest(POST_LAWYER, postLawyerWorker)
}

export function* putLawyerWatcher()
{
    yield takeLatest(PUT_LAWYER, putLawyerWorker)
}

export function* deleteLawyerWatcher()
{
    yield takeLatest(DELETE_LAWYER, deleteLawyerWorker)
}