import React from "react";
import "./DuplicateNote.css";

function DuplicateNote({ handleDuplicateNote }) {
	return (
		<button
			className="duplicate-button"
			onClick={() => {
				handleDuplicateNote();
			}}
		>
			<img
				src={require("../../assets/images/duplicate.png")}
				alt="Duplicate Note"
			/>
		</button>
	);
}

export default DuplicateNote;
