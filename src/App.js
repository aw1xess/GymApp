import React, { useState } from "react";
import "./App.css";
import Select from "./components/Select/Select";
import NotesHolder from "./components/NotesHolder/NotesHolder";

export default function App() {
	const [day, setDay] = useState("monday");

	function handleOptionChange(selectedOption) {
		setDay(selectedOption);
	}

	return (
		<div className="container">
			<nav>
				<div className="logo">
					<h1>GYM</h1>
					<img
						src={require("../src/assets/images/dumbell.png")}
						alt="Dumbell"
					/>
					<h1>APP</h1>
				</div>

				<Select
					selectedOption={day}
					onOptionChange={handleOptionChange}
				/>
			</nav>
			<NotesHolder selectedOption={day} />
		</div>
	);
}
