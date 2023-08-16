import React from "react";
import "./DeleteExerciseButton.css";

export default function DeleteExerciseButton({ deleteExercise }) {
  return <a className="deleteExercise-button" onClick={deleteExercise}></a>;
}
