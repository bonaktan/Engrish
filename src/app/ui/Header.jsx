export default function Header() {
    const version = "0.2.0"
    return (
        <div className="text-center header flex justify-evenly items-center flex-grow-0 flex-shrink-0">
            <div>
                <button>Sidebar</button>
            </div>
            <div>
                <h1 className="text-xl">Engrish - Development</h1>
                <p>Ver. {version}</p>
            </div>
           <div>{/* TODO: history */}</div>
        </div>
    )
}

