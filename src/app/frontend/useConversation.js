"use client";
import { useState, useReducer, useEffect } from "react";
import { Message } from "../backend/structures";
import { io } from "socket.io-client";

export const socket = io("https://192.168.1.2:8765", {transports: ['websocket', 'polling', 'flashsocket']}) // TODO: convert this shit to a dynamic ip address dependent on its host
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
    return {convo, correction, connected};
}

function updateConvo(convo, message) {
    return [...convo, new Message(message.sender, message.message)]; // WARN: no data processing is done
}
