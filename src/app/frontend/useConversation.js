"use client";
import { useState, useReducer, useEffect } from "react";
import { Message } from "../backend/structures";
import { io } from "socket.io-client";

export const socket = io("http://localhost:8765")
// i think need to irefactor
export default function useConversation() {
    // RESPONSIBILITY: control Convo/Correction Views
    const [convo, addConvo] = useReducer(updateConvo, [new Message("ai", "testing Engrish if the components are properly linked to each other - useConversation()")]);
    const [correction, setCorrection] = useState("-");
    const [connected, setConnected] = useState(socket.connected)
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
    return {convo, correction};
}

function updateConvo(convo, message) {
    return [...convo, new Message(message.sender, message.message)]; // WARN: no data processing is done
}
