"use client";

import { useEffect, useReducer, useState } from "react";

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
        setRecording(false)
    }
    return { recording, startRecording, stopRecording};
}
