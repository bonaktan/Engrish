import Image from 'next/image'
import imageEngrishHeader from "@/../public/sprites/header_engrish.svg"
export default function Header({ toggleSidebar }) {
    const version = "1.0.0";
    return (
        <div className="header">
            <button className="menu" onClick={toggleSidebar}>
                Sidebar
            </button>
            <div className="">
              <Image id="engrishHeader" src={imageEngrishHeader} alt="ENGRISH"/>
            </div>
        </div>
    );
}
