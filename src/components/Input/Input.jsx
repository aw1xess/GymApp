import React from "react";
import "./Input.css";

export default class Input extends React.Component {
	constructor(props) {
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleDataChange = this.handleDataChange.bind(this);
		this.state = { value: this.props.value };
	}

	handleInputChange(e) {
		this.setState({ value: e.target.value });
		e.target.style.width = e.target.value.length + 1 + "ch";
	}

	resizeInput() {
		const span = document.getElementById(this.props.id + 1);
		const input = document.getElementById(this.props.id);
		const spanWidth = span.offsetWidth + 1 + "px";
		input.style.width = spanWidth;
	}

	componentDidMount() {
		this.resizeInput();
	}

	handleDataChange() {
		if (this.state.previousValue !== this.state.value) {
			if (this.props.name === "date") {
				this.props.handleDateChange(
					this.state.previousValue,
					this.state.value
				);
				console.log(this.state.previousValue, this.state.value);
			} else {
				this.props.handleDataChange(
					this.state.value.replace(":", ""),
					this.props.name
				);
			}
		}
	}

	render() {
		return (
			<div className="input-container">
				<input
					id={this.props.id}
					className="input"
					value={this.state.value}
					onChange={this.handleInputChange}
					onBlur={(e) => {
						this.handleDataChange();
						e.target.style.display = "none";
						const span = document.getElementById(this.props.id + 1);
						span.style.display = "inline-block";
						this.resizeInput();
					}}
					onFocus={() => {
						this.setState({ previousValue: this.state.value });
					}}
				></input>
				<span
					className="input-display"
					id={this.props.id + 1}
					onClick={(e) => {
						e.target.style.display = "none";
						const input = document.getElementById(this.props.id);
						input.style.display = "inline-block";
						input.focus();
						input.style.width = input.value.length + 1 + "ch";
					}}
				>
					{this.state.value}
				</span>
			</div>
		);
	}
}
