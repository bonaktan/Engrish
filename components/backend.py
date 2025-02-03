from aiohttp import web
import socketio
from time import sleep


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
    await textToSpeech(userInput)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

async def textToSpeech(userInput):
    sleep(2)
    print(f"userInput: {userInput}")
    await grammarCheck(userInput)
    # llmGenerate(userInput)

async def grammarCheck(userInput):
    sleep(1)
    correction = "simulated correction"
    print(f"grammarCheck: {correction}")
    await sio.emit("grammar_check", correction)
    
app.router.add_get('/', index)

if __name__ == '__main__':
    web.run_app(app, port=8765)