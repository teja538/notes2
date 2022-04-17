import "../note-listing/note-listing.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
const NoteListing = () => {
  const [showTextArea, setShowTextArea] = useState(false);
  const [showUpadateBtn, setShowUpdateBtn] = useState(false);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedNote, setSelectedNote] = useState([]);
  const [notesList, setNotesList] = useState([]);

  const titleClickHandler = () => setShowTextArea(true);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("http://localhost:5001/notes");
      setNotesList(data);
    })();
  }, []);

  const saveNote = () => {
    const newNote = {
      id: uuid(),
      title,
      notes,
    };
    axios.post("http://localhost:5001/notes", newNote);
    setShowTextArea(false);
    setTitle("");
    setNotes("");
    setNotesList((prev) => [...prev, newNote]);
  };

  const deleteNote = (note) => {
    axios.post("http://localhost:5001/trashList", note);
    setNotesList(notesList.filter((item) => item.id !== note.id))
    axios.delete(`http://localhost:5001/notes/${note.id}`)
  };
  const archiveNote = (note) => {
    axios.post("http://localhost:5001/archiveList", note);
    setNotesList(notesList.filter((item) => item.id !== note.id))
    axios.delete(`http://localhost:5001/notes/${note.id}`)
  };
  const editNote = (note) => {
    console.log(note)
    setSelectedNote(note);
    setTitle(note.title);
    setNotes(note.notes);
    setShowTextArea(true);
    setShowUpdateBtn(true)
  };
  const updateNote = () => {
    axios.put(`http://localhost:5001/notes/${selectedNote.id}`, {
      id: selectedNote.id,
      title,
      notes,
    });
    setNotesList((prev) =>
      prev.map((n) => (n.id === selectedNote.id ? { ...n, title, notes } : n))
    );
    setSelectedNote(null);
    setTitle("");
    setNotes("");
    setShowUpdateBtn(false);
    setShowTextArea(false);
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
            ></textarea>
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
        {notesList.map((item) => (
          <div className="notes" key={item.id}>
            <div>
              <h2>{item.title}</h2>
              <p>{item.notes}</p>
            </div>

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
                <i
                  className="fa fa-edit"
                  onClick={(e) => editNote(item)}
                ></i>
              </span>
              <span>
                <i className="fa fa-tag" onClick={(e) => editNote(item)}></i>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { NoteListing };
