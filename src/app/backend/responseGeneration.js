"use server";
import textToSpeech from "@/app/backend/textToSpeech";

export default async function responseGenerator() {
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    console.log("speechToText received - responseGenerator")
    await sleep(6000)
    console.log("simulated llm generation - responseGenerator")
    textToSpeech()
}