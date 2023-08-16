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
    <div>
      <h1>GYM NOTES</h1>
      <Select selectedOption={day} onOptionChange={handleOptionChange} />
      <NotesHolder selectedOption={day} />
    </div>
  );
}
