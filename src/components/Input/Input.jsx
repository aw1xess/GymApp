import React from "react";
import "./Input.css";

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.resizeInput = this.resizeInput.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
    this.state = { value: this.props.value };
  }

  handleInputChange(e) {
    this.setState({ value: e.target.value });
    if (this.props.className === "bold") {
      e.target.style.width =
        e.target.value.replace(/ /g, "").length * 0.9 + "ch";
    } else {
      e.target.style.width = e.target.value.length + "ch";
    }
  }

  resizeInput(input) {
    if (this.props.className === "bold") {
      //TO-DO
      //Зробить декілька if, які дивляться, яка довжина текста, і в залежності від цього множать
      //значення довжини на якийсь коефіцієнт(чи довше текст тим менше коефіцієнт)
      input.style.width = input.value.replace(/ /g, "").length * 0.9 + "ch";
    } else {
      input.style.width = input.value.length + "ch";
    }
  }

  handleDataChange() {
    if (this.state.previousValue !== this.state.value) {
      if (this.props.name === "date") {
        this.props.handleDateChange(this.state.previousValue, this.state.value);
        console.log(this.state.previousValue, this.state.value);
      } else {
        this.props.handleDataChange(
          this.state.value.replace(":", ""),
          this.props.name
        );
      }
    }
  }

  componentDidMount() {
    let input = document.getElementById(this.props.id);
    this.resizeInput(input);
  }

  render() {
    if (this.props.className === "bold") {
      return (
        <input
          id={this.props.id}
          className="input bold"
          value={this.state.value}
          onChange={this.handleInputChange}
          onBlur={this.handleDataChange}
          onFocus={() => {
            this.setState({ previousValue: this.state.value });
          }}
        ></input>
      );
    }
    return (
      <input
        id={this.props.id}
        className="input"
        value={this.state.value}
        onChange={this.handleInputChange}
        onBlur={this.handleDataChange}
        onFocus={() => {
          this.setState({ previousValue: this.state.value });
        }}
      ></input>
    );
  }
}
