import i18n from 'i18next'
import toast from 'react-hot-toast'
import { takeLatest, put, call } from 'redux-saga/effects'
import api from '../../services/api.service'
import {
    setClients
} from '../actions/clientAction'

import {
    GET_CLIENTS, REMOVE_CLIENT
} from '../types/clientTypes'


function* getClientsWorker(action)
{
    const result = yield call(api.get, `client?page=${action.payload}`)

    yield put(setClients(result.data))
}

function* removeClientWorker(action)
{
    try {
        yield call(api.delete, `client/${action.payload}`)

        toast.success(i18n.t('success_deleted'), {duration: 2000})
    } catch (err) {
        toast.error(i18n.t('error_not_deleted'), {duration: 2000})
        console.log(err);
    }
}


export function* getClientsWatcher()
{
    yield takeLatest(GET_CLIENTS, getClientsWorker)
}

export function* removeClientWatcher()
{
    yield takeLatest(REMOVE_CLIENT, removeClientWorker)
}
