export default function SidebarView({ open }) {
    // dito ka magtrabaho sa design and technicals, if need ng tulong sa js call me
    return (
        <div className={"sideBar " + (open ? "flex" : "hidden")}>
            <div className="sidebarHeader">
                <p>ENGRISH</p>
                <button>X</button>
            </div>
            <div className="sidebarOptions">
                <div className="option" id="optionTTSEngine">
                    <p>Text-to-Speech Engine</p>
                    <div className="selection">
                        <label>pyttsx3 <input type="radio"/></label>
                        <label>gtts <input type="radio"/></label>
                    </div>
                </div>
                <div className="option" id="optionAIVoice">
                    <p><label>AI Voice <input type="checkbox"/></label></p>
                </div>
            </div>
            <div className="aboutUs">
                <div>About Us</div>
            </div>
        </div>
    );
}
