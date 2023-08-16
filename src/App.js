import React from "react";
import "./App.css";
import Select from "./components/Select/Select";
import NotesHolder from "./components/NotesHolder/NotesHolder";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedOption: "monday" };
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleOptionChange(selectedOption) {
    this.setState({ selectedOption: selectedOption });
  }

  render() {
    return (
      <div>
        <h1>GYM NOTES</h1>
        <Select
          selectedOption={this.state.selectedOption}
          onOptionChange={this.handleOptionChange}
        />
        <NotesHolder selectedOption={this.state.selectedOption} />
      </div>
    );
  }
}

/* class ThursdayNote extends React.Component {
  render() {
    return (
      <div className="note">
        <DateComponent date={this.props.date} />
        <RunningExercise speed="6.0" incline="3.5" time="10 min" />
        <Exercise
          name="Squats"
          unit="kg"
          weight="30-40-50-50"
          reps="12-10-6-6"
        />
        <Exercise name="Hip Abductors" unit="lbs" weight="50-55" reps="20-15" />
        <Exercise
          name="Leg extension"
          unit="lbs"
          weight="55-60-65"
          reps="14-12-10"
        />
        <Exercise
          name="Seated Calf Raise"
          unit="kg"
          weight="25-30-35"
          reps="18-15-14"
        />
      </div>
    );
  }
}

class FridayNote extends React.Component {
  render() {
    return (
      <div className="note">
        <DateComponent date={this.props.date} />
        <RunningExercise speed="6.0" incline="3.5" time="10 min" />
        <Exercise
          name="Squats"
          unit="kg"
          weight="30-40-50-50"
          reps="12-10-6-6"
        />
        <Exercise name="Hip Abductors" unit="lbs" weight="50-55" reps="20-15" />
        <Exercise
          name="Leg extension"
          unit="lbs"
          weight="55-60-65"
          reps="14-12-10"
        />
        <Exercise
          name="Seated Calf Raise"
          unit="kg"
          weight="25-30-35"
          reps="18-15-14"
        />
      </div>
    );
  }
} */
