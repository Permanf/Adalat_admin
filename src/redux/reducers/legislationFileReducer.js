import {
    SET_LEGISLATION_FILE,
    SET_LEGISLATION_FILES,


} from "../types/legislationFileTypes"


const initialState = {
    files: [],
    file: [],
    total: 0,
    last_page: 0,
  
}

export const legislationFileReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case SET_LEGISLATION_FILE: {
            return {
                ...state,
                file: action.payload,
            }
        }
        
        case SET_LEGISLATION_FILES: {
            return {
                ...state,
                files: action.payload,
            }
        }

       
        default:
            return state
    }
}
