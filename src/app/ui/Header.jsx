export default function Header() {
    const version = "0.2.0"
    return (
        <div className="text-center header flex justify-evenly items-center">
            <div><ion-icon name="menu-outline" size="large"></ion-icon></div>
            <div>
                <h1>Engrish - Development</h1>
                <p>Ver. {version}</p>
                {/* <i class="fa-solid fa-wave-square"></i> add wave*/}
            </div>
           <p></p>
        </div>
    )
}

