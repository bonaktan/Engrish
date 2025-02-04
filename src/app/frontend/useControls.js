"use client";

import { useEffect, useReducer, useState } from "react";
import { socket } from "./useConversation";
export default function useUserControls() {
    // RESPONSIBILITY: control UserControls
    const [recording, setRecording] = useState(false);
    var audio = null
    function startRecording() {
        console.log("start")
        // START: recording of voices
        setRecording(true)
    }
    function stopRecording() {
        console.log("stop")
        // STOP: recording of voices
        socket.emit("user_input", "test") // TODO: to be replaced w/ user mic input
        setRecording(false)
    }
    return { recording, startRecording, stopRecording};
}
