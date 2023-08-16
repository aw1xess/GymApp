import React, { useState, useEffect, useCallback, useRef } from "react";
import "../Note.css";
import { v4 as uuid } from "uuid";
import DateComponent from "../../DateComponent/DateComponent";
import Exercise from "../../Exercise/Exercise";
import GymDataService from "../../../services/api";
import AddExerciseButton from "../../AddExerciseButton/AddExerciseButton";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrag, useDrop } from "react-dnd";

export default function Note({
  date,
  day,
  deleteNote,
  index,
  moveNoteItem,
  id,
}) {
  const [exercises, setExercises] = useState([]);

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
        handleDataChange(updatedExercises[dragIndex]._id, dragIndex, "index");
        handleDataChange(updatedExercises[hoverIndex]._id, hoverIndex, "index");
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
    GymDataService.createExercise(date, exercises.length, day, id).then(() =>
      getExercises()
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
        if (exercisesToRender[j].index > exercisesToRender[j + 1].index) {
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
        <DateComponent
          date={date}
          day={day}
          deleteNote={deleteNote}
          moveNoteItem={moveNote}
          parentId={id}
        />
        {renderExercises()}
        <AddExerciseButton createExercise={createExercise} />
      </div>
    </DndProvider>
  );
}
