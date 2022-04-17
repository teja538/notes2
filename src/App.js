import "./App.css";
import { Routes, Route } from "react-router-dom";
import {Archive,Home,Login,NoteListing,SignUp,Trash} from "./pages/index.js"
import {SideNav} from "./components/sidenav/sidenav"

function App() {
  return (
    <div className="mainBlock">
      <div className="sidenav-block">
        <SideNav />
      </div>
      <div className="routes-block">
        <Routes>
          <Route path="/" element={<NoteListing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/notelisting" element={<NoteListing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/trash" element = {<Trash />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
