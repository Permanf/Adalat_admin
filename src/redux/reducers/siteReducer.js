import {
    SET_SITES,
    ADD_SITE,
    REMOVE_SITE,
    DELETE_CONFIRM,
} from '../types/siteTypes'


const initialState = {
    sites: [],
    total: 0,
    last_page: 0,
    deleteConfirmation: false,
    deleteID: null,
}

export const siteReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case SET_SITES: {
            return {
                ...state,
                sites: action.payload.data,
                total: action.payload.meta.total,
                last_page: action.payload.meta.last_page,
            }
        }

        case ADD_SITE: {
            return {
                ...state,
                sites: [
                    ...state.sites,
                    action.payload
                ]
            }
        }

        case REMOVE_SITE: {
            return {
                ...state,
                sites: state.sites.filter(site => site.id != action.payload)

            }
        }

        case DELETE_CONFIRM: {
            return {
                ...state,
                deleteConfirmation: action.payload.confirm,
                deleteID: action.payload.id,
            }
        }

        default:
            return state
    }
}
