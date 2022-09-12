import i18n from 'i18next'
import toast from 'react-hot-toast'
import { takeLatest, put, call } from 'redux-saga/effects'
import api from '../../services/api.service'
import { addSite, removeSite, setSites } from '../actions/siteAction'
import { setLoading, setRedirect } from '../reducers/mainReducer'
import { DELETE_SITE, LOAD_SITES, POST_SITE } from '../types/siteTypes'


// Workers

function* loadSitesWorker(action)
{
    const result = yield call(api.get, `site?page=${action.payload}`)

    yield put(setSites(result.data))
}

function* postSiteWorker(action)
{
    const formData = new FormData()

    formData.append('logo', action.payload.logo)
    formData.append('name', JSON.stringify(action.payload.name))
    formData.append('link', action.payload.link)

    try {
        const result = yield call(api.post, 'site', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        toast.success(i18n.t('success_added'), {
            duration: 2000,
        })

        yield put(setLoading(false))
        yield put(setRedirect(true))
        yield put(addSite(result.data.site))
        yield put(setRedirect(false))
    }
    catch {
        yield put(setLoading(false))

        toast.error(i18n.t('error_not_added'), {
            duration: 2000,
        })

        console.log('Failed to send site')
    }
}

function* deleteSiteWorker(action)
{
    try {
        
        yield call(api.delete, `site/${action.payload}`,)

        toast.success('Saýt üstünlikli pozuldy', {
            duration: 5000,
        })

        yield put(setLoading(false))
        yield put(removeSite(action.payload))
    }
    catch {
        yield put(setLoading(false))

        toast.error(i18n.t('error_not_deleted'), {
            duration: 2000,
        })

        console.log('Failed to delete site')
    }
}


// Watchers

export function* deleteSiteWatcher()
{
    yield takeLatest(DELETE_SITE, deleteSiteWorker)
}

export function* postSiteWatcher()
{
    yield takeLatest(POST_SITE, postSiteWorker)
}

export function* sitesWatcher()
{
    yield takeLatest(LOAD_SITES, loadSitesWorker)
}