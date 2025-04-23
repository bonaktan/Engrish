"use client"
import { createContext, useEffect, useReducer, useRef, useState } from "react"
import { Message } from "../backend/structures";
import { io } from "socket.io-client";

export const EngrishContext = createContext(null)
export const socket = io("http://localhost:8766")

export const EngrishProvider = ({children}) => {
    const [sidebarOpened, toggleSidebar] = useReducer((state) => {
        console.log("toggle");
        return !state;
    }, true);
    const [correction, setCorrection] = useState("-");
    const [connected, setConnected] = useState(socket.connected)
    const [convo, addConvo] = useReducer((convo, message) => {
        if (message == "resetConvesationPlease4124") {
            return []
        }
        return [...convo, new Message(message.sender, message.message)];
    }, []);

    function reset() {
        addConvo("resetConvesationPlease4124")
        socket.emit("reset")
    }
    useEffect(() => {
        function onConnect() {
            setConnected(true)
        }
        function onDisconnect() {
            setConnected(false)
        }
        function onGrammarChecker(correction) {
            setCorrection(correction)
        }
        function onLLMOutput(output) {
            addConvo(new Message("ai", output))
        }
        function onSTTOutput(output) {
            addConvo(new Message("user", output))
        }
    
        socket.on("connect", onConnect)
        socket.on("disconnect", onDisconnect)
        socket.on("grammar_check", onGrammarChecker)
        socket.on("llm_output", onLLMOutput)
        socket.on("stt_output", onSTTOutput)

        return () => {
            socket.off("connect", onConnect)
            socket.off("disconnect", onDisconnect)
            socket.off("grammar_check", onGrammarChecker)
            socket.off("llm_output", onLLMOutput)
            socket.off("stt_output", onSTTOutput)
        }
    })

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
        console.log("start");
        // START: recording of voices
        // PLAN: record voice, encode it to a binary object, transmit, decode, and do processing shits
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
    useEffect(() => {
        console.log(audioBlob);
        socket.emit("user_input", audioBlob); // TODO: to be replaced w/ user mic input
    }, [audioBlob]);
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