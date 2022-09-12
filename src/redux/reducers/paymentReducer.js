import {
    CHANGE_STATUS,
    SET_PAYMENT,
    SET_PAYMENTS,
} from "../types/paymentTypes"


const initialState = {
    payments: [],
    payment: [],
    total: 0,
    last_page: 0,
}

export const paymentReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case SET_PAYMENTS: {
            return {
                ...state,
                payments: action.payload.data,
                total: action.payload.meta.total,
                last_page: action.payload.meta.last_page,
            }
        }

        case SET_PAYMENT: {
            return {
                ...state,
                payment: action.payload,
            }
        }

        case CHANGE_STATUS: {
            return {
                ...state,
                payment: {
                    ...state.payment,
                    status: action.payload.text,
                }
            }
        }

        default:
            return state
    }
}
