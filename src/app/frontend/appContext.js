"use client";
import { useState, useReducer } from "react";
import speechToText from "../backend/speechtotext";

export default function useConversation() {
    const [convo, dispatch] = useReducer(updateConvo, ["testing Engrish if the components are properly linked to each other - useConversation()"]);
    const [correction, setCorrection] = useState("-");
    async function handleAddConvo(e) {
        e.preventDefault();
        const userInput = "wala pa kong audio functionality here, kunwari nagsalita ako ng ganto - useConversation()"; // TODO: audio component
        dispatch(userInput);
        var { grammarFeedback, llmGeneration } = await speechToText(userInput);
        console.log(grammarFeedback, llmGeneration);
        setCorrection(grammarFeedback.output);
        dispatch(llmGeneration.output);
        // TODO: play the audio output that llmGeneration.audio gives
    }
    return { convo, correction, handleAddConvo, setCorrection };
}

function updateConvo(convo, action) {
    return [...convo, action]; // WARN: no data processing is done
}
