import React from "react";
import "./SelectWeight.css";
import GymDataService from "../../services/api";

export default class SelectWeight extends React.Component {
  constructor(props) {
    super(props);
    this.state = { unit: this.props.unit };
    this.handleUnitChange = this.handleUnitChange.bind(this);
  }

  handleUnitChange(e) {
    this.setState({ unit: e.target.value });
  }

  componentDidUpdate() {
    GymDataService.updateData(this.props.id, this.state.unit, this.props.name);
  }

  render() {
    return (
      <div className="select select-weight">
        <select value={this.state.unit} onChange={this.handleUnitChange}>
          <option value="kg">kg</option>
          <option value="lbs">lbs</option>
        </select>
      </div>
    );
  }
}
