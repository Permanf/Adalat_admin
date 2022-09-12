import toast from 'react-hot-toast'
import { takeLatest, put, call } from 'redux-saga/effects'
import api from '../../services/api.service'
import { setLoading, setRedirect } from '../reducers/mainReducer'
import i18n from 'i18next'

import {
    setCategoryQuestionAnswers,
    setQuestionAnswer,
    setQuestionCategories,
    setQuestionCategory,
} from '../actions/questionAnswerAction'

import {
    DELETE_QUESTION_ANSWER,
    DELETE_QUESTION_CATEGORY,
    GET_CATEGORY_QUESTION_ANSWERS,
    GET_QUESTION_ANSWER,
    GET_QUESTION_CATEGORIES,
    GET_QUESTION_CATEGORY,
    GET_QUESTION_SUB_CATEGORIES,
    PUT_QUESTION_ANSWER,
    STORE_CATEGORY_QUESTION_ANSWERS,
    STORE_QUESTION_CATEGORY,
    STORE_QUESTION_SUB_CATEGORY,
    UPDATE_QUESTION_CATEGORY
} from '../types/questionAnswerTypes'



function* getQuestionCategoriesWorker()
{
    const result = yield call(api.get, 'question_answer/categories')

    yield put(setQuestionCategories(result.data))
}

function* getQuestionSubCategoriesWorker(action)
{
    const result = yield call(api.get, `question_answer/categories/${action.payload}`)

    yield put(setQuestionCategories(result.data.data))
}

function* getQuestionCategoryWorker(action)
{
    const result = yield call(api.get, `question_answer/category/${action.payload}`)

    yield put(setQuestionCategory(result.data))
}

function* storeQuestionCategoryWorker(action)
{
    const result = yield call(api.post, 'question_answer/category', {title: action.payload})

    yield put(setQuestionCategory(result.data))
    
    toast.success(i18n.t('success_added'), {
        duration: 2000,
    })
}

function* updateQuestionCategoryWorker(action)
{
    const result = yield call(api.put, `question_answer/category/${action.payload.id}`, {title: action.payload.title})

    yield put(setQuestionCategory(result.data))
    
    toast.success(i18n.t('success_added'), {
        duration: 2000,
    })
}

function* deleteQuestionCategoryWorker(action)
{
    yield call(api.delete, `question_answer/category/${action.payload}`)

    toast.success(i18n.t('success_added'), {
        duration: 2000,
    })
}

function* storeQuestionSubCategoryWorker(action)
{
    yield call(api.post, `question_answer/add/subcategory/${action.payload.category_id}`, {title: action.payload.title})
    
    toast.success(i18n.t('success_added'), {
        duration: 2000,
    })
}

function* storeCategoryQuestionAnswerWorker(action)
{
    const result = yield call(api.post, `question_answer/store/${action.payload.id}`, {title: action.payload.title, text: action.payload.text})

    yield put(setQuestionCategory(result.data))
    
    toast.success(i18n.t('success_added'), {
        duration: 2000,
    })
}

function* getCategoryQuestionAnswersWorker(action)
{
    const result = yield call(api.get, `question_answer/subcategory/${action.payload}`)

    yield put(setCategoryQuestionAnswers(result.data.data))
}

// mine
function* getQuestionAnswerWorker(action)
{
    try {
        const result = yield call(api.post, `question_answer/show/${action.payload}`)

        yield put(setQuestionAnswer(result.data.data))

    } catch (err) {
        yield put(setLoading(false))

        console.log(err)
    }
}
function* putQuestionAnswerWorker(action)
{
    try {
        const result = yield call(api.post, `question_answer/update/${action.payload.id}`, action.payload)

        yield put(setLoading(false))
        yield put(setRedirect(false))

        toast.success(i18n.t('success_added'), {
            duration: 2000,
        })
        
    } catch (err) {
        yield put(setLoading(false))
        yield put(setRedirect(false))

        toast.error(i18n.t('error_not_saved'), {
            duration: 2000,
        })

        console.log(err)
    }
}
function* deleteQuestionAnswerWorker(action)
{
    try {
        yield call(api.post, `question_answer/delete/${action.payload}`)
        

        toast.success(i18n.t('success_deleted'), {
            duration: 2000,
        })
        yield put(setLoading(false))
        yield put(setRedirect(false))
        
    } catch (err) {
       

        toast.error(i18n.t('error_not_deleted'), {
            duration: 2000,
        })
        yield put(setLoading(false))
        yield put(setRedirect(false))
        console.log(err)
    }
}

export function* getQuestionCategoriesWatcher()
{
    yield takeLatest(GET_QUESTION_CATEGORIES, getQuestionCategoriesWorker)
}

export function* getQuestionSubCategoriesWatcher()
{
    yield takeLatest(GET_QUESTION_SUB_CATEGORIES, getQuestionSubCategoriesWorker)
}

export function* getQuestionCategoryWatcher()
{
    yield takeLatest(GET_QUESTION_CATEGORY, getQuestionCategoryWorker)
}

export function* storeQuestionCategoryWatcher()
{
    yield takeLatest(STORE_QUESTION_CATEGORY, storeQuestionCategoryWorker)
}

export function* updateQuestionCategoryWatcher()
{
    yield takeLatest(UPDATE_QUESTION_CATEGORY, updateQuestionCategoryWorker)
}

export function* deleteQuestionCategoryWatcher()
{
    yield takeLatest(DELETE_QUESTION_CATEGORY, deleteQuestionCategoryWorker)
}

export function* storeQuestionSubCategoryWatcher()
{
    yield takeLatest(STORE_QUESTION_SUB_CATEGORY, storeQuestionSubCategoryWorker)
}

export function* getCategoryQuestionAnswersWatcher()
{
    yield takeLatest(GET_CATEGORY_QUESTION_ANSWERS, getCategoryQuestionAnswersWorker)
}

export function* storeCategoryQuestionAnswerWatcher()
{
    yield takeLatest(STORE_CATEGORY_QUESTION_ANSWERS, storeCategoryQuestionAnswerWorker)
}
// mine
export function* getQuestionAnswerWatcher()
{
    yield takeLatest(GET_QUESTION_ANSWER, getQuestionAnswerWorker)
}
export function* putQuestionAnswerWatcher()
{
    yield takeLatest(PUT_QUESTION_ANSWER, putQuestionAnswerWorker)
}
export function* deleteQuestionAnswerWatcher()
{
    yield takeLatest(DELETE_QUESTION_ANSWER, deleteQuestionAnswerWorker)
}