"use client";
import { useState, useReducer, useEffect } from "react";
import { Message } from "../backend/structures";
import { io } from "socket.io-client";

const socket = io("http://localhost:8765")
export default function useConversation() {
    const [convo, addConvo] = useReducer(updateConvo, [new Message("ai", "good morning! i am engrish, a pre-programmed something kinemerut, kausapin mo kooo")]);
    const [correction, setCorrection] = useState("-");
    const [connected, setConnected] = useState(socket.connected)
    async function handleAddConvo(e) {
        // entrypoint of the convo loop, initiated in app/ui/UserControls.jsx
        e.preventDefault();
        const userInput = "wala pa kong audio input functionality here, kunwari nagsalita ako ng ganto"; // TODO: audio component
        addConvo({sender: "user", message: userInput}); // calls updateConvo()
        // var { grammarFeedback, llmGeneration } 
        await socket.emit("user_output", userInput); // TODO: Refactor

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
        function onUserInput(output) {
            addConvo(new Message("user", output))
        }

        socket.on("connect", onConnect)
        socket.on("disconnect", onDisconnect)
        socket.on("grammar_check", onGrammarChecker)
        socket.on("llm_output", onLLMOutput)
        socket.on("user_input", onUserInput)

        return () => {
            socket.off("connect", onConnect)
            socket.off("disconnect", onDisconnect)
            socket.off("grammar_check", onGrammarChecker)
            socket.off("llm_output", onLLMOutput)
            socket.off("user_input", onUserInput)
        }
    })
    return { convo, correction, connected, handleAddConvo, setCorrection};
}

function updateConvo(convo, message) {
    return [...convo, new Message(message.sender, message.message)]; // WARN: no data processing is done
}