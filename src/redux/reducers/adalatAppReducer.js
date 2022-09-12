import {
    CHANGE_STATUS,
    SET_APP_LIST,
    SET_APP_ORDER,
    SET_APP_ORDERS,
} from "../types/adalatAppTypes"


const initialState = {
    app_orders: [],
    app_order: [],
    app_list: [],
    total: 0,
    last_page: 0,
}

export const adalatAppReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case SET_APP_ORDERS: {
            return {
                ...state,
                app_orders: action.payload.data,
                total: action.payload.meta.total,
                last_page: action.payload.meta.last_page,
            }
        }

        case SET_APP_LIST: {
            return {
                ...state,
                app_list: action.payload,
            }
        }

        case SET_APP_ORDER: {
            return {
                ...state,
                app_order: action.payload,
            }
        }

        case CHANGE_STATUS: {
            return {
                ...state,
                app_order: {
                    ...state.app_order,
                    status: action.payload.text,
                }
            }
        }

        default:
            return state
    }
}
