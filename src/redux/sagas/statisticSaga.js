import toast from 'react-hot-toast'
import { takeLatest, put, call } from 'redux-saga/effects'
import api from '../../services/api.service'
import {
    LOAD_STATISTICS,
    PUT_STATISTICS,
    setAcceptCompleted,
    setAllQuestion,
    setForeignQuestion,
    setTmQuestion
} from '../reducers/statisticReducer'


function loadStatistics()
{
    return api.get('information').then(res => res.data.data)
}


// Workers

function* loadStatisticsWorker()
{
    const statistics = yield call(loadStatistics)

    yield put(setAllQuestion(statistics.all_questions))
    yield put(setTmQuestion(statistics.tm_questions))
    yield put(setForeignQuestion(statistics.foreign_questions))
    yield put(setAcceptCompleted(statistics.accept_completed))
}

function* putStatisticsWorker(action)
{
    try {
        const result = yield call(api.put, 'information/1', action.payload)
        
        toast.success('Maglumatlar üstünlikli ýatda saklanyldy', {
            duration: 5000,
        })

        console.log(result)
    }
    catch (error) {
        console.log(error)    
    }
}


// Watchers

export function* putStatisticsWatcher()
{
    yield takeLatest(PUT_STATISTICS, putStatisticsWorker)
}

export function* statisticsWatcher()
{
    yield takeLatest(LOAD_STATISTICS, loadStatisticsWorker)
}