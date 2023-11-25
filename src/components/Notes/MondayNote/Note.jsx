import React, { useState, useEffect, useCallback } from "react";
import "../Note.css";
import { v4 as uuid } from "uuid";
import DateComponent from "../../DateComponent/DateComponent";
import Exercise from "../../Exercise/Exercise";
import GymDataService from "../../../services/api";
import AddExerciseButton from "../../AddExerciseButton/AddExerciseButton";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Note({
	date,
	day,
	deleteNote,
	index,
	moveNoteItem,
	getNotesInfo,
	id,
}) {
	const [exercises, setExercises] = useState([]);

	const [screenSize, setScreenSize] = useState(getCurrentDimension());

	function getCurrentDimension() {
		return {
			width: window.innerWidth,
			height: window.innerHeight,
		};
	}

	useEffect(() => {
		const updateDimension = () => {
			setScreenSize(getCurrentDimension());
		};
		window.addEventListener("resize", updateDimension);

		return () => {
			window.removeEventListener("resize", updateDimension);
		};
	}, [screenSize]);

	const moveExerciseListItem = useCallback(
		(dragIndex, hoverIndex) => {
			const dragItem = exercises[dragIndex];
			const hoverItem = exercises[hoverIndex];
			// Swap places of dragItem and hoverItem in the exercises array
			setExercises((exercises) => {
				const updatedExercises = [...exercises];
				updatedExercises[dragIndex] = hoverItem;
				updatedExercises[hoverIndex] = dragItem;
				updatedExercises[dragIndex].index = dragIndex;
				updatedExercises[hoverIndex].index = hoverIndex;
				handleDataChange(
					updatedExercises[dragIndex]._id,
					dragIndex,
					"index"
				);
				handleDataChange(
					updatedExercises[hoverIndex]._id,
					hoverIndex,
					"index"
				);
				return updatedExercises;
			});
		},
		[exercises]
	);

	function getExercises() {
		GymDataService.getExercises(date, day, id).then((response) => {
			setExercises(response.data.exercises);
		});
	}

	function createExercise() {
		GymDataService.createExercise(date, exercises.length, day, id).then(
			() => getExercises()
		);
	}

	async function handleDataChange(id, data, name) {
		GymDataService.updateData(id, data, name, day);
	}

	function moveNote(direction) {
		moveNoteItem(index, direction);
	}

	function deleteExercise(id) {
		if (window.confirm("Do you want to delete this exercise?")) {
			GymDataService.deleteExercise(id, day);
			let isExerciseDeleted = false;
			let exercisesList = exercises;
			let updatedExercises = [];
			exercisesList.forEach((exercise) => {
				if (id !== exercise._id) {
					if (isExerciseDeleted) {
						exercise.index--;
					}
					updatedExercises.push(exercise);
				} else {
					isExerciseDeleted = true;
				}
			});
			setExercises(updatedExercises);
		}
	}

	function renderExercises() {
		let exercisesToRender = exercises;
		//Bubble sort
		for (let i = 0; i < exercisesToRender.length; i++) {
			// Last i elements are already in place
			for (let j = 0; j < exercisesToRender.length - i - 1; j++) {
				// Checking if the item at present iteration
				// is greater than the next iteration
				if (
					exercisesToRender[j].index > exercisesToRender[j + 1].index
				) {
					// If the condition is true
					// then swap them
					let temp = exercisesToRender[j];
					exercisesToRender[j] = exercisesToRender[j + 1];
					exercisesToRender[j + 1] = temp;
				}
			}
		}
		return exercisesToRender.map((exercise) => (
			<Exercise
				key={uuid()}
				name={exercise.name + ":"}
				weight={exercise.weight}
				unit={exercise.unit}
				duration={exercise.duration}
				reps={exercise.reps}
				status={exercise.status}
				handleDataChange={handleDataChange}
				id={exercise._id}
				index={exercise.index}
				deleteExercise={() => deleteExercise(exercise._id)}
				moveListItem={moveExerciseListItem}
				parentId={id}
			/>
		));
	}

	useEffect(() => getExercises(), []);

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="note">
				<div className="note-arrows">
					<button
						className="up-arrow__button"
						onClick={() => {
							moveNote("up");
						}}
					>
						<img
							src={require(screenSize.width > 768
								? "../../../assets/images/up-arrow.png"
								: "../../../assets/images/mobile-arrow-up.png")}
							alt="arrow up"
						/>
					</button>
					<button
						className="down-arrow__button"
						onClick={() => {
							moveNote("down");
						}}
					>
						<img
							src={require(screenSize.width > 768
								? "../../../assets/images/down-arrow.png"
								: "../../../assets/images/mobile-arrow-down.png")}
							alt="arrow down"
						/>
					</button>
				</div>
				<div className="note-info">
					<DateComponent
						date={date}
						day={day}
						deleteNote={deleteNote}
						getNotesInfo={getNotesInfo}
						moveNoteItem={moveNote}
						parentId={id}
					/>
					{renderExercises()}
					<AddExerciseButton createExercise={createExercise} />
				</div>
			</div>
		</DndProvider>
	);
}
