import Image from "next/image";
import imageEngrishHeader from "@/../public/sprites/header_engrish.svg";
import imageOptionsHeader from "@/../public/sprites/hamburg.svg";
export default function Header({ toggleSidebar }) {
    const version = "1.0.0";
    return (
        <div className="header">
            <div className="head">
                <button className="menu" onClick={toggleSidebar}>
                    <Image id="engrishHeader" src={imageOptionsHeader} alt="ENGRISH" />
                </button>
                <div>
                    <Image id="engrishHeader" src={imageEngrishHeader} alt="ENGRISH" />
                </div>
            </div>
            <div className="interactives">
                <button>Reset</button>
                <button>Data Saver</button>
            </div>
        </div>
    );
}
