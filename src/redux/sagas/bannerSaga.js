import i18n from 'i18next'
import toast from 'react-hot-toast'
import { takeLatest, put, call } from 'redux-saga/effects'
import api from '../../services/api.service'
import { addBanner, setBanners } from '../actions/bannerAction'
import { setLoading, setRedirect } from '../reducers/mainReducer'

import {
    DELETE_BANNER,
    POST_BANNER,
    LOAD_BANNERS
} from '../types/bannerTypes'


// Workers

function* loadBannersWorker(action)
{
    const result = yield call(api.get, `banners?page=${action.payload}`)

    yield put(setBanners(result.data))
}

function* postBannerWorker(action)
{
    const formData = new FormData()
    formData.append('image', action.payload.image)
    formData.append('type', action.payload.type)
    formData.append('locale', action.payload.locale)

    try {
        const result = yield call(api.post, 'banner/save', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        toast.success(i18n.t('success_added'), {
            duration: 2000,
        })

        yield put(setLoading(false))
        yield put(setRedirect(true))
        yield put(addBanner(result.data.banner))
        yield put(setRedirect(false))
    }
    catch {
        yield put(setLoading(false))

        toast.error(i18n.t('error_not_added'), {
            duration: 2000,
        })

        console.log('Failed to send banner')
    }
}

function* deleteBannerWorker(action)
{
    try {
        
        yield call(api.delete, `banner/${action.payload}/delete`,)

        toast.success('Banner üstünlikli pozuldy', {
            duration: 2000,
        })

        yield put(setLoading(false))
    }
    catch {
        yield put(setLoading(false))

        toast.error(i18n.t('error_not_deleted'), {
            duration: 2000,
        })

        console.log('Failed to delete banner')
    }
}


// Watchers

export function* deleteBannerWatcher()
{
    yield takeLatest(DELETE_BANNER, deleteBannerWorker)
}

export function* postBannerWatcher()
{
    yield takeLatest(POST_BANNER, postBannerWorker)
}

export function* loadBannersWatcher()
{
    yield takeLatest(LOAD_BANNERS, loadBannersWorker)
}