import { useState } from "react";
export default function SettingsView({ sidebarOpened, toggleSidebar, reset }) {
    // TODO: Accessibility Options: allow ot exit SettingsView with escape
    const [settingsOptions, setSettingsOptions] = useState(0)
    return (
        <div className="settingsShadow" style={{"display": (sidebarOpened ? "block" : "none")}}>
            <div className="settingsView">
                <div className="settingsHeader">
                    <p><b>Settings</b></p>
                    <button onClick={toggleSidebar}>X</button>
                </div>
                <div className="settingsMain">
                    <div className="settingsSelector">
                        <button onClick={() => setSettingsOptions(0)} className={settingsOptions == 0 ? "font-semibold" : "font-normal"}>Preferences</button>
                        <button onClick={() => setSettingsOptions(1)} className={settingsOptions == 1 ? "font-semibold" : "font-normal"}>About Us</button>
                    </div>
                    { /* TODO: a more elaborate settings view tracker */}
                    <div className="settingsOptions">
                        {settingsOptions == 0 ? <Preferences/> : <AboutUs/>}
                    </div>
                </div>
            </div>
        </div>
    );
}

function AboutUs() {
    return (
        <>
            <p>This application, ENGRISH: The Perception of ICT Students Regarding an AI-based Language Learning Software, is designed solely for academic and research purposes only.</p>
            <p>As the study is now finished, any data regarding this application or usages of it after February 2025 is not being collected anymore.</p>
        </>
    )
}

function Preferences() {
    return (
        <>
            <div className="settingsSection">
                <div id="header">
                    <p>Voice</p>
                </div>
                <div id="main-voice">
                    <div>
                        <p>OpenAI Whisper</p>
                        <input type="radio"></input>
                    </div>
                    <div>
                        <p>Google Text-to-Speech</p>
                        <input type="radio"></input>
                    </div>
                </div>
            </div>
            <div className="settingsSection">
                <div id="header">
                    <p>Voice Speed</p>
                </div>
                <div id="main-voicespeed">
                    <input type="range" style={{width: "100%"}}></input>
                </div>
            </div>
        </>
    )
}