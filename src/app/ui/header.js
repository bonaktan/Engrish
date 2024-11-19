export default function Header() {
    return (<div className="flex flex-row justify-evenly h-10 items-center">
        <div className="">
            <button>Menu</button>
        </div>
        <div className="user-programname">
            <p className="text-xl">ENGRISH</p>
        </div>
        <div className="user-unknown">
            <button>Audio?</button>
        </div>
    </div>)
}