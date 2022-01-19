import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header/Header";
import FilterCourse from "./FilterCourse";
import "../App.css";
import { CircularProgress } from "@mui/material";
import { fetchCourses } from "../redux/allCourses/allCoursesActions";

function Search() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCourses());
	}, [dispatch]);

	const loading = useSelector((state) => state.allCourses.loading);
	const courses = useSelector((state) => state.allCourses.courses);
	console.log(courses);
	const [searchInput, setSearchInput] = useState({
		name: "",
		child: "",
		date: "",
		isSelfPaced: false,
	});
	const [submitInput, setSubmitInput] = useState({
		name: "",
		child: "",
		date: "",
		isSelfPaced: false,
		pageStart: false,
	});

	let getSearchInput = (e) => {
		if (e.target.name === "name") {
			setSearchInput({
				...searchInput,
				name: e.target.value,
			});
		} else if (e.target.name === "child") {
			setSearchInput({
				...searchInput,
				child: e.target.value,
			});
		} else if (e.target.name === "date") {
			setSearchInput({
				...searchInput,
				date: e.target.value,
			});
		} else if (e.target.name === "isSelfPaced") {
			setSearchInput({
				...searchInput,
				isSelfPaced: !searchInput.isSelfPaced,
			});
		}
	};

	let suffix = "";
	const monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	let refresh = () => {
		setSubmitInput({
			name: "",
			child: "",
			date: "",
			isSelfPaced: false,
			pageStart: true,
		});
		setSearchInput({
			name: "",
			child: "",
			date: "",
			isSelfPaced: false,
		});
	};
	let search = (e) => {
		// e.preventDefault();
		let dateInput = "";
		if (searchInput.date) {
			let date = JSON.stringify(searchInput.date);
			let formattedDate = date.replace(/^"(.+)"$/, "$1");
			console.log(formattedDate);
			let year = formattedDate.slice(0, 4);
			let month = formattedDate.slice(5, 7);
			let day = formattedDate.slice(8, 10);
			if (day === "01" || day === "21" || day === "31") {
				suffix = "st";
			} else if (day === "2" || day === "22") {
				suffix = "nd";
			} else if (day === "3" || day === "23") {
				suffix = "rd";
			} else {
				suffix = "th";
			}
			dateInput =
				day.concat(suffix) +
				" " +
				monthNames[parseInt(month - 1)] +
				"," +
				" " +
				year;
		}
		if (searchInput.isSelfPaced) {
			setSubmitInput({
				name: searchInput.name,
				child: searchInput.child,
				date: "",
				isSelfPaced: searchInput.isSelfPaced,
			});
		} else {
			setSubmitInput({
				name: searchInput.name,
				child: searchInput.child,
				date: dateInput,
				isSelfPaced: searchInput.isSelfPaced,
			});
		}
		setSearchInput({
			name: "",
			child: "",
			date: "",
			isSelfPaced: false,
			pageStart: false,
		});
	};

	return (
		<>
			{loading ? (
				<div className="loader" role="status">
					<CircularProgress color="warning" />
				</div>
			) : (
				<FilterCourse course={courses} submitInput={submitInput} />
			)}
			<Header
				setSearchInput={searchInput}
				getSearchInput={getSearchInput}
				search={search}
				refresh={refresh}
			/>
		</>
	);
}

export default Search;
