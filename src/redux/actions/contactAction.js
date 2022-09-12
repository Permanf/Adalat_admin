import {
    GET_CONTACT,
    GET_CONTACTS,
    SET_CONTACT,
    SET_CONTACTS,
} from '../types/contactTypes'

export const getContacts = page => {
    return {
        type: GET_CONTACTS,
        payload: page
    }
}

export const setContacts = contacts => {
    return {
        type: SET_CONTACTS,
        payload: contacts
    }
}

export const getContact = contact => {
    return {
        type: GET_CONTACT,
        payload: contact
    }
}

export const setContact = contact => {
    return {
        type: SET_CONTACT,
        payload: contact
    }
}