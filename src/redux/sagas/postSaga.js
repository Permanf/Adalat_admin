import i18n from 'i18next'
import toast from 'react-hot-toast'
import api from '../../services/api.service'

import {
    takeLatest,
    put,
    call
} from 'redux-saga/effects'

import {
    setPost,
    setPosts
} from '../actions/postAction'

import {
    setLoading,
    setRedirect
} from '../reducers/mainReducer'

import {
    GET_POST,
    LOAD_EVENTS,
    LOAD_POSTS,
    POST_POST,
    REMOVE_POST,
    UPDATE_POST
} from '../types/postTypes'


function* loadPostsWorker(action)
{
    const result = yield call(api.get, `post?page=${action.payload}`)

    yield put(setPosts(result.data))
}

function* loadEventsWorker(action)
{
    const result = yield call(api.get, `events?&page=${action.payload}`)

    yield put(setPosts(result.data))
}

function* getPostWorker(action)
{
    try {
        const result = yield call(api.get, `post/${action.payload}`)

        yield put(setPost(result.data.data))
    }
    catch (err) {
        console.log(err)    
    }
}

function* postPostWorker(action)
{
    const formData = new FormData()

    formData.append('title', JSON.stringify(action.payload.title))
    formData.append('text', JSON.stringify(action.payload.text))
    formData.append('type', action.payload.type)
    formData.append('published_at', action.payload.publishedAt)
    formData.append('image', action.payload.image)

    try {
        const result = yield call(api.post, 'post', formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        })

        yield put(setPost(result.data.post))
        yield put(setLoading(false))
        yield put(setRedirect(true))
        yield put(setRedirect(false))

        toast.success(i18n.t('success_added'), {
            duration: 2000,
        })

    } catch (err) {
        yield put(setLoading(false))

        toast.error(i18n.t('error_not_added'), {
            duration: 2000,
        })

        console.log(err)
    }
}


function* updatePostWorker(action)
{
    const data = {
        title: action.payload.title,
        text: action.payload.text,
        type: action.payload.type,
        published_at: action.payload.published_at,
    }

    try {
        const result = yield call(api.put, `post/${action.payload.id}`, data)

        yield put(setRedirect(true))
        yield put(setRedirect(false))
        yield put(setPost(result.data.post))
        yield put(setLoading(false))

        toast.success(i18n.t('success_saved'), {
            duration: 2000,
        })

    } catch (err) {
        yield put(setLoading(false))

        console.log(err)
    }
}


function* removePostWorker(action)
{
    try {
        yield call(api.delete, `post/${action.payload}`)

        yield put(setLoading(false))

        toast.success(i18n.t('success_deleted'), {
            duration: 2000,
        })

        yield put(setRedirect(true))
        yield put(setRedirect(false))

    }
    catch (err) {
        yield put(setLoading(false))

        toast.error(i18n.t('error_not_deleted'), {
            duration: 2000,
        })

        console.log(err)
    }
}

export function* loadPostsWatcher()
{
    yield takeLatest(LOAD_POSTS, loadPostsWorker)
}

export function* loadEventsWatcher()
{
    yield takeLatest(LOAD_EVENTS, loadEventsWorker)
}

export function* getPostWatcher()
{
    yield takeLatest(GET_POST, getPostWorker)
}

export function* postPostWatcher()
{
    yield takeLatest(POST_POST, postPostWorker)
}

export function* updatePostWatcher()
{
    yield takeLatest(UPDATE_POST, updatePostWorker)
}

export function* removePostWatcher()
{
    yield takeLatest(REMOVE_POST, removePostWorker)
}

