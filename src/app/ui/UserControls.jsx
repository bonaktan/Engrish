import Image from "next/image";
import useUserControls from "../frontend/useControls";
import imageWaveform from "@/../public/sprites/record.svg"
export default function UserControls({connected}) {
    // handleMicrophone handles everything here
    // di nyo yun sakop pero thats defined in app/frontend/controls.js
    const {isRecording, startRecording, stopRecording, audioBlob} = useUserControls()
    return (
        <div className="user-input flex-grow-0 flex-shrink-0 flex">
            <button className={"input-button " + (isRecording ? "bg-red-300" : "bg-[#b2ae9a29]")} onClick={isRecording ? stopRecording : startRecording}>
                <Image src={imageWaveform} alt="Record" id="recordImage"/>
            </button>
        </div>
    );
}
