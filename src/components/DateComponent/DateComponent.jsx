import React from "react";
import "./DateComponent.css";
import { v4 as uuid } from "uuid";
import Input from "../Input/Input";
import DeleteNoteButton from "../DeleteNoteButton/DeleteNoteButton";
import GymDataService from "../../services/api";

export default function DateComponent({
  date,
  day,
  deleteNote,
  moveNoteItem,
  parentId,
}) {
  function handleDateChange(date, newDate) {
    GymDataService.updateDate(date, newDate, day, parentId);
  }

  function handleDeleteNote() {
    deleteNote(parentId);
  }

  function moveNote(direction) {
    moveNoteItem(direction);
  }

  return (
    <div className="date">
      <Input
        value={date}
        id={uuid().slice(0, 8)}
        name="date"
        handleDateChange={handleDateChange}
      />
      <a
        className="up-arrow"
        onClick={() => {
          moveNote("up");
        }}
      ></a>
      <a
        className="down-arrow"
        onClick={() => {
          moveNote("down");
        }}
      ></a>
      <DeleteNoteButton handleDeleteNote={handleDeleteNote} />
      <span></span>
    </div>
  );
}
