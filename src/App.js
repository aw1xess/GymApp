import React, { useState } from "react";
import "./App.css";
import Select from "./components/Select/Select";
import NotesHolder from "./components/NotesHolder/NotesHolder";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function App() {
  const [day, setDay] = useState("monday");

  function handleOptionChange(selectedOption) {
    setDay(selectedOption);
  }

  return (
    <div>
      <h1>GYM NOTES</h1>
      <Select selectedOption={day} onOptionChange={handleOptionChange} />
      <NotesHolder selectedOption={day} />
    </div>
  );
}
