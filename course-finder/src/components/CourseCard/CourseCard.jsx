import React from "react";
import "./CourseCard.css";
import { CalendarToday } from "@mui/icons-material";

function CourseCard(props) {
	// const { courseNum, courseDate, courseProvider } = props;
	// console.log(props);
	// console.log(courseNum);
	return (
		<div className="card">
			<div className="cardTitle">
				<h4>{props.id}</h4>
				<p>
					<CalendarToday color="action" />
					{props.date}
				</p>
			</div>
			<div className="courseDetails">
				<div>
					<h4 className="subHeading">Provider</h4>
					<h3 className="provider">{props.provider}</h3>
				</div>
				<div>
					<h4 className="subHeading">Course Name</h4>
					<h3 className="courseName">{props.name} </h3>
				</div>
				<div>
					<h4 className="subHeading">Universities/Institutions</h4>
					<h3 className="courseIssuer">{props.issuer}</h3>
				</div>
				<div className="cardFooter">
					<div>
						<h4 className="subHeading">Parent Subject</h4>
						<h3 className="courseSubject">{props.parent}</h3>
					</div>
					<div>
						<h4 className="subHeading">Child Subject</h4>
						<h3 className="courseSubject">{props.child}</h3>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CourseCard;
