import React, { useRef } from "react";
import { v4 as uuid } from "uuid";
import "./Exercise.css";
import Input from "../Input/Input";
import SelectWeight from "../SelectWeight/SelectWeight";
import Checkbox from "../Checkbox/Checkbox";
import DeleteExerciseButton from "../DeleteExerciseButton/DeleteExerciseButton";
import { useDrag, useDrop } from "react-dnd";

export default function Exercise({
  name,
  weight,
  unit,
  reps,
  status,
  handleDataChange,
  id,
  index,
  deleteExercise,
  moveListItem,
}) {
  // useDrag - the list item is draggable
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "item",
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // useDrop - the list item is also a drop area
  const [spec, dropRef] = useDrop({
    accept: "item",
    hover: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

      // if dragging down, continue only when hover is smaller than middle Y
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      // if dragging up, continue only when hover is bigger than middle Y
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      moveListItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));

  function handleExDataChange(data, name) {
    handleDataChange(id, data, name);
  }

  return (
    <div
      className="exercise"
      ref={dragDropRef}
      style={{
        opacity: isDragging ? 0 : 1,
        cursor: "move",
      }}
    >
      <Input
        className="bold"
        value={name}
        name="name"
        id={uuid().slice(0, 8)}
        handleDataChange={handleExDataChange}
      />
      <Input
        value={weight}
        name="weight"
        id={uuid().slice(0, 8)}
        handleDataChange={handleExDataChange}
      />
      <SelectWeight unit={unit} name="unit" id={id} />
      <Input
        value={reps}
        name="reps"
        id={uuid().slice(0, 8)}
        handleDataChange={handleExDataChange}
      />{" "}
      reps
      <Checkbox status={status} name="status" id={id} />
      <DeleteExerciseButton
        deleteExercise={deleteExercise}
      ></DeleteExerciseButton>
    </div>
  );
}
