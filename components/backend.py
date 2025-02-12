from aiohttp import web
import socketio
import base64
import ffmpeg
import components
AVOID_TOKEN_USAGES = False
AVOID_MEMORY_USAGE = False
sio = socketio.AsyncServer(async_mode='aiohttp', cors_allowed_origins='*')
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
    if userInput == None:
        return
    print("received input")
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
@sio.event
def reset(sid):
    print("Convo Reset Requested")
    conversationRecord.reset()

if __name__ == "__main__":
    if AVOID_MEMORY_USAGE:
        print("WARNING: STT and Grammar Checker are disabled.")
    if AVOID_TOKEN_USAGES:
        print("WARNING: LLM is disabled.")
    conversationRecord = components.conversationHistory()
    sttEngine = components.SpeechToText(simulate=AVOID_MEMORY_USAGE)
    llmModel = components.LargeLanguageModel(conversationRecord, simulate=AVOID_TOKEN_USAGES)
    checkerModel = components.GrammarChecker(simulate=AVOID_MEMORY_USAGE)
    ttsEngine = components.TextToSpeech(engineUsed="gtts")
    webAPI.router.add_get("/", index)

    web.run_app(webAPI, host="localhost", port=8766)
    

# test sentence: I do be testing ENGRISH right now, does this working now?

