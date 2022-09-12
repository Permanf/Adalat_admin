import {
    ADD_BANNER,
    DELETE_BANNER,
    SET_BANNERS,
} from "../types/bannerTypes"

const InitialState = {
    banners: [],
    total: 0,
    last_page: 0,
}

export const bannerReducer = (state = InitialState, action) => {
    switch(action.type)
    {
        case SET_BANNERS: {
            return {
                ...state,
                banners: action.payload.data,
                total: action.payload.meta.total,
                last_page: action.payload.meta.last_page,
            }
        }

        case ADD_BANNER: {
            return {
                ...state,
                banners: [
                    ...state.banners,
                    action.payload
                ]
            }
        }

        case DELETE_BANNER: {
            return {
                ...state,
                banners: state.banners.filter(banner => banner.id !== action.payload),
                total: state.total > 0 ? state.total - 1 : 0
            }
        }

        default:
            return state
    }
}
