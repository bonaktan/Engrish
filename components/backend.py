from aiohttp import web
import asyncio
import socketio
from time import sleep
import gtts, os, io
import pyttsx3
import base64
import speech_recognition as sr
import ffmpeg
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
speechEngine = pyttsx3.init()
r = sr.Recognizer()
sio = socketio.AsyncServer(cors_allowed_origins="*")
app = web.Application()
sio.attach(app)
client = OpenAI()


async def index(request):
    """Serve the client-side application."""
    return "test"


@sio.event
def connect(sid, environ):
    print("connect ", sid)


@sio.event
async def user_input(sid, userInput):
    print("message ", userInput)
    if None:
        pass
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
    (
        ffmpeg.input("cache.wav")
        .output("cache.flac")
        .overwrite_output()
        .run(capture_stdout=False, capture_stderr=False)
    )
    input = sr.AudioFile("cache.flac")
    with input as source:
        audio = r.record(source)
        sttOutput = r.recognize_sphinx(audio)
    print(f"userInput: {sttOutput}")
    await asyncio.gather(grammarCheck(sttOutput), llmGenerate(sttOutput))


async def grammarCheck(userInput):
    sleep(1)
    correction = "simulated correction"
    print(f"grammarCheck: {correction}")
    await sio.emit("grammar_check", correction)


async def llmGenerate(userInput):
    llmResponse = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},  #that simulates a human person conversing with another person."},
            {"role": "user", "content": "Say this is a test"},
        ],
    )
    generation = llmResponse.choices[0].message.content
    print(f"llmGenerate: {generation}")
    await sio.emit("llm_output", generation)
    await textToSpeech(generation)  # apparently its a blocking operation


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
