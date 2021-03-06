import { useEffect, useState } from "react";
import axios from "axios";

const Trash = () => {
  const [trashList, setTrashList] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("http://localhost:5001/trashList");
      console.log(data);
      setTrashList(data);
    })();
  }, []);

  const deleteNote = (note) =>{
    setTrashList(trashList.filter((item) => item.id !== note.id))
    axios.delete(`http://localhost:5001/trashList/${note.id}`)
  }
  return (
    <div>
      <h1 className="center-text">Trash({trashList.length})</h1>
      <div className="notes-list">
        {trashList.map((item) => (
          <div className="notes" key={item.id} style={{"backgroundColor":item.backgroundColor}}>
            <div>
              <h2 className="card-title">{item.title}</h2>
              <span className="sel-label"><i className="fa fa-tag"></i> {item.label}</span>
              <p>{item.notes}</p>
            </div>
            <div className="note-footer">
              <span>
                <i
                  className="fa fa-trash"
                  onClick={(e) => deleteNote(item)}
                > delete-permanently</i>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Trash };
