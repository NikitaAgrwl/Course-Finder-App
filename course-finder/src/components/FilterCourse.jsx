import React, { useState, useMemo } from "react";
import CourseCard from "./CourseCard/CourseCard";
import "./Header/Header.css";
import "../App.css";


export default function FilterCourse({ course, submitInput }) {
	let filterCourses = course;
		const pageSize = 8;
		const [currentPage] = useState(1);

	const change =
		submitInput.date ||
		submitInput.name ||
		submitInput.child ||
		submitInput.isSelfPaced;

	if (change) {
		window.scrollTo(0, 0);
		if (submitInput.date) {
			filterCourses = filterCourses.filter((course) => {
				console.log(typeof course["Next Session Date"]);

				return (
					course["Next Session Date"].toString().indexOf(submitInput.date) !==
					-1
				);
			});
		}
		if (submitInput.name) {
			filterCourses = filterCourses.filter((name) => {
				return (
					name["Course Name"]
						.toString()
						.toLowerCase()
						.indexOf(submitInput.name.toLowerCase()) !== -1
				);
			});
		}

		if (submitInput.child) {
			filterCourses = filterCourses.filter((child) => {
				return (
					child["Child Subject"]
						.toString()
						.toLowerCase()
						.indexOf(submitInput.child.toLowerCase()) !== -1
				);
			});
		}
		if (submitInput.isSelfPaced) {
			filterCourses = filterCourses.filter((isSelfPaced) => {
				return (
					isSelfPaced["Next Session Date"]
						.toString()
						.toLowerCase()
						.indexOf("Self paced".toLowerCase()) !== -1
				);
			});
		}
	}

	const currentData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * pageSize;
		const lastPageIndex = firstPageIndex + pageSize;
		const newData = filterCourses.slice(firstPageIndex, lastPageIndex);
		console.log(newData);
		return newData;
	}, [currentPage, filterCourses]);

	// To display course cards
	function displayCourses() {
		return (
			<div>
				<div className="courseCard">
					{currentData.map((item, index) => (
						<CourseCard
							key={index}
							id={item["Course Id"]}
							date={item["Next Session Date"]}
							name={item["Course Name"]}
							provider={item["Provider"]}
							issuer={item["Universities/Institutions"]}
							parent={item["Parent Subject"]}
							child={item["Child Subject"]}
							url={item.Url}
						/>
					))}
				</div>
				
			</div>
		);
	}

	
	return (
		<div>
			<div>{displayCourses()}</div>
			<div className="courseFound">
				<h3>
					Courses found:{" "}
					<span className="courseNum">{filterCourses.length}</span>
				</h3>
			</div>
			{change && filterCourses.length === 0 && (
				<div>
					<h1>No courses found!</h1>
				</div>
			)}
		</div>
	);
}

