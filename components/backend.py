from aiohttp import web
import socketio
import base64
import ffmpeg
import components
import ssl
import aiohttp_cors
AVOID_TOKEN_USAGES = True
AVOID_MEMORY_USAGE = True
sio = socketio.AsyncServer(async_mode='aiohttp', ccors_allowed_origins=['*'])
ssl_context = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
ssl_context.load_cert_chain(
    "../certificates/ResearchGroup2.crt", "../certificates/ResearchGroup2Private.key"
)
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
    if userInput == None:
        return
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
    if AVOID_MEMORY_USAGE:
        print("WARNING: STT and Grammar Checker are disabled.")
    if AVOID_TOKEN_USAGES:
        print("WARNING: LLM is disabled.")
    sttEngine = components.SpeechToText(simulate=AVOID_MEMORY_USAGE)
    llmModel = components.LargeLanguageModel(simulate=AVOID_TOKEN_USAGES)
    checkerModel = components.GrammarChecker(simulate=AVOID_MEMORY_USAGE)
    ttsEngine = components.TextToSpeech(engineUsed="gtts")
    webAPI.router.add_get("/", index)
    cors = aiohttp_cors.setup(
        webAPI,
        defaults={
            "*": aiohttp_cors.ResourceOptions(
                allow_credentials=True, expose_headers="*", allow_headers="*"
            )
        },
    )

    for route in list(webAPI.router.routes()): 
        # print(dir(route.resource.raw_match()))
        if route.resource.raw_match("/socket.io/"): continue
        cors.add(route)
    web.run_app(webAPI, port=8765, ssl_context=ssl_context)

# test sentence: I do be testing ENGRISH right now, does this working now?
