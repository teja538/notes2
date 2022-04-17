import { useEffect, useState } from "react";
import axios from "axios";

const Archive = () => {
  const [archiveList, setArchiveList] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("http://localhost:5001/archiveList");
      console.log(data);
      setArchiveList(data);
    })();
  }, []);

  const unArchiveNote = (note) =>{
    axios.post("http://localhost:5001/notes",note);
    setArchiveList(archiveList.filter((item) => item.id !== note.id))
    axios.delete(`http://localhost:5001/archiveList/${note.id}`)
  } 
  return (
    <div>
      <h1 className="center-text">Archived Notes({archiveList.length})</h1>
      <div className="notes-list">
        {archiveList.map((item) => (
          <div className="notes" key={item.id}>
            <div>
              <h2>{item.title}</h2>
              <p>{item.notes}</p>
            </div>
            <div className="note-footer">
              <span>
                <i
                  className="fa fa-toggle-up"
                  onClick={(e) => unArchiveNote(item)}
                > un-archive</i>
              </span>
            </div>
          </div>
          
        ))}
      </div>

    </div>
  );
};

export { Archive };
