"use client";
import { useState, useReducer, useEffect } from "react";
import speechToText from "../backend/speechtotext";
import { Message } from "../backend/structures";
import { io } from "socket.io-client";

export default function useConversation() {
    const socket = io("http://localhost:8765");
    const [convo, addConvo] = useReducer(updateConvo, [new Message("ai", "good morning! i am engrish, a pre-programmed something kinemerut, kausapin mo kooo")]);
    const [correction, setCorrection] = useState("-");
    const [connected, setConnected] = useState(socket.connected)
    async function handleAddConvo(e) {
        // entrypoint of the convo loop, initiated in app/ui/UserControls.jsx
        e.preventDefault();
        const userInput = "wala pa kong audio input functionality here, kunwari nagsalita ako ng ganto"; // TODO: audio component
        addConvo({sender: "user", message: userInput}); // calls updateConvo()
        // var { grammarFeedback, llmGeneration } 
        await socket.emit("user_input", userInput); // TODO: Refactor
        // setCorrection(grammarFeedback.output);
        // addConvo({sender: "ai", message: llmGeneration.output});
        // TODO: play the audio output that llmGeneration.audio gives
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

        socket.on("connect", onConnect)
        socket.on("disconnect", onDisconnect)
        socket.on("grammar_check", onGrammarChecker)
        socket.on("llm_output", onLLMOutput)

        return () => {
            socket.off("connect", onConnect)
            socket.off("disconnect", onDisconnect)
            socket.off("grammar_check", onGrammarChecker)
            socket.off("llm_output", onLLMOutput)
        }
    })
    return { convo, correction, handleAddConvo, setCorrection};
}

function updateConvo(convo, message) {
    return [...convo, new Message(message.sender, message.message)]; // WARN: no data processing is done
}


async function startGeneration(userInput) {
    

}