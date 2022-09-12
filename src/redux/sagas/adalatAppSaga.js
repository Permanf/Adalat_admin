import { takeLatest, put, call } from 'redux-saga/effects'
import api from '../../services/api.service'

import {
    setAppList,
    setAppOrder,
    setAppOrders
} from '../actions/appAction'

import {
    CHANGE_STATUS,
    GET_APP_LIST,
    GET_APP_ORDER,
    GET_APP_ORDERS,
} from '../types/adalatAppTypes'


function* getAppOrdersWorker(action)
{
    const result = yield call(api.get, `adalat_emtp?page=${action.payload}`)

    yield put(setAppOrders(result.data))
}

function* getAppListWorker()
{
    const result = yield call(api.get, "apps")

    yield put(setAppList(result.data.data))
}

function* getAppOrderWorker(action)
{
    const result = yield call(api.get, `adalat_emtp/${action.payload}`)

    yield put(setAppOrder(result.data.data))
}

function* getChangeStatusAppOrderWorker(action)
{
    try {
        yield call(api.post, `adalat_emtp/${action.payload.id}/status`, {status: action.payload.type})
    } catch (err) {
        console.log(err);
    }
}



export function* getAppOrdersWatcher()
{
    yield takeLatest(GET_APP_ORDERS, getAppOrdersWorker)
}

export function* getAppListWatcher()
{
    yield takeLatest(GET_APP_LIST, getAppListWorker)
}

export function* getAppOrderWatcher()
{
    yield takeLatest(GET_APP_ORDER, getAppOrderWorker)
}

export function* getChangeStatusAppOrderWatcher()
{
    yield takeLatest(CHANGE_STATUS, getChangeStatusAppOrderWorker)
}
