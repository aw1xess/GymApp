import React from "react";
import "../Note.css";
import DateComponent from "../../DateComponent/DateComponent";
import Exercise from "../../Exercise/Exercise";

export default class TuesdayNote extends React.Component {
  render() {
    return (
      <div className="note">
        <DateComponent date={this.props.date} />
        <Exercise
          name="Bench Press"
          unit="kg"
          weight="10-20-30-40"
          reps="12-12-10-5"
        />{" "}
        <Exercise
          name="Dumbbell Military Press"
          unit="kg"
          weight="30-40-50-50"
          reps="12-10-6-6"
        />
        <Exercise name="Hip Abductors" unit="lbs" weight="50-55" reps="20-15" />
        <Exercise
          name="Dumbbell Arm Raises"
          unit="lbs"
          weight="55-60-65"
          reps="14-12-10"
        />
        <Exercise
          name="Tricep Extensions"
          unit="kg"
          weight="25-30-35"
          reps="18-15-14"
        />
        <Exercise
          name="Жим вверх в тренажері(на куті біля бігових доріжок)"
          unit="kg"
          weight="10-20-20"
          reps="12-10-7"
        />
        <Exercise
          name="Tricep Extensions"
          unit="kg"
          weight="20-20-25"
          reps="14-12-10"
        />
      </div>
    );
  }
}
