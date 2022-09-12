// import i18n from 'i18next'
// import toast from 'react-hot-toast'
import { takeLatest, put, call } from 'redux-saga/effects'
import api from '../../services/api.service'

import {
    setQuestion,
    setQuestions
} from '../actions/questionAction'

import {
    GET_QUESTION,
    GET_QUESTIONS
} from '../types/questionTypes'


// Workers

function* getQuestionsWorker(action)
{
    const result = yield call(api.get, `question?page=${action.payload}`)

    yield put(setQuestions(result.data))
}

function* getQuestionWorker(action)
{
    const result = yield call(api.get, `question/${action.payload}`)

    yield put(setQuestion(result.data.data))
}

// Watchers

export function* getQuestionsWatcher()
{
    yield takeLatest(GET_QUESTIONS, getQuestionsWorker)
}

export function* getQuestionWatcher()
{
    yield takeLatest(GET_QUESTION, getQuestionWorker)
}