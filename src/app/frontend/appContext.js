"use client";
import { useState, useReducer, useEffect } from "react";
import { Message } from "../backend/structures";
import { io } from "socket.io-client";


export default function useConversation() {
    const [convo, addConvo] = useReducer(updateConvo, [new Message("ai", "testing Engrish if the components are properly linked to each other - useConversation()")]);
    const [correction, setCorrection] = useState("-");
    const [latestMessage, setLatestMessage] = useState("")
    async function handleAddConvo(e) {
        // entrypoint of the convo loop, initiated in app/ui/UserControls.jsx
        e.preventDefault();

        setLatestMessage("wala pa kong audio functionality here, kunwari nagsalita ako ng ganto - useConversation()"); // TODO: audio component
        addConvo({ sender: "user", message: latestMessage }); // calls updateConvo()
        var { grammarFeedback, llmGeneration } = await correctionLoop(latestMessage);

        setCorrection(grammarFeedback);
        addConvo({ sender: "ai", message: llmGeneration });
        // TODO: play the audio output that llmGeneration.audio gives
    }
    useEffect(() => {
        // Create a socket connection
        const socket = io("ws://localhost:8765");

        // Listen for incoming messages
        socket.on('message', (message) => {
            addConvo({sender: "ai", message: message})
        });

        // Clean up the socket connection on unmount
        return () => socket.disconnect();
    }, []);
    return { convo, correction, handleAddConvo, setCorrection };
}

function updateConvo(convo, message) {

    return [...convo, new Message(message.sender, message.message)]; // WARN: no data processing is done
}

async function correctionLoop(userInput) {
    // use socket.io please
    return {grammarFeedback: "test", llmGeneration: "test"}
}