from aiohttp import web
import asyncio
import socketio
from time import sleep
import gtts, os, io
import pyttsx3
import base64
speechEngine = pyttsx3.init()

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
    with open("test.wav", "wb") as fh:
        print(base64.decodebytes(userInput.encode("ascii")))
        fh.write(base64.decodebytes(userInput.encode("ascii")))
    await textToSpeech(userInput)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

async def textToSpeech(userInput):
    sleep(2)
    print(f"userInput: {userInput}")
    await asyncio.gather(grammarCheck(userInput), llmGenerate(userInput))

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
    await speechToText(generation) # apparently its a blocking operation

async def speechToText(generation):
    # there could be settings here depende kung anong speech engine want mo gamitin, gtts or pyttsx3
    # mp3Audio = io.BytesIO()
    speechEngine.say(generation)
    speechEngine.runAndWait()
    # find a way to stream that audio
    # llmAudio.write_to_fp(mp3Audio)
    # await sio.emit("llm_voice", mp3Audio)
    # llmAudio.save("testing.mp3")
    # os.system("start testing.mp3")

app.router.add_get('/', index)

if __name__ == '__main__':
    web.run_app(app, port=8765)