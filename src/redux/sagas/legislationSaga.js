import toast from 'react-hot-toast'
import { takeLatest, put, call } from 'redux-saga/effects'
import api from '../../services/api.service'
import { setLoading, setRedirect } from '../reducers/mainReducer'
import i18n from 'i18next'

import {
   
    setLegislations,
    setLegislation,

} from '../actions/legislationAction'

import {
    DELETE_LEGISLATION,
    GET_LEGISLATION,
    GET_LEGISLATIONS,
    PUT_LEGISLATION,
    STORE_LEGISLATION,

} from '../types/legislationTypes'

// mine
function* getLegislationsWorker()
{
    try {
        const result = yield call(api.get, `legislations`)

        yield put(setLegislations(result.data.data))

    } catch (err) {
        yield put(setLoading(false))
        console.log(err)
    }
}

function* getLegislationWorker(action)
{
    try {
        const result = yield call(api.get, `legislations/${action.payload}`)

        yield put(setLegislation(result.data.data))

    } catch (err) {
        yield put(setLoading(false))
        console.log(err)
    }
}
function* storeLegislationWorker(action)
{
    yield call(api.post, `legislations`, action.payload)

    toast.success(i18n.t('success_added'), {
        duration: 2000,
    })
}

function* putLegislationWorker(action)
{
    try {
        const result = yield call(api.post, `legislations/${action.payload.id}`, action.payload)

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
function* deleteLegislationWorker(action)
{
    try {
        yield call(api.delete, `legislations/${action.payload}`)
        

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
export function* getLegislationsWatcher()
{
    yield takeLatest(GET_LEGISLATIONS, getLegislationsWorker)
}

export function* getLegislationWatcher()
{
    yield takeLatest(GET_LEGISLATION, getLegislationWorker)
}
export function* putLegislationWatcher()
{
    yield takeLatest(PUT_LEGISLATION, putLegislationWorker)
}
export function* deleteLegislationWatcher()
{
    yield takeLatest(DELETE_LEGISLATION, deleteLegislationWorker)
}
export function* storeLegislationWatcher()
{
    yield takeLatest(STORE_LEGISLATION, storeLegislationWorker)
}
