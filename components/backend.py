from bottle import app, route, run, get
from bottle.ext.websocket import GeventWebSocketServer
from bottle.ext.websocket import websocket

@get('/websocket', apply=[websocket])
def echo(ws):
    while True:
        msg = ws.receive()
        if msg is not None:
            ws.send(msg)
        else: break

run(host='127.0.0.1', port=8080, server=GeventWebSocketServer)