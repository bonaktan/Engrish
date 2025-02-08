import threading, asyncio  # for async shits
import pyttsx3, gtts  # TextToSpeech Engines
import winsound # for playing back audio in gTTS Engine
import sounddevice as sd
import soundfile as sf

class TextToSpeech: # not working
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
        self.engine(text)


    def pyttsx3(self, text, *args, **kwargs):
        self.pyttsx3Engine.say(text)
        self.pyttsx3Engine.runAndWait()

    def gtts(self, text):
        output = gtts.gTTS(text=text, lang="en", slow=False)
        output.save("cache2.wav")
        data, fs = sf.read("cache2.wav", dtype='float32')  
        sd.play(data, fs)
        status = sd.wait()  # Wait until file is done playing