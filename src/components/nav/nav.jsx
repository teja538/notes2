import "./nav.css";
import { useFilterSort } from "../../context/filterSortContext";
const Nav = () => {
    const {fsDispatch} = useFilterSort()
  return (
    <div class="basic-navbar">
      <div class="nav-brand">Brand</div>
      <div class="nav-search">
        <input type="text" class="inp-search" placeholder="search something" />
      </div>
      <ul class="list-non-bullet">
        <li class="nav-item list-item-inline">
          <span>filter1</span>
        </li>
        <li class="nav-item list-item-inline">
          <span onClick = {() => fsDispatch({type:"SORT-BY-DATE"})} className="sort">Sort By Date</span>
        </li>
      </ul>
    </div>
  );
};

export { Nav };
