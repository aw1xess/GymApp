import React from "react";
import "./AddExerciseButton.css";

export default function AddExerciseButton({ createExercise }) {
  return (
    <a className="addExercise-button" onClick={createExercise}>
      +
    </a>
  );
}
