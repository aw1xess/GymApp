import React from "react";
import "./DateComponent.css";
import { v4 as uuid } from "uuid";
import Input from "../Input/Input";
import DeleteNoteButton from "../DeleteNoteButton/DeleteNoteButton";
import DuplicateNote from "../DuplicateNote/DuplicateNote";
import GymDataService from "../../services/api";

export default function DateComponent({
	date,
	day,
	deleteNote,
	getNotesInfo,
	parentId,
}) {
	function handleDateChange(date, newDate) {
		GymDataService.updateDate(date, newDate, day, parentId);
	}

	function handleDuplicateNote() {
		GymDataService.duplicateNote(parentId, day).then(() => {
			getNotesInfo();
		});
	}

	function handleDeleteNote() {
		deleteNote(parentId);
	}

	return (
		<div className="date">
			<Input
				value={date}
				id={uuid().slice(0, 8)}
				name="date"
				handleDateChange={handleDateChange}
			/>
			<div className="date-buttons">
				<DuplicateNote handleDuplicateNote={handleDuplicateNote} />
				<DeleteNoteButton handleDeleteNote={handleDeleteNote} />
			</div>
		</div>
	);
}
