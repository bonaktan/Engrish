"use server"
export default async function grammarChecker(userInput) {
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    console.log("speechToText received - grammarChecker")
    await sleep(5000)
    console.log("simulated grammarchecking - grammarChecker")
}