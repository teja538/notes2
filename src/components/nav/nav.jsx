const Nav = () =>
{
    return(
        <div class="basic-navbar">
    <div class="nav-brand">Brand</div>
    <div class="nav-search">
        <input type="text" class="inp-search" placeholder="search something" />
    </div> 
    <ul class="list-non-bullet">
        <li class="nav-item list-item-inline"><a href="" class="no-decoration color-white">item1</a></li>
        <li class="nav-item list-item-inline"><a href="" class="no-decoration color-white">item2</a></li>
    </ul>
</div>
    )
}

export {Nav}