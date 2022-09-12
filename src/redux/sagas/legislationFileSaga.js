import toast from 'react-hot-toast'
import { takeLatest, put, call } from 'redux-saga/effects'
import api from '../../services/api.service'
import { setLoading, setRedirect } from '../reducers/mainReducer'
import i18n from 'i18next'

import {
   
    setLegislationFiles,
    setLegislationFile,

} from '../actions/legislationFileAction'

import {
    DELETE_LEGISLATION_FILE,
    GET_LEGISLATION_FILE,
    GET_LEGISLATION_FILES,
    PUT_LEGISLATION_FILE,
    STORE_LEGISLATION_FILE,

} from '../types/legislationFileTypes'

// mine
function* getLegislationFilesWorker()
{
    try {
        const result = yield call(api.get, `legislation_files`)

        yield put(setLegislationFiles(result.data.data))

    } catch (err) {
        yield put(setLoading(false))
        console.log(err)
    }
}

function* getLegislationFileWorker(action)
{
    try {
        const result = yield call(api.get, `legislation_files/${action.payload}`)

        yield put(setLegislationFile(result.data.data))

    } catch (err) {
        yield put(setLoading(false))
        console.log(err)
    }
}
function* storeLegislationFileWorker(action)
{
    try {
        const result = yield call(api.post, `legislation_files`, action.payload)

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

function* putLegislationFileWorker(action)
{

    try {
        const result = yield call(api.post, `legislation_files/${action.payload.get("id")}`, action.payload)

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
function* deleteLegislationFileWorker(action)
{
    try {
        yield call(api.delete, `legislation_files/${action.payload}`)
        

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
export function* getLegislationFilesWatcher()
{
    yield takeLatest(GET_LEGISLATION_FILES, getLegislationFilesWorker)
}

export function* getLegislationFileWatcher()
{
    yield takeLatest(GET_LEGISLATION_FILE, getLegislationFileWorker)
}
export function* putLegislationFileWatcher()
{
    yield takeLatest(PUT_LEGISLATION_FILE, putLegislationFileWorker)
}
export function* deleteLegislationFileWatcher()
{
    yield takeLatest(DELETE_LEGISLATION_FILE, deleteLegislationFileWorker)
}
export function* storeLegislationFileWatcher()
{
    yield takeLatest(STORE_LEGISLATION_FILE, storeLegislationFileWorker)
}
