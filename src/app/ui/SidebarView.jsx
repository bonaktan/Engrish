export default function SidebarView({ open, toggleSidebar }) {
    // dito ka magtrabaho sa design and technicals, if need ng tulong sa js call me
    return (
        <div className={"sideBar " + (open ? "flex" : "hidden")}>
            <br />
            <div className="optionBar">
                <p>Voice</p>
                <hr />
                <div className="voice-options">
                    <div className="voice-option">
                        <p>pyttsx3 (offline)</p>
                        <input type="radio" name="voice" />
                    </div>
                    <div className="voice-option">
                        <p>gTTS (online)</p>
                        <input type="radio" name="voice" />
                    </div>
                </div>
            </div>
            <div className="optionBar">
                <p>Voice Speed</p>
                <hr />
                <div className="slider-container">
                    <div className="slider">
                        <span className="icon">🐌</span>
                        <input type="range" min="1" max="5" value="3" readOnly className="slider" />
                        <span className="icon">🐇</span>
                    </div>
                    <p style={{fontSize: "0.75rem"}}>Toggle the slider to adjust the voice speed.</p> {/* font-size: 10px*/}
                </div>
            </div>
            <div className="emptyBar"></div>
            <div className="about">
                <p>About Us:</p>
                <hr />
                <div className="explanations">
                    <p>
                        This application, ENGRISH: The Perception of ICT Students Regarding an AI-Based Language Learning Software, is designed solely for
                        academic and research purposes. The data collected will be used to analyze user perceptions and experiences with AI-based language
                        learning tools.
                    </p>
                </div>
            </div>
        </div>
    );
}
