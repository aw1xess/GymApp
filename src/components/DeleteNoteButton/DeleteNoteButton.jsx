import React from "react";
import "./DeleteNoteButton.css";

export default class DeleteNoteButton extends React.Component {
	constructor(props) {
		super(props);
		this.deleteNote = this.deleteNote.bind(this);
	}

	deleteNote() {
		this.props.handleDeleteNote();
	}

	render() {
		return (
			<button className="deleteNote-button" onClick={this.deleteNote}>
				<img
					src={require("../../assets/images/trash.png")}
					alt="Delete Note"
				/>
			</button>
		);
	}
}
