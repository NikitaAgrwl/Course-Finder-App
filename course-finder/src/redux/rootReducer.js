import { combineReducers } from 'redux';
import allCoursesReducer from "./allCourses/allCoursesReducer";

const rootReducer = combineReducers({
    allCourses: allCoursesReducer,
})

export default rootReducer;