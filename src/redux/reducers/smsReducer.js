import {
    SET_SMS_COUNTS,
    SET_SMS_LIST, SET_SMS_TEMPLATE, SET_SMS_TEMPLATES
} from "../types/smsTypes"


const initialState = {
    sms_list: [],
    sms_templates: [],
    sms_counts: "",
    total: 0,
    last_page: 0,
}

export const smsReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case SET_SMS_LIST: {
            return {
                ...state,
                sms_list: action.payload.data,
                total: action.payload.meta.total,
                last_page: action.payload.meta.last_page,
            }
        }

        case SET_SMS_TEMPLATES: {
            return {
                ...state,
                sms_templates: action.payload,
            }
        }

        case SET_SMS_COUNTS: {
            return {
                ...state,
                sms_counts: action.payload,
            }
        }

        default:
            return state
    }
}
