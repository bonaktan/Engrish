import Image from "next/image";
import imageWaveform from "@/../public/sprites/record.svg"
import { EngrishContext } from "../frontend/useEngrish";
import { useContext } from "react";
export default function UserControls() {
    const { connected, isRecording, startRecording, stopRecording, audioBlob} = useContext(EngrishContext)
    // handleMicrophone handles everything here
    // di nyo yun sakop pero thats defined in app/frontend/controls.js
    return (
        <div className="user-input flex-grow-0 flex-shrink-0 flex">
            <button className={"input-button " + (isRecording ? "bg-red-300" : "bg-[#b2ae9a29]")} onClick={isRecording ? stopRecording : startRecording}>
                <Image src={imageWaveform} alt="Record" id="recordImage"/>
            </button>
        </div>
    );
}
