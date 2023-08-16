import React from "react";
import "./Checkbox.css";
import GymDataService from "../../services/api";

export default class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      status: this.props.status,
      checked: this.props.status === "done" ? true : false,
    };
  }

  onChange() {
    if (this.state.status === "undone") {
      this.setState({
        status: "done",
        checked: true,
      });
    } else {
      this.setState({
        status: "undone",
        checked: false,
      });
    }
  }

  componentDidUpdate() {
    GymDataService.updateData(
      this.props.id,
      this.state.status,
      this.props.name
    );
  }

  render() {
    if (this.props.status === "done") {
      return (
        <input
          className="checkbox"
          type="checkbox"
          name="checkbox"
          checked={this.state.checked}
          onChange={this.onChange}
        />
      );
    }
    return (
      <input
        className="checkbox"
        type="checkbox"
        name="checkbox"
        checked={this.state.checked}
        onChange={this.onChange}
      />
    );
  }
}
