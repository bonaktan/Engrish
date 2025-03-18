import Image from "next/image";
import imageEngrishHeader from "@/../public/sprites/header_engrish.svg";
import imageOptionsHeader from "@/../public/sprites/hamburg.svg";
import { RiResetLeftFill } from "react-icons/ri";
import { MdDarkMode } from "react-icons/md";
import { PiLightningLight } from "react-icons/pi";
import darkModeHeader from "@/../public/sprites/DarkMode.png";
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
                <button>
                    <RiResetLeftFill id="sprite"/>
                </button>
                <button>
                    <MdDarkMode id="sprite"/>
                </button>
                <button className="flex gap-2 items-center">
                    <PiLightningLight id="sprite"/>
                    <p className="pr-2">Data Saver</p>
                </button>
            </div>
        </div>
    );
}
