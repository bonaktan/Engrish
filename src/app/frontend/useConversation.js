"use client";
import { useState, useReducer } from "react";
import { Message } from "../backend/structures";
import useUserControls from "./useControls";

// i think need to irefactor
export default function useConversation() {
    // RESPONSIBILITY: control Convo/Correction Views
    const [convo, addConvo] = useReducer(updateConvo, [new Message("ai", "testing Engrish if the components are properly linked to each other - useConversation()")]);
    const [correction, setCorrection] = useState("-");
    return {convo, correction};
}

function updateConvo(convo, message) {
    return [...convo, new Message(message.sender, message.message)]; // WARN: no data processing is done
}
