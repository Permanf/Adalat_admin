import toast from 'react-hot-toast'
import { takeLatest, put, call } from 'redux-saga/effects'
import api from '../../services/api.service'
import { setLoading, setRedirect } from '../reducers/mainReducer'
import i18n from 'i18next'

import {
   
    setReception, 
    setReceptions,

} from '../actions/receptionAction'

import {
    DELETE_RECEPTION,
    GET_RECEPTION,
    GET_RECEPTIONS,
    PUT_RECEPTION,
    STORE_RECEPTION,

} from '../types/receptionTypes'

// mine
function* getReceptionsWorker()
{
    try {
        const result = yield call(api.get, `front/index_receptions`)

        yield put(setReceptions(result.data.data))

    } catch (err) {
        yield put(setLoading(false))

        console.log(err)
    }
}

function* getReceptionWorker(action)
{
    try {
        const result = yield call(api.get, `receptions/${action.payload}`)

        yield put(setReception(result.data.data))

    } catch (err) {
        yield put(setLoading(false))

        console.log(err)
    }
}
function* storeReceptionWorker(action)
{
    yield call(api.post, `receptions`, action.payload)
    
    toast.success(i18n.t('success_added'), {
        duration: 2000,
    })
}

function* putReceptionWorker(action)
{
    try {
        const result = yield call(api.post, `receptions/${action.payload.id}`, action.payload)

        yield put(setLoading(false))
        yield put(setRedirect(false))

        toast.success(i18n.t('success_added'), {
            duration: 2000,
        })
        
    } catch (err) {
        yield put(setLoading(false))
        yield put(setRedirect(false))

        toast.error(i18n.t('error_not_saved'), {
            duration: 2000,
        })

        console.log(err)
    }
}
function* deleteReceptionWorker(action)
{
    try {
        yield call(api.delete, `receptions/${action.payload}`)
        

        toast.success(i18n.t('success_deleted'), {
            duration: 2000,
        })
        yield put(setLoading(false))
        yield put(setRedirect(false))
        
    } catch (err) {
        

        toast.error(i18n.t('error_not_deleted'), {
            duration: 2000,
        })
        yield put(setLoading(false))
        yield put(setRedirect(false))
        console.log(err)
    }
}

// mine
export function* getReceptionsWatcher()
{
    yield takeLatest(GET_RECEPTIONS, getReceptionsWorker)
}

export function* getReceptionWatcher()
{
    yield takeLatest(GET_RECEPTION, getReceptionWorker)
}
export function* putReceptionWatcher()
{
    yield takeLatest(PUT_RECEPTION, putReceptionWorker)
}
export function* deleteReceptionWatcher()
{
    yield takeLatest(DELETE_RECEPTION, deleteReceptionWorker)
}
export function* storeReceptionWatcher()
{
    yield takeLatest(STORE_RECEPTION, storeReceptionWorker)
}
