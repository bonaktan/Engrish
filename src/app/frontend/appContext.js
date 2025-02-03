"use client";
import { useState, useReducer } from "react";
import speechToText from "../backend/speechtotext";
import { Message } from "../backend/structures";

export default function useConversation() {
    const [convo, addConvo] = useReducer(updateConvo, [new Message("ai", "testing Engrish if the components are properly linked to each other - useConversation()")]);
    const [correction, setCorrection] = useState("-");
    async function handleAddConvo(e) {
        // entrypoint of the convo loop, initiated in app/ui/UserControls.jsx
        e.preventDefault();
        let stream;
        let recorder;

        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        recorder = new MediaRecorder(stream);


        stopMicrophoneButton.addEventListener("click", () => {
            // Stop the stream.
            stream.getTracks().forEach(track => track.stop());
        });

        startRecordButton.addEventListener("click", async () => {
            // For the sake of more legible code, this sample only uses the
            // `showSaveFilePicker()` method. In production, you need to
            // cater for browsers that don't support this method, as
            // outlined in https://web.dev/patterns/files/save-a-file/.

            // Prompt the user to choose where to save the recording file.
            const suggestedName = "microphone-recording.webm";
            const handle = await window.showSaveFilePicker({ suggestedName });
            const writable = await handle.createWritable();

            // Start recording.
            recorder.start();
            recorder.addEventListener("dataavailable", async (event) => {
                // Write chunks to the file.
                await writable.write(event.data);
                if (recorder.state === "inactive") {
                    // Close the file when the recording stops.
                    await writable.close();
                }
            });
        });

        stopRecordButton.addEventListener("click", () => {
            // Stop the recording.
            recorder.stop();
        });
        // TODO: play the audio output that llmGeneration.audio gives
    }
    return { convo, correction, handleAddConvo, setCorrection };
}

function updateConvo(convo, message) {

    return [...convo, new Message(message.sender, message.message)]; // WARN: no data processing is done
}
