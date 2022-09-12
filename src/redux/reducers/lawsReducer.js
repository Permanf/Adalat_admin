import {
    ADD_LAW,
    SET_LAWS,
    DELETE_LAW,
    SET_LAW,
    SET_LAW_FILE,
    PUT_LAW_CATEGORY,
    SET_LAW_CONFIRM_DEPARTMENTS,
    DELETE_LAW_FILE,
    SET_LAST_UPDATED,
    SET_FILES,
} from "../types/lawsTypes"

const InitialState = {
    laws: [],
    files: [],
    law: [],
    law_file: [],
    law_confirm_departments: [],
    last_updated: [],
    total: 0,
    last_page: 0,
    loading: false,
}

export const lawsReducer = (state = InitialState, action) => {
    switch(action.type)
    {
        case SET_LAWS: {
            return {
                ...state,
                laws: action.payload.data,
                total: action.payload.meta.total,
                last_page: action.payload.meta.last_page,
            }
        }

        case SET_FILES: {
            return {
                ...state,
                files: action.payload,
            }
        }

        case SET_LAW_CONFIRM_DEPARTMENTS: {
            return {
                ...state,
                law_confirm_departments: action.payload
            }
        }

        case ADD_LAW: {
            return {
                ...state,
                laws: [
                    ...state.laws,
                    action.payload
                ],
                total: state.laws.length + 1
            }
        }

        case PUT_LAW_CATEGORY: {
            return {
                ...state,
                laws: state.laws.map((law, index) => {
                    if(law.id === action.payload.id)
                    {
                        state.laws[index].title.tm = action.payload.title.tm;
                        state.laws[index].title.ru = action.payload.title.ru;
                        state.laws[index].title.en = action.payload.title.en;
                    }

                    return law
                })
            }
        }

        case SET_LAW: {
            return {
                ...state,
                law: action.payload
            }
        }

        case SET_LAW_FILE: {
            return {
                ...state,
                law_file: action.payload
            }
        }

        case DELETE_LAW: {
            return {
                ...state,
                laws: state.laws.filter(law => law.id !== action.payload),
                total: state.laws.length - 1
            }
        }

        case DELETE_LAW_FILE: {
            return {
                ...state,
                law: {
                    ...state.law,
                    law_files: state.law.law_files.filter(law_file => law_file.id !== action.payload),
                    law_files_count: state.law.law_files.length - 1
                }
            }
        }

        case SET_LAST_UPDATED: {
            return {
                ...state,
                last_updated: action.payload
            }
        }

        default:
            return state
    }
} 