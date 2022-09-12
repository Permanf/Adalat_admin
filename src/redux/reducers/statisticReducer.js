export const SET_ALL_QUESTIONS  = 'STATISTICS/SET_ALL_QUESTIONS'
export const SET_TM_QUESTIONS  = 'STATISTICS/SET_TM_QUESTIONS'
export const SET_FOREIGN_QUESTIONS  = 'STATISTICS/SET_FOREIGN_QUESTIONS'
export const SET_ACCEPT_COMPLETED  = 'STATISTICS/SET_ACCEPT_COMPLETED'
export const LOAD_STATISTICS = 'STATISTICS/LOAD_STATISTICS'
export const PUT_STATISTICS = 'STATISTICS/PUT_STATISTICS'


const InitialState = {
    all_questions: 0,
    tm_questions: 0,
    foreign_questions: 0,
    accept_completed: 0,
}

export const statisticReducer = (state = InitialState, action) => {
    switch(action.type)
    {
        case SET_ALL_QUESTIONS: {
            return {
                ...state,
                all_questions: action.payload,
            }
        }

        case SET_TM_QUESTIONS: {
            return {
                ...state,
                tm_questions: action.payload,
            }
        }

        case SET_FOREIGN_QUESTIONS: {
            return {
                ...state,
                foreign_questions: action.payload,
            }
        }

        case SET_ACCEPT_COMPLETED: {
            return {
                ...state,
                accept_completed: action.payload,
            }
        }

        default:
            return state
    }
}


export const setAllQuestion = all_question => {
    return {
        type: SET_ALL_QUESTIONS,
        payload: all_question
    }
}

export const setTmQuestion = tm_question => {
    return {
        type: SET_TM_QUESTIONS,
        payload: tm_question
    }
}

export const setForeignQuestion = foreign_question => {
    return {
        type: SET_FOREIGN_QUESTIONS,
        payload: foreign_question
    }
}

export const setAcceptCompleted = accept_completed => {
    return {
        type: SET_ACCEPT_COMPLETED,
        payload: accept_completed
    }
}

export const putStatistics = statistics => {
    return {
        type: PUT_STATISTICS,
        payload: statistics
    }
}

export const loadStatistics = () => ({ type: LOAD_STATISTICS })