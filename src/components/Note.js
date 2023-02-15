import React from "react";
import "./Note.css";

function Note(props) {
    const date = new Date(props.note.updatedAt);
    const padTo2Digits = (num) => {
        return String(num).padStart(2, "0");
    };

    return (
        <div
            className="note"
            onClick={() => {
                props.handleClick();
                props.setEditID(props.id);
            }}
        >
            <h3 className="note-title"> {props.note.noteTitle} </h3>
            <p className="note-body"> {props.note.noteBody} </p>
            <div className="note-footer">
                <div className="note-create-time">
                    {padTo2Digits(date.getHours()) +
                        ":" +
                        padTo2Digits(date.getMinutes())}{" "}
                </div>
                <div className="note-created-date"> {date.toDateString()} </div>
            </div>
        </div>
    );
}

export default Note;
