"use server"
export default async function grammarChecker(textInput) {
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    console.log("speechToText received - grammarChecker")
    await sleep(5000) // TODO: link this shit to a real grammar checker
    console.log("simulated grammarchecking - grammarChecker")
    return {type: "grammarFeedback", output: "kunwari correction to ni grammar checker- grammarChecker()"}
}