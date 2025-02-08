export default function Header({toggleSidebar}) {
  const version = "1.0.0";
  return (
    <div className="text-center header flex justify-evenly items-center flex-grow-0 flex-shrink-0">
      <button className="menu" onClick={toggleSidebar}>Sidebar</button>
      <div>
        <h1 className="text-xl">Engrish</h1>
        <p>Ver. {version}</p>
      </div>
      <div>{/* TODO: history */}</div>
    </div>
  );
}
