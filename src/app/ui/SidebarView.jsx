export default function SidebarView({ open, toggleSidebar }) {
    // dito ka magtrabaho sa design and technicals, if need ng tulong sa js call me
    return (
        <div className={"sideBar " + (open ? "flex" : "hidden")}>
            <div className="sidebarHeader">
                <button id="button" onClick={toggleSidebar}>X</button>
                <p id="engrish">
                    <b>ENGRISH</b>
                </p>
            </div>
            <div className="sidebarOptions">
                <div className="option" id="optionTTSEngine">
                    <p>Text-to-Speech Engine</p>
                    <div className="selection">
                        <label id="pyttsx3">
                            pyttsx3 <input type="radio" />
                        </label>
                        <label id="gtts">
                            gtts <input type="radio" />
                        </label>
                    </div>
                </div>
                <div className="option" id="optionAIVoice">
                    <p>
                        <label>
                            AI Voice <input type="checkbox" id="checkbox" />
                        </label>
                    </p>
                </div>
            </div>
            <div className="aboutUs">
                <hr />
                <div>About Us</div>
                <p>ENGRISH: An AI-Assisted Language Learning Software in Enhancing ICT Students&apos; English Conversational Skill</p>
                <p> Practical Research Group 2</p>
                <p>12-ICT Bill Gates</p>
            </div>
        </div>
    );
}
