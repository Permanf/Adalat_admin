import {
    SET_DEPARTMENTS,
    ADD_DEPARTMENT,
    REMOVE_DEPARTMENT,
    CHANGE_DEPARTMENT_IMAGE,
} from '../types/departmentTypes'


const initialState = {
    departments: [],
    total: 0,
    last_page: 0,
}

export const departmentReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case SET_DEPARTMENTS: {
            return {
                ...state,
                departments: action.payload.data,
                total: action.payload.meta.total,
                last_page: action.payload.meta.last_page,
            }
        }

        case ADD_DEPARTMENT: {
            return {
                ...state,
                departments: [
                    ...state.departments,
                    action.payload
                ],
                total: state.departments.total + 1
            }
        }

        case CHANGE_DEPARTMENT_IMAGE: {
            return {
                ...state,
                departments: state.departments.map((department, index) => {
                    if(department.id === action.payload.id)
                    {
                        state.departments[index].image_mini = action.payload.image
                    }

                    return department
                })
            }
        }

        case REMOVE_DEPARTMENT: {
            return {
                ...state,
                departments: state.departments.filter(department => department.id != action.payload),
                total: state.departments.total - 1
            }
        }

        default:
            return state
    }
}
