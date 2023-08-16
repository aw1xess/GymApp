import React from "react";
import "./AddNoteButton.css";

export default class AddNoteButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    this.props.handleButtonClick();
  }

  render() {
    return <a className="addNote-button" onClick={this.handleButtonClick}></a>;
  }
}
