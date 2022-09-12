import i18n from 'i18next'
import toast from 'react-hot-toast'
import { takeLatest, put, call } from 'redux-saga/effects'
import api from '../../services/api.service'
import { addService, setServices } from '../actions/serviceAction'
import { setLoading, setRedirect } from '../reducers/mainReducer'
import {
    LOAD_SERVICE,
    POST_SERVICE,
    REMOVE_SERVICE
} from '../types/serviceTypes'


function* loadServiceWorker()
{
    const result = yield call(api.get, 'service')

    yield put(setServices(result.data))
}

function* postServiceWorker(action)
{
    try {
        const formData = new FormData()

        formData.append('title', JSON.stringify(action.payload.title))
        formData.append('text', JSON.stringify(action.payload.text))
        formData.append('type', action.payload.type)
        formData.append('image', action.payload.image)

        const result = yield call(api.post, 'service', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        yield put(addService(result.data.service))
        yield put(setLoading(false))
        yield put(setRedirect(true))
        yield put(setRedirect(false))

        toast.success(i18n.t('success_added'), {
            duration: 2000,
        })
    }
    catch (err) {
        yield put(setLoading(false))
        yield put(setRedirect(false))

        toast.error(i18n.t('error_not_added'), {
            duration: 2000,
        })
    }
}


function* removeServiceWorker(action)
{
    try {
        yield call(api.delete, `service/${action.payload}`)
    }
    catch (err) {
        console.log(err)
    }
}

export function* loadServiceWatcher()
{
    yield takeLatest(LOAD_SERVICE, loadServiceWorker)
}

export function* postServiceWatcher()
{
    yield takeLatest(POST_SERVICE, postServiceWorker)
}

export function* removeServiceWatcher()
{
    yield takeLatest(REMOVE_SERVICE, removeServiceWorker)
}