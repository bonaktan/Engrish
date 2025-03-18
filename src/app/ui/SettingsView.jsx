export default function SettingsView({ open, toggleSidebar, reset }) {
    // dito ka magtrabaho sa design and technicals, if need ng tulong sa js call me
    return (
        <div className="settingsShadow" style={{"display": open ? "initial" : "hidden"}}>
            <div className="settingsView">
                <p>pagod na ko mag program putangina tulong :D</p>
                
            </div>
        </div>
    );
}
