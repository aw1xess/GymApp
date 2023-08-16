import React, { useState, useEffect, useCallback } from "react";
import { v4 as uuid } from "uuid";
import "./NotesHolder.css";
import AddNoteButton from "../AddNoteButton/AddNoteButton";
import Note from "../Notes/MondayNote/Note";
import GymDataService from "../../services/api";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function NotesHolder({ selectedOption }) {
  const [notes, setNotes] = useState([]);

  function getNotesInfo() {
    GymDataService.getNotesInfo(selectedOption).then((response) => {
      setNotes(response.data);
    });
  }

  function addNewNote() {
    let date = new Date().toLocaleDateString();
    GymDataService.createNote(date, notes.length, selectedOption).then(
      (response) => {
        GymDataService.createExercise(
          date,
          0,
          selectedOption,
          response.data._id
        );
        let updatedNotes = [...notes];
        updatedNotes.unshift(response.data);
        setNotes(updatedNotes);
      }
    );
  }

  function moveNote(indexClicked, direction) {
    let indexSwapped;
    if (direction === "up" && indexClicked !== notes.length - 1) {
      indexSwapped = indexClicked + 1;
    } else if (direction === "down" && indexClicked !== 0) {
      indexSwapped = indexClicked - 1;
    } else {
      return;
    }

    GymDataService.updateData(
      notes[notes.length - 1 - indexClicked]._id,
      indexSwapped,
      "index",
      "notes_order"
    );
    GymDataService.updateData(
      notes[notes.length - 1 - indexSwapped]._id,
      indexClicked,
      "index",
      "notes_order"
    );

    let updatedNotes = [...notes];
    updatedNotes[notes.length - 1 - indexClicked].index = indexSwapped;
    updatedNotes[notes.length - 1 - indexSwapped].index = indexClicked;
    setNotes(updatedNotes);
  }

  function deleteNote(id) {
    if (window.confirm("Do you want to delete this note?")) {
      let notesList = [...notes];
      let noteToDelete = notesList.findIndex((note) => {
        return note._id === id;
      });
      notesList.splice(noteToDelete, 1);
      notesList.forEach((element) => {
        if (element._id > id) {
          GymDataService.updateData(
            element._id,
            element.index--,
            "index",
            selectedOption
          );
        }
      });
      GymDataService.deleteNote(id, selectedOption);
      setNotes(notesList);
    }
  }

  function renderNotes() {
    let notesToRender = notes;
    //Bubble sort
    for (let i = 0; i < notesToRender.length; i++) {
      // Last i elements are already in place
      for (let j = 0; j < notesToRender.length - i - 1; j++) {
        // Checking if the item at present iteration
        // is greater than the next iteration
        if (notesToRender[j].index < notesToRender[j + 1].index) {
          // If the condition is true
          // then swap them
          [notesToRender[j], notesToRender[j + 1]] = [
            notesToRender[j + 1],
            notesToRender[j],
          ];
        }
      }
    }
    return notesToRender.map((note) => (
      <Note
        key={uuid()}
        date={note.date}
        day={selectedOption}
        deleteNote={deleteNote}
        index={note.index}
        moveNoteItem={moveNote}
        id={note._id}
      />
    ));
  }

  useEffect(() => getNotesInfo(), [selectedOption]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="notes-holder">
        {renderNotes()}
        <AddNoteButton handleButtonClick={addNewNote} />
      </div>
    </DndProvider>
  );
}
