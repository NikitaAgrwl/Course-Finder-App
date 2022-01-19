import { FETCH_COURSES_FAILURE, FETCH_COURSES_REQUEST, FETCH_COURSES_SUCCESS } from "./allCoursesTypes"

const initialState = {
    loading: false,
    courses: [],
    error: ''
}

const allCoursesReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_COURSES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_COURSES_SUCCESS:
            return{
                loading: false,
                courses: action.payload,
                error: ''
            }
        case FETCH_COURSES_FAILURE:
            return{
                loading: false,
                courses: [],
                error: action.payload
            }
        default: return state
    }
}

export default allCoursesReducer;