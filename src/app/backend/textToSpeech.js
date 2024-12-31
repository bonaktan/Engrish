export default async function textToSpeech() {
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    console.log("responseGenerator received - textToSpeech")
    await sleep(3000)
    console.log("simulated tts generation - textToSpeech")
}