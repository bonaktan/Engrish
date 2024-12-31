"use server";

import grammarChecker from "@/app/backend/grammarChecker";
import responseGenerator from "@/app/backend/responseGeneration";

export default async function speechToText(userInput) { // TODO: refactor to be modular
    console.log("userInput received - speechtotext")
    const textInput = userInput
    // TODO: implement the stt functionality properly
    const grammarFeedback = grammarChecker(textInput)
    const llmGeneration = responseGenerator(textInput)

    return {grammarFeedback: await grammarFeedback, llmGeneration: await llmGeneration}
}