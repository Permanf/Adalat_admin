import { takeLatest, put, call } from 'redux-saga/effects'
import api from '../../services/api.service'
import { setArchives } from '../actions/archiveAction'
import {
    GET_ARCHIVES,
} from '../types/archiveTypes'


function* getArchivesWorker(action)
{
    const result = yield call(api.get, `setting/archives?page=${action.payload}`)

    yield put(setArchives(result.data))
}

export function* getArchivesWatcher()
{
    yield takeLatest(GET_ARCHIVES, getArchivesWorker)
}
