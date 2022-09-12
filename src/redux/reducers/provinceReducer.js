import {
    SAVE_PROVINCE,
    SET_PROVINCE
} from "../types/provinceTypes"


const initialState = {
    provinces: [],
    count: 0,
}

export const provinceReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case SET_PROVINCE: {
            return {
                ...state,
                provinces: action.payload.provinces,
                count: action.payload.count
            }
        }

        case SAVE_PROVINCE: {
            return {
                ...state,
                provinces: state.provinces.map((province, key) => {
                    if(action.payload.id === province.id)
                    {
                        state.provinces[key].name.tm = action.payload.name.tm
                        state.provinces[key].name.ru = action.payload.name.ru
                        state.provinces[key].name.en = action.payload.name.en
                    }

                    return province
                })
            }
        }

        default:
            return state
    }
}
