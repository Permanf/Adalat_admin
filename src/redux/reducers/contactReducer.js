import {
    SET_CONTACTS,
    SET_CONTACT,
} from '../types/contactTypes'


const initialState = {
    contacts: [],
    total: 0,
    last_page: 0,
}

export const contactReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case SET_CONTACTS: {
            return {
                ...state,
                contacts: action.payload.data,
                total: action.payload.meta.total,
                last_page: action.payload.meta.last_page,
            }
        }

        case SET_CONTACT: {
            return {
                ...state,
                contacts: [
                    ...state.contacts,
                    action.payload
                ]
            }
        }

        // case REMOVE_NEWS: {
        //     return {
        //         ...state,
        //         news: state.news.filter(news => news.id != action.payload)

        //     }
        // }

        default:
            return state
    }
}
