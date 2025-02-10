import Image from "next/image";
import imageEngrishHeader from "@/../public/sprites/header_engrish.svg";
import imageOptionsHeader from "@/../public/sprites/hamburg.svg";
export default function Header({ toggleSidebar }) {
    const version = "1.0.0";
    return (
        <div className="header">
            <button className="menu" onClick={toggleSidebar}>
                <Image id="engrishHeader" src={imageOptionsHeader} alt="ENGRISH" />
            </button>
            <div className="">
                <Image id="engrishHeader" src={imageEngrishHeader} alt="ENGRISH" />
            </div>
        </div>
    );
}
