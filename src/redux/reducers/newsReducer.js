import {
    SET_NEWS,
    ADD_NEWS,
    REMOVE_NEWS,
    SET_NEWS_ITEM,
} from '../types/newsTypes'


const initialState = {
    news: [],
    news_item: [],
    total: 0,
    last_page: 0,
}

export const newsReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case SET_NEWS: {
            return {
                ...state,
                news: action.payload.data,
                total: action.payload.meta.total,
                last_page: action.payload.meta.last_page,
            }
        }

        case ADD_NEWS: {
            return {
                ...state,
                news: [
                    ...state.news,
                    action.payload
                ]
            }
        }

        case SET_NEWS_ITEM: {
            return {
                ...state,
                news_item: action.payload
            }
        }

        case REMOVE_NEWS: {
            return {
                ...state,
                news: state.news.filter(news => news.id != action.payload)

            }
        }

        default:
            return state
    }
}
