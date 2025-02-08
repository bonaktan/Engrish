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

import components

sio = socketio.AsyncServer(cors_allowed_origins="*")
webAPI = web.Application()
sio.attach(webAPI)


async def index(request):
    """Serve the client-side application."""
    return "test"


@sio.event
def connect(sid, environ):
    print("connect ", sid)


@sio.event
async def user_input(sid, userInput):
    print("message ", userInput)
    if userInput == None: return
    # decoding b64-encoded wav file
    with open("preprocessed.wav", "wb") as fh:
        fh.write(base64.decodebytes(userInput.encode("ascii")))
    # ffmpeg-deborking using wav
    (
        ffmpeg.input("preprocessed.wav")
        .output("postprocessed.wav")
        .overwrite_output()
        .run(capture_stdout=False, capture_stderr=False)
    )
    sttOut = sttEngine.transcribe()
    await sio.emit("stt_output", sttOut)
    checkerOut = checkerModel.check(sttOut)
    await sio.emit("grammar_check", checkerOut)
    llmOut = llmModel.prompt(sttOut)
    await sio.emit("llm_output", llmOut)
    ttsEngine.speak(llmOut)
    print("Message Transaction done")

@sio.event
def disconnect(sid):
    print("disconnect ", sid)


if __name__ == "__main__":
    sttEngine = components.SpeechToText()
    llmModel = components.LargeLanguageModel()
    checkerModel = components.GrammarChecker()
    ttsEngine = components.TextToSpeech(engineUsed="gtts")
    webAPI.router.add_get("/", index)
    web.run_app(webAPI, port=8765)

# test sentence: I do be testing ENGRISH right now, does this working now?