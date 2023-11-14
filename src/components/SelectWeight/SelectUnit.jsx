import React, { useState, useEffect } from "react";
import "./SelectUnit.css";
import GymDataService from "../../services/api";

const weight = ["kg", "lbs"];
const duration = ["reps", "sec", "min"];

export default function SelectUnit({
	type,
	selectedOption,
	name,
	handleDataChange,
}) {
	const [selectedValue, setSelectedValue] = useState(selectedOption);
	let options = [];

	if (type === "weight") {
		options = weight;
	} else {
		options = duration;
	}

	function renderOptions() {
		let toRender = [];
		for (let i = 0; i < options.length; i++) {
			toRender.push(
				<option key={options[i]} value={options[i]}>
					{options[i]}
				</option>
			);
		}
		return toRender;
	}

	function handleSelectChange(e) {
		setSelectedValue(e.target.value);
	}

	useEffect(() => {
		handleDataChange(selectedValue, name);
	}, [selectedValue]);

	return (
		<div className="select select-unit">
			<select value={selectedValue} onChange={handleSelectChange}>
				{renderOptions()}
			</select>
		</div>
	);
}
