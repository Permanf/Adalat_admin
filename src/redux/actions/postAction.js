import {
    LOAD_POSTS,
    SET_POSTS,
    ADD_POST,
    REMOVE_POST,
    POST_POST,
    GET_POST,
    SET_POST,
    UPDATE_POST,
    LOAD_EVENTS,
} from '../types/postTypes'


export const loadPosts = page => {
    return {
        type: LOAD_POSTS,
        payload: page
    }
}

export const loadEvents = page => {
    return {
        type: LOAD_EVENTS,
        payload: page
    }
}

export const setPosts = payload => {
    return {
        type: SET_POSTS,
        payload
    }
}

export const getPost = post_id => {
    return {
        type: GET_POST,
        payload: post_id
    }
}

export const postPost = post => {
    return {
        type: POST_POST,
        payload: post
    }
}

export const addPost = post => {
    return {
        type: ADD_POST,
        payload: post
    }
}

export const setPost = post => {
    return {
        type: SET_POST,
        payload: post
    }
}

export const updatePost = post => {
    return {
        type: UPDATE_POST,
        payload: post
    }
}

export const removePost = post_id => {
    return {
        type: REMOVE_POST,
        payload: post_id
    }
}