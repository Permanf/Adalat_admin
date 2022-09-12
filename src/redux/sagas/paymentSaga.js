import { takeLatest, put, call } from 'redux-saga/effects'
import api from '../../services/api.service'

import {
    setPayment,
    setPayments
} from '../actions/paymentAction'

import {
    CHANGE_STATUS,
    GET_PAYMENT,
    GET_PAYMENTS,
} from '../types/paymentTypes'


function* getPaymentsWorker(action)
{
    const result = yield call(api.get, `payment?page=${action.payload}`)

    yield put(setPayments(result.data))
}

function* getPaymentWorker(action)
{
    const result = yield call(api.get, `payment/${action.payload}`)

    yield put(setPayment(result.data.data))
}

function* getChangeStatusPaymentWorker(action)
{
    try {
        yield call(api.post, `payment/${action.payload.id}/status`, {status: action.payload.type})
    } catch (err) {
        console.log(err);
    }
}



export function* getPaymentsWatcher()
{
    yield takeLatest(GET_PAYMENTS, getPaymentsWorker)
}

export function* getPaymentWatcher()
{
    yield takeLatest(GET_PAYMENT, getPaymentWorker)
}

export function* getChangeStatusPaymentWatcher()
{
    yield takeLatest(CHANGE_STATUS, getChangeStatusPaymentWorker)
}
