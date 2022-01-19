import {
	FETCH_COURSES_FAILURE,
	FETCH_COURSES_REQUEST,
	FETCH_COURSES_SUCCESS,
} from "./allCoursesTypes";
import axios from "axios";

export const fetchCoursesRequest = () => {
	return {
		type: FETCH_COURSES_REQUEST,
	};
};

export const fetchCoursesSuccess = (courses) => {
	return {
		type: FETCH_COURSES_SUCCESS,
		payload: courses,
	};
};

export const fetchCoursesFailure = (error) => {
	return {
		type: FETCH_COURSES_FAILURE,
		payload: error,
	};
};

export const fetchCourses = () => {
	return async (dispatch) => {
		dispatch(fetchCoursesRequest());
		await axios
			.get("https://nut-case.s3.amazonaws.com/coursessc.json")
			.then((res) => {
				const courses = res.data.slice(0, 500);
				dispatch(fetchCoursesSuccess(courses));
			})
			.catch((err) => {
				const error = err.message;
				dispatch(fetchCoursesFailure(error));
			});
	};
};
