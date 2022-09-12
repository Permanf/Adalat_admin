import toast from 'react-hot-toast'
import i18n from 'i18next'
import { takeLatest, put, call } from 'redux-saga/effects'
import api from '../../services/api.service'
import { setProvinces } from '../actions/provinceAction'
import { LOAD_PROVINCE, SAVE_PROVINCE } from '../types/provinceTypes'
import { setLoading } from '../reducers/mainReducer'


function* loadProvinceWorker()
{
    const result = yield call(api.get, 'province')

    yield put(setProvinces(result.data))
}

function* saveProvinceWorker(action)
{
    try {
        yield call(api.put, `province/${action.payload.id}`, {name: action.payload.name})

        toast.success(i18n.t('success_added'), {
            duration: 2000,
        })

        yield put(setLoading(false))
    } catch (err) {
        yield put(setLoading(false))

        toast.error(i18n.t('errot_not_added'), {
            duration: 2000,
        })

        console.log(err)
    }
}


export function* loadProvinceWatcher()
{
    yield takeLatest(LOAD_PROVINCE, loadProvinceWorker)
}

export function* saveProvinceWatcher()
{
    yield takeLatest(SAVE_PROVINCE, saveProvinceWorker)
}
