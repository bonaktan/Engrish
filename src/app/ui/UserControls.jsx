import useUserControls from "../frontend/useControls";
export default function UserControls({connected}) {
    // handleMicrophone handles everything here
    // di nyo yun sakop pero thats defined in app/frontend/controls.js
    const {isRecording, startRecording, stopRecording, audioBlob} = useUserControls()
    return (
        <div className="user-input flex-grow-0 flex-shrink-0 flex justify-evenly">
            <button className="input-button" onClick={isRecording ? stopRecording : startRecording}>{isRecording ? "Recording" : "Record"}</button>
        </div>
    );
}
