import useUserControls from "../frontend/useControls";
export default function UserControls() {
    // handleMicrophone handles everything here
    // di nyo yun sakop pero thats defined in app/frontend/controls.js
    const {recording, toggleRecording, startRecording, stopRecording} = useUserControls()
    return (
        <div className="user-input flex-grow-0 flex-shrink-0 flex justify-evenly">
            <button className="input-button" onClick={recording ? stopRecording : startRecording}>{recording ? "Recording" : "Record"}</button>
        </div>
    );
}
