"use server";

import grammarChecker from "@/app/backend/grammarChecker";
import responseGenerator from "@/app/backend/responseGeneration";

export default async function speechToText(userInput) {
    console.log("userInput received - speechtotext")
    grammarChecker()
    responseGenerator()
}