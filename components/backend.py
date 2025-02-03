from aiohttp import web
import socketio

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

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

app.router.add_get('/', index)

if __name__ == '__main__':
    web.run_app(app, port=8765)