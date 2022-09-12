import toast from 'react-hot-toast'
import i18n from 'i18next'
import { takeLatest, put, call } from 'redux-saga/effects'
import api from '../../services/api.service'
import { addPassword, setPasswords } from '../actions/passwordAction'
import { setLoading } from '../reducers/mainReducer'
import {
    POST_PASSWORD,
    GET_PASSWORDS
} from '../types/passwordTypes'


function* getPasswordsWorker(action)
{
    const result = yield call(api.get, `setting/archive/passwords?page=${action.payload}`)

    yield put(setPasswords(result.data))
}

function* postPasswordWorker(action)
{
    try {
        const result = yield call(api.post, 'setting/archive/passwords', { password: action.payload })

        yield put(setLoading(false))

        yield put(addPassword(result.data.data))

        toast.success(i18n.t('success_added'), {
            duration: 2000,
        })
    } catch (err) {
        yield put(setLoading(false))

        toast.success(i18n.t('error_not_added'), {
            duration: 2000,
        })

        console.log(err)
    }
}


export function* getPasswordsWatcher()
{
    yield takeLatest(GET_PASSWORDS, getPasswordsWorker)
}

export function* postPasswordWatcher()
{
    yield takeLatest(POST_PASSWORD, postPasswordWorker)
}
