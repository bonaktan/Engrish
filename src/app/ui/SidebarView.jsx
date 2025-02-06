export default function SidebarView({open}) {
  // dito ka magtrabaho sa design and technicals, if need ng tulong sa js call me
  return (
    <div className={"sideBar " + (open ? "block" : "hidden")}>
      <div className="sidebarAccess">
        <ul>
          <li>
            <a href="#about">About Us</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
