import {
    LOAD_NEWS,
    SET_NEWS,
    POST_NEWS,
    ADD_NEWS,
    REMOVE_NEWS,
    PUT_NEWS,
    GET_NEWS_ITEM,
    SET_NEWS_ITEM,
} from '../types/newsTypes'


export const loadNews = page => {
    return {
        type: LOAD_NEWS,
        payload: page
    }
}

export const setNews = payload => {
    return {
        type: SET_NEWS,
        payload
    }
}

export const getNewsItem = payload => {
    return {
        type: GET_NEWS_ITEM,
        payload
    }
}

export const setNewsItem = news_item => {
    return {
        type: SET_NEWS_ITEM,
        payload: news_item
    }
}

export const postNews = news => {
    return {
        type: POST_NEWS,
        payload: news
    }
}

export const putNews = news => {
    return {
        type: PUT_NEWS,
        payload: news
    }
}

export const addNews = news => {
    return {
        type: ADD_NEWS,
        payload: news
    }
}

export const removeNews = news_id => {
    return {
        type: REMOVE_NEWS,
        payload: news_id
    }
}