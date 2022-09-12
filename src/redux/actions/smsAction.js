import {
    GET_SMS_COUNTS,
    GET_SMS_LIST,
    GET_SMS_TEMPLATES,
    SET_SMS_COUNTS,
    SET_SMS_LIST,
    SET_SMS_TEMPLATES
} from "../types/smsTypes"


export const getSmsList = (page = 1, dates = null) => {
    return {
        type: GET_SMS_LIST,
        payload: {page, dates}
    }
}

export const setSmsList = sms_list => {
    return {
        type: SET_SMS_LIST,
        payload: sms_list
    }
}

export const getSmsTemplates = templates => {
    return {
        type: GET_SMS_TEMPLATES,
        payload: templates
    }
}

export const setSmsTemplates = templates => {
    return {
        type: SET_SMS_TEMPLATES,
        payload: templates
    }
}

export const getSmsCounts = () => ({type: GET_SMS_COUNTS})

export const setSmsCounts = sms_counts => {
    return {
        type: SET_SMS_COUNTS,
        payload: sms_counts
    }
}