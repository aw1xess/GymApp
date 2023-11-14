import React from "react";
import "./DeleteExerciseButton.css";

export default function DeleteExerciseButton({ deleteExercise }) {
	return (
		<button className="deleteExercise-button" onClick={deleteExercise}>
			<img
				className="deleteExercise-button__image"
				src={require("../../assets/images/cross.png")}
				alt="Delete Exercise"
			/>
		</button>
	);
}
