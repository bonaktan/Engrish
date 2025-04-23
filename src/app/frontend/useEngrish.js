"use client"
import { createContext, useEffect, useReducer, useRef, useState } from "react"
import { Message } from "../backend/structures";

export const EngrishContext = createContext(null)


export const EngrishProvider = ({children}) => {
    const [sidebarOpened, toggleSidebar] = useReducer((state) => {
        console.log("toggle");
        return !state;
    }, false);
    const [correction, setCorrection] = useState("-");
    const [connected, setConnected] = useState(false)
    const [convo, addConvo] = useReducer((convo, message) => {
        if (message == "resetConvesationPlease4124") {
            return []
        }
        return [...convo, new Message(message.sender, message.message)];
    }, []);

    function reset() {
        addConvo("resetConvesationPlease4124")
    }
    
    // RESPONSIBILITY: control UserControls
    const [isRecording, setIsRecording] = useState(false);
    const [audioStream, setAudioStream] = useState(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const timerRef = useRef(null);
    const RECORDING_MAX_DURATION = 240; // 4 minutes in seconds
    var audio = null;
    // source: https://gist.github.com/cassidoo/dd1190c248d60c723de14fe9ee32f450

    // BUG?: it enables the mic as soon as the page is open
    // enables the mediastream in the first place
    useEffect(() => {
        if (!audioStream) {
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then((stream) => {
                    setAudioStream(stream);
                    const mediaRecorder = new MediaRecorder(stream);
                    setMediaRecorder(mediaRecorder);
                    let audio;

                    mediaRecorder.ondataavailable = (event) => {
                        if (event.data.size > 0) {
                            audio = [event.data];
                        }
                    };

                    mediaRecorder.onstop = (event) => {
                        // PROBLEM: on some devices, recording on pcm-wav is not supported
                        const b = new Blob(audio, { type: "audio/wav;codecs=0" });
                        // setAudioBlob(b)
                        var reader = new window.FileReader();
                        reader.readAsDataURL(b);
                        reader.onloadend = function () {
                            var base64 = reader.result;
                            base64 = base64.split(",")[1];
                            setAudioBlob(base64);
                        };
                    };
                })
                .catch((error) => {
                    console.error("Error accessing microphone:", error);
                });
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [audioStream]);

    function startRecording() {
        mediaRecorder.start();
        setIsRecording(true);
        setRecordingTime(0);
        setAudioBlob(null);
        // 	timerRef.current = setInterval(() => {
        // 		setRecordingTime((prevTime) => {
        // 			if (prevTime >= RECORDING_MAX_DURATION - 1) {
        // 				stopRecording();
        // 				return RECORDING_MAX_DURATION;
        // 			}
        // 			return prevTime + 1;
        // 		});
        // 	}, 1000);
    }
    function stopRecording() {
        console.log("stop");
        // STOP: recording of voices
        mediaRecorder.stop();
        setIsRecording(false);
        // if (timerRef.current) {
        // 	clearInterval(timerRef.current);
        // }

    }
    // wait until blob changes
    // bug: it triggers on first load
    return (
        <EngrishContext.Provider value={{
            convo, correction, connected, reset,
            isRecording, startRecording, stopRecording,
            sidebarOpened, toggleSidebar
        }}>
            {children}
        </EngrishContext.Provider>
    )
}