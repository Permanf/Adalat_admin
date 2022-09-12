import { takeLatest, put, call } from 'redux-saga/effects'
import api from '../../services/api.service'
import { setSubscribers } from '../actions/subscribeAction'

import {
    GET_SUBSCRIBERS
} from '../types/subscribeTypes'


function* getSubscribersWorker(action)
{
    const result = yield call(api.get, `subscribers?page=${action.payload}`)

    yield put(setSubscribers(result.data))
}


export function* getSubscribersWatcher()
{
    yield takeLatest(GET_SUBSCRIBERS, getSubscribersWorker)
}
