import speechToText from "../backend/speechtotext"

export default function receiveUserInput(e) {
    e.preventDefault()
    console.log("user input received") 
    // WARN: this simulates an audio input, no audio input is supported as of this moment.
    const userInput = null
    speechToText(userInput)
}