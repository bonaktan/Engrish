import threading  # for async shits
import whisper  # Speech-To-Text Engine
import language_tool_python  # Grammar Checker Engine
from openai import OpenAI  # LLM Engine
import pyttsx3, gtts  # TextToSpeech Engines
import sounddevice, soundfile  # for playing back audio in gTTS Engine
from dotenv import load_dotenv
import json  # for convo history dumps

load_dotenv()


class SpeechToText:
    def __init__(self, modelUsed="small", simulate=False):
        if simulate:
            self.sttModel = None
        else:
            self.sttModel = OpenAI()
        self.simulate = simulate

    def transcribe(self):
        # assuming that the input is cache.wav
        if self.simulate:
            return (
                "Simulates STT Transcription, disable AVOID_MEMORY_USAGE in backend.py"
            )
        with open("./preprocessed.wav", "rb") as audio_file:
            transcription = self.sttModel.audio.transcriptions.create(model="whisper-1", file=audio_file, response_format="text")
        return transcription


class GrammarChecker:
    def __init__(self, simulate=False):
        self.simulate = simulate
        if simulate:
            self.llmClient = None
        else:
            self.llmClient = OpenAI()

    def check(self, prompt):
        if self.simulate:
            response = "This is a simulated prompt. To turn off, disable the AVOID_TOKEN_USAGES flag in backend.py"
        else:
            response = (
                self.llmClient.chat.completions.create(
                    model="gpt-4o-mini",
                    messages=[{
                        "role": "developer",
                        "content": "You are a helpful assistant that aims to point out mistakes in my grammar, disregarding typographical mistakes. You will give every mistake i make in bullet form within 1 sentence long. And you will give a corrected version of it at the end of your prompt.",  # TODO: prompt programming
                    },
                        {"role": "user",
                        "content": prompt}
                    ],
                    user="Testing-00",
                )
                .choices[0]
                .message.content
            )
        return response
    # def __init__(self, engineUsed="language_tool", simulate=False):
    #     if simulate:
    #         self.grammarChecker = None
    #     else:
    #         self.grammarChecker = language_tool_python.LanguageTool("en-PH", config={
    #             'languageModel': "D:/bon/Engrish/grammarchecker/en",
    #         })
    #     self.simulate = simulate

    # def check(self, text):
    #     if self.simulate:
    #         return "Simulated Correction, disable AVOID_MEMORY_USAGE in backend.py"

    #     corrections = self.grammarChecker.check(text)
    #     # do some parsings, rn basic ass shit lang muna
    #     returnVal = ""
    #     for error in corrections:
    #         returnVal += f"{error.message} in character {error.offsetInContext+1}. \n"
    #     suggestedSentence = language_tool_python.utils.correct(text, corrections)
    #     returnVal += f"Suggested Sentence: {suggestedSentence}"
    #     return returnVal


class LargeLanguageModel:
    def __init__(self, convoRecord, simulate=False):
        self.convoRecord = convoRecord
        self.simulate = simulate
        if simulate:
            self.llmClient = None
        else:
            self.llmClient = OpenAI()

    def prompt(self, prompt):
        self.convoRecord.user(prompt)
        if self.simulate:
            response = "This is a simulated prompt. To turn off, disable the AVOID_TOKEN_USAGES flag in backend.py"
        else:
            response = (
                self.llmClient.chat.completions.create(
                    model="gpt-4o-mini",
                    messages=self.convoRecord.history,
                    user="Testing-00",
                )
                .choices[0]
                .message.content
            )
        self.convoRecord.assistant(response)
        return response


class TextToSpeech:  # pyttsx3 bugging
    def __init__(self, engineUsed="pyttsx3", simulate=False):
        # valid engineUsed inputs: pyttsx3  |  gtts
        self.pyttsx3Engine = pyttsx3.init()
        self.engine = self.pyttsx3  # default
        if engineUsed == "gtts":
            self.engine = self.gtts
        elif engineUsed == "pyttsx3":
            self.engine = self.pyttsx3
        else:
            raise Exception("Invalid Engine (only use pyttsx3 or gtts)")

    def speak(self, text):
        threading.Thread(target=self.engine, args=[text]).start()

    def pyttsx3(self, text):
        # there is a a bug here wherein it doesnt end. at all. like wtf?
        self.pyttsx3Engine.say(text)
        self.pyttsx3Engine.runAndWait()

    def gtts(self, text):
        output = gtts.gTTS(text=text, lang="en", slow=False)
        output.save("cache2.wav")
        data, fs = soundfile.read("cache2.wav", dtype="float32")
        sounddevice.play(data, fs)
        status = sounddevice.wait()  # Wait until file is done playing


class conversationHistory:
    def __init__(self):
        self.userTemplate = {"role": "user", "content": ""}
        self.assistantTemplate = {"role": "assistant", "content": ""}
        self.reset()

    def reset(self):
        self.history = [
            {
                "role": "developer",
                "content": "You are a helpful human-like assistants that aims to be my conversational partner. You will always answer every question I have in a sentence form within 1 paragraph.",  # TODO: prompt programming
            }
        ]
        self.fullHistory = self.history.copy()
        print('Dumped')
    def user(self, prompt):
        out = self.userTemplate.copy()
        out["content"] = prompt
        self.history.append(out)
        self.fullHistory.append(out)
        self.cull()

    def assistant(self, prompt):
        out = self.assistantTemplate.copy()
        out["content"] = prompt
        self.history.append(out)
        self.fullHistory.append(out)
        self.cull()

    def cull(self):
        if len(self.history) >= 8:
            del self.history[1]


if __name__ == "__main__":
    print("testing mode")

    print("testing: speech-to-text")
    # print(SpeechToText().transcribe("cache.wav"))

    print("testing: llm")
    # print(LargeLanguageModel().prompt("the quick brown fox jumped over the lazy dog"))

    print("testing: grammar checker")
    # print(GrammarChecker().check("This are bad."))

    print("testing:text-to-speech")
    # TextToSpeech(engineUsed="gtts").speak("test")
    convo = conversationHistory()
    llm = GrammarChecker()
    while True:
        prompt = input(">>> ")
        print(llm.check(prompt))
        print(convo.history)
