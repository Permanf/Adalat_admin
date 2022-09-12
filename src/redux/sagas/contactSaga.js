// import i18n from 'i18next'
// import toast from 'react-hot-toast'
import { takeLatest, put, call } from 'redux-saga/effects'
import api from '../../services/api.service'

import {
    setContact,
    setContacts
} from '../actions/contactAction'

import {
    GET_CONTACT,
    GET_CONTACTS,
} from '../types/contactTypes'

// Workers

function* getContactsWorker(action)
{
    const result = yield call(api.get, `contact?page=${action.payload}`)

    yield put(setContacts(result.data))
}

function* getContactWorker(action)
{
    const result = yield call(api.get, `contact/${action.payload}`)

    yield put(setContact(result.data.data))
}

// Watchers

export function* getContactsWatcher()
{
    yield takeLatest(GET_CONTACTS, getContactsWorker)
}

export function* getContactWatcher()
{
    yield takeLatest(GET_CONTACT, getContactWorker)
}