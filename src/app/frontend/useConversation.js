"use client";
import { useState, useReducer, useEffect } from "react";
import { Message } from "../backend/structures";
import { io } from "socket.io-client";

export const socket = io("http://localhost:8766") // TODO: convert this shit to a dynamic ip address dependent on its host
// i think need to irefactor
export default function useConversation() {
    // RESPONSIBILITY: control Convo/Correction Views
    const [convo, addConvo] = useReducer(updateConvo, [new Message("ai", "Hi! I'm ENGRISH, a chatbot that aims to simulate a human conversational partner. Talk to me about anything you like!")]);
    const [correction, setCorrection] = useState("-");
    const [connected, setConnected] = useState(socket.connected)
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
    return {convo, correction, connected, reset};
}

function updateConvo(convo, message) {
    if (message == "resetConvesationPlease4124") {
        return [new Message("ai", "Hi! I'm ENGRISH, a chatbot that aims to simulate a human conversational partner. Talk to me about anything you like!")]
    }
    return [...convo, new Message(message.sender, message.message)]; // WARN: no data processing is done
}
