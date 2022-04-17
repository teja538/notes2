import "../note-listing/note-listing.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFilterSort } from "../../context/filterSortContext";

import { v4 as uuid } from "uuid";
const NoteListing = () => {

  const [showTextArea, setShowTextArea] = useState(false);
  const [showUpadateBtn, setShowUpdateBtn] = useState(false);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedNote, setSelectedNote] = useState([]);
  const [notesList, setNotesList] = useState([]);
  const [showColors, setShowColors] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");

  const titleClickHandler = () => setShowTextArea(true);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("http://localhost:5001/notes");
      setNotesList(data);
    })();
  }, []);

  const {fsState} = useFilterSort();
  const sortedNotesList = (notesList,fsState) =>
  {
    console.log(fsState)
    if(fsState.sortBy === "date")
    {
      console.log("date sort")
      return notesList.sort((item1,item2) => item1.createdOn-item2.createdOn)
    }
    else return notesList
  }
  let finalNotesList = sortedNotesList(notesList,fsState)

  const saveNote = () => {
    const newNote = {
      id: uuid(),
      title,
      notes,
      backgroundColor,
      label: "",
      createdOn: new Date().toLocaleString() + "",
    };
    axios.post("http://localhost:5001/notes", newNote);
    setShowTextArea(false);
    setTitle("");
    setNotes("");
    setBackgroundColor("");
    setNotesList((prev) => [...prev, newNote]);
  };

  const deleteNote = (note) => {
    axios.post("http://localhost:5001/trashList", note);
    setNotesList(notesList.filter((item) => item.id !== note.id));
    axios.delete(`http://localhost:5001/notes/${note.id}`);
  };
  const archiveNote = (note) => {
    axios.post("http://localhost:5001/archiveList", note);
    setNotesList(notesList.filter((item) => item.id !== note.id));
    axios.delete(`http://localhost:5001/notes/${note.id}`);
  };
  const editNote = (note) => {
    console.log(note);
    setSelectedNote(note);
    setTitle(note.title);
    setNotes(note.notes);
    setBackgroundColor(note.backgroundColor);
    setShowTextArea(true);
    setShowUpdateBtn(true);
    setShowColors(true);
  };
  const updateNote = () => {
    axios.put(`http://localhost:5001/notes/${selectedNote.id}`, {
      id: selectedNote.id,
      title,
      notes,
      backgroundColor: backgroundColor,
    });
    setNotesList((prev) =>
      prev.map((n) =>
        n.id === selectedNote.id ? { ...n, title, notes, backgroundColor } : n
      )
    );
    setSelectedNote(null);
    setTitle("");
    setNotes("");
    setShowUpdateBtn(false);
    setShowTextArea(false);
    setShowColors(false);
  };

  const colorNote = (note) => {
    setShowColors(true);
  };

  return (
    <div>
      <h1 className="center-text">My-Notes</h1>
      <form>
        <input
          type="text"
          className="form-title"
          placeholder="Title"
          value={title}
          onClick={(e) => {
            titleClickHandler();
          }}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        {showTextArea ? (
          <div>
            <textarea
              rows={5}
              className="notes-textarea"
              placeholder="make a note here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{ backgroundColor: backgroundColor }}
            ></textarea>

            <span>
              <i className="	fa fa-paint-brush" onClick={(e) => colorNote()}></i>
            </span>
            {showColors && (
              <div className="color-block">
                <div
                  className="color-round"
                  style={{ backgroundColor: "#ccff90" }}
                  onClick={() => setBackgroundColor("#ccff90")}
                ></div>
                <div
                  className="color-round"
                  style={{ backgroundColor: "#fff475" }}
                  onClick={() => setBackgroundColor("#fff475")}
                ></div>
                <div
                  className="color-round"
                  style={{ backgroundColor: "#fdcfe8" }}
                  onClick={() => setBackgroundColor("#fdcfe8")}
                ></div>
                <div
                  className="color-round"
                  style={{ backgroundColor: "#d7aefb" }}
                  onClick={() => setBackgroundColor("#d7aefb")}
                ></div>
                <div
                  className="color-round"
                  style={{ backgroundColor: "#59657a" }}
                  onClick={() => setBackgroundColor("#59657a")}
                ></div>
              </div>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </form>

      {showTextArea && title !== "" && !showUpadateBtn && (
        <button className="save-btn" onClick={saveNote}>
          Save
        </button>
      )}
      {showUpadateBtn && (
        <button className="save-btn" onClick={updateNote}>
          update
        </button>
      )}

      <div className="notes-list">
        {finalNotesList.map((item) => (
          <div
            className="notes"
            key={item.id}
            style={{ backgroundColor: item.backgroundColor }}
          >
            <div>
              <h2>{item.title}</h2>
              <p>{item.notes}</p>
            </div>
            <div>
              <p className="timeStamp">{item.createdOn}</p>
              <div className="note-footer">
                <span>
                  <i
                    className="fa fa-trash"
                    onClick={(e) => deleteNote(item)}
                  ></i>
                </span>
                <span>
                  <i
                    className="fa fa-toggle-down"
                    onClick={(e) => archiveNote(item)}
                  ></i>
                </span>
                <span>
                  <i className="fa fa-edit" onClick={(e) => editNote(item)}></i>
                </span>
                <span>
                  <i className="fa fa-tag" onClick={(e) => editNote(item)}></i>
                </span>
                <span>
                  <i
                    className="fa fa-paint-brush"
                    onClick={(e) => editNote(item)}
                  ></i>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { NoteListing };
