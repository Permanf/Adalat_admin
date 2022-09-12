import {
    SET_POSTS,
    ADD_POST,
    REMOVE_POST,
    SET_POST,
} from '../types/postTypes'


const initialState = {
    posts: [],
    post: [],
    total: 0,
    last_page: 0,
}

export const postReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case SET_POSTS: {
            return {
                ...state,
                posts: action.payload.data,
                total: action.payload.meta.total,
                last_page: action.payload.meta.last_page,
            }
        }

        case ADD_POST: {
            return {
                ...state,
                posts: [
                    ...state.posts,
                    action.payload
                ]
            }
        }

        case SET_POST: {
            return {
                ...state,
                post: action.payload
            }
        }

        case REMOVE_POST: {
            return {
                ...state,
                posts: state.posts.filter(post => post.id != action.payload)
            }
        }

        default:
            return state
    }
}
