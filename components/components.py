import threading, asyncio  # for async shits
import whisper  # Speech-To-Text Engine
import language_tool_python  # Grammar Checker Engine
from openai import OpenAI  # LLM Engine
import pyttsx3, gtts  # TextToSpeech Engines
import sounddevice, soundfile  # for playing back audio in gTTS Engine
from dotenv import load_dotenv

load_dotenv()

class SpeechToText:
    def __init__(self, modelUsed="small"):
        self.sttModel = whisper.load_model(modelUsed)

    def transcribe(self):
        # assuming that the input is cache.wav
        transcription = self.sttModel.transcribe("postprocessed.wav")
        return transcription["text"]


class GrammarChecker:
    def __init__(self, engineUsed="language_tool"):
        self.grammarChecker = language_tool_python.LanguageTool("en-PH")

    def check(self, text):
        corrections = self.grammarChecker.check(text)
        # do some parsings, rn basic ass shit lang muna
        returnVal = ""
        for error in corrections:
            returnVal += f"{error.message} in character {error.offsetInContext+1}. \n"
        suggestedSentence = language_tool_python.utils.correct(text, corrections)
        returnVal += f"Suggested Sentence: {suggestedSentence}"
        return returnVal


class LargeLanguageModel:
    def __init__(self):
        self.llmClient = OpenAI()

    def prompt(self, prompt):
        response = self.llmClient.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant.",  # TODO: prompt programming
                },
                {"role": "user", "content": prompt},
            ],
        )
        return response.choices[0].message.content


class TextToSpeech:  # not working
    def __init__(self, engineUsed="pyttsx3"):
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


if __name__ == "__main__":
    print("testing mode")

    print("testing: speech-to-text")
    print(SpeechToText().transcribe("cache.wav"))

    print("testing: llm")
    # print(LargeLanguageModel().prompt("the quick brown fox jumped over the lazy dog"))

    print("testing: grammar checker")
    print(GrammarChecker().check("This are bad."))

    print("testing:text-to-speech")
    TextToSpeech(engineUsed="gtts").speak("test")
