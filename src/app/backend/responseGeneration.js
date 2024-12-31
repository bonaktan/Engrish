"use server";
import textToSpeech from "@/app/backend/textToSpeech";

export default async function responseGenerator() {
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    console.log("speechToText received - responseGenerator")
    await sleep(6000) // TODO: link this to an llm
    const output = "kunwari eto output ng llm, atleast masasabi ko may slight progress yung research namin :3 - responseGenerator"
    console.log("simulated llm generation - responseGenerator")
    const audio = await textToSpeech()
    return {type: "llmGeneration", output: output, audio: audio.audio}
}