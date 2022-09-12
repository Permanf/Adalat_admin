import {
    SET_RECEPTION,
    SET_RECEPTIONS,
   

} from "../types/receptionTypes"


const initialState = {
    receptions: [],
    reception: [],
    total: 0,
    last_page: 0,
   
}

export const receptionReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case SET_RECEPTION: {
            return {
                ...state,
                reception: action.payload,
            }
        }
        
        case SET_RECEPTIONS: {
            return {
                ...state,
                receptions: action.payload,
            }
        }

       
        default:
            return state
    }
}
