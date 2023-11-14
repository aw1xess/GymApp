import React from "react";
import "./AddExerciseButton.css";

export default function AddExerciseButton({ createExercise }) {
	return (
		<div className="addExercise">
			<button>
				<img
					src={require("../../assets/images/plus.png")}
					className="addExercise-button"
					onClick={createExercise}
					alt="plus"
				/>
			</button>
			<p className="addExercise-text">Add exercise</p>
		</div>
	);
}
