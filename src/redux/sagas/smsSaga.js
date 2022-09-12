import { takeLatest, put, call } from 'redux-saga/effects'
import api from '../../services/api.service'
import {
    setSmsCounts,
    setSmsList,
    setSmsTemplates
} from '../actions/smsAction'

import {
    GET_SMS_COUNTS,
    GET_SMS_LIST,
    GET_SMS_TEMPLATES
} from '../types/smsTypes'


function* getSmsListWorker(action)
{
    const result = yield call(api.post, `sms_list?page=${action.payload.page}`, {dates: action.payload.dates})

    yield put(setSmsList(result.data))
}

function* getSmsCountsWorker()
{
    const result = yield call(api.get, 'sms_counts')

    yield put(setSmsCounts(result.data))
}

function* getSmsTemplatesWorker()
{
    const result = yield call(api.get, `sms_templates`)

    yield put(setSmsTemplates(result.data))
}


export function* getSmsListWatcher()
{
    yield takeLatest(GET_SMS_LIST, getSmsListWorker)
}

export function* getSmsCountsWatcher()
{
    yield takeLatest(GET_SMS_COUNTS, getSmsCountsWorker)
}

export function* getSmsTemplatesWatcher()
{
    yield takeLatest(GET_SMS_TEMPLATES, getSmsTemplatesWorker)
}
