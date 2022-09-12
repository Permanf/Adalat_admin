const SET_LOADING  = 'SET_LOADING'
const SET_REDIRECT = 'SET_REDIRECT'
const SET_PROGRESS = 'SET_PROGRESS'

const InitialState = {
    loading: false,
    redirect: false,
    progress: 0,
}

export const mainReducer = (state = InitialState, action) => {
    switch(action.type)
    {
        case SET_LOADING: {
            return {
                ...state,
                loading: action.payload,
            }
        }

        case SET_REDIRECT: {
            return {
                ...state,
                redirect: action.payload,
            }
        }

        case SET_PROGRESS: {
            return {
                ...state,
                progress: action.payload
            }
        }

        default:
            return state
    }
}


export const setLoading = loading => {
    return {
        type: SET_LOADING,
        payload: loading
    }
}

export const setRedirect = redirect => {
    return {
        type: SET_REDIRECT,
        payload: redirect
    }
}

export const setProgress = progress => {
    return {
        type: SET_PROGRESS,
        payload: progress
    }
}

// 678599
// 671249