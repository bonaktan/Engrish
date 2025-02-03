"use client";
import { useState, useReducer } from "react";
import speechToText from "../backend/speechtotext";
import { Message } from "../backend/structures";
import { io } from "socket.io-client";

const socket = io("http://localhost:8765");

export default function useConversation() {
    const [convo, addConvo] = useReducer(updateConvo, [new Message("ai", "good morning! i am engrish, a pre-programmed something kinemerut, kausapin mo kooo")]);
    const [correction, setCorrection] = useState("-");
    async function handleAddConvo(e) {
        // entrypoint of the convo loop, initiated in app/ui/UserControls.jsx
        e.preventDefault();
        const userInput = "wala pa kong audio input functionality here, kunwari nagsalita ako ng ganto"; // TODO: audio component
        addConvo({sender: "user", message: userInput}); // calls updateConvo()
        // var { grammarFeedback, llmGeneration } 
        await startGeneration(userInput); // TODO: Refactor
        // setCorrection(grammarFeedback.output);
        // addConvo({sender: "ai", message: llmGeneration.output});
        // TODO: play the audio output that llmGeneration.audio gives
    }
    return { convo, correction, handleAddConvo, setCorrection};
}

function updateConvo(convo, message) {
    return [...convo, new Message(message.sender, message.message)]; // WARN: no data processing is done
}


async function startGeneration(userInput) {
    socket.emit("user_input", userInput)
    console.log("sent")
}