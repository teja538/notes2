import "../sidenav/sidenav.css";
import {Link} from "react-router-dom"

const SideNav = () =>
{
    return(
        <div className="sideBar">
            <ul>
                <li className="listItem"><Link to="/notelisting" className="no-decoration color-white"> <i className="fa fa-clone"></i> Notes</Link></li>
                <li className="listItem"><Link to="/archive" className="no-decoration color-white"> <i className="fa fa-toggle-down"></i> Archive</Link></li> 
                <li className="listItem"><Link to="/trash" className="no-decoration color-white"><i className="fa fa-trash-o"></i> Trash</Link></li>
                <li className="listItem"><Link to="/trash" className="no-decoration color-white"><i className="fa fa-tag"></i> Labels</Link></li>
            </ul>  
        </div>
    )  
}

export {SideNav}