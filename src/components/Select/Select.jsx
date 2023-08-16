import React from "react";
import "./Select.css";

export default class Select extends React.Component {
  constructor(props) {
    super(props);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleOptionChange(e) {
    this.props.onOptionChange(e.target.value);
  }

  render() {
    return (
      <form>
        <label>What day is it:</label>
        <div className="select">
          <select
            name="days"
            id="days"
            value={this.props.selectedOption}
            onChange={this.handleOptionChange}
          >
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
            <option value="sunday">Sunday</option>
          </select>
        </div>
      </form>
    );
  }
}
