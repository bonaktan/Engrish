from aiohttp import web
import asyncio
import socketio
from time import sleep
import gtts, os, io
import pyttsx3
import base64
import speech_recognition as sr
import ffmpeg

speechEngine = pyttsx3.init()

r = sr.Recognizer()
sio = socketio.AsyncServer(cors_allowed_origins="*")
app = web.Application()
sio.attach(app)


async def index(request):
    """Serve the client-side application."""
    return "test"


@sio.event
def connect(sid, environ):
    print("connect ", sid)


@sio.event
async def user_input(sid, userInput):
    print("message ", userInput)
    if None: pass
    else:
        with open("cache.wav", "wb") as fh:
            fh.write(base64.decodebytes(userInput.encode("ascii")))
        await speechToText()


@sio.event
def disconnect(sid):
    print("disconnect ", sid)


async def speechToText():
    # input: the write operation in user_input
    # needed to convert input to lossless
    (ffmpeg
        .input("cache.wav")
        .output("cache.flac")
        .overwrite_output()
        .run(capture_stdout=False, capture_stderr=False))
    input = sr.AudioFile("cache.flac")
    with input as source:
        audio = r.record(source)
        s = r.recognize_sphinx(audio)
    print(f"userInput: {s}")
    # await asyncio.gather(grammarCheck(userInput), llmGenerate(userInput))


async def grammarCheck(userInput):
    sleep(1)
    correction = "simulated correction"
    print(f"grammarCheck: {correction}")
    await sio.emit("grammar_check", correction)


async def llmGenerate(userInput):
    sleep(3)
    generation = "Hey! I'm ChatGPT, a virtual assistant powered by AI, here to help with anything you need. Whether it’s answering questions, having a casual chat, or helping out with projects, I’ve got you covered. What’s on your mind today?"
    print(f"llmGenerate: {generation}")
    await sio.emit("llm_output", generation)
    await speechToText(generation)  # apparently its a blocking operation


async def textToSpeech(generation):
    # there could be settings here depende kung anong speech engine want mo gamitin, gtts or pyttsx3
    # mp3Audio = io.BytesIO()
    speechEngine.say(generation)
    speechEngine.runAndWait()
    # find a way to stream that audio
    # llmAudio.write_to_fp(mp3Audio)
    # await sio.emit("llm_voice", mp3Audio)
    # llmAudio.save("testing.mp3")
    # os.system("start testing.mp3")


app.router.add_get("/", index)

if __name__ == "__main__":
    web.run_app(app, port=8765)
