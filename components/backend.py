from bottle import app, route, run



@route("/api/userInput")
def microphoneInput():
    return "isang malaking tite"


run(host="127.0.0.1", port=8000, reloader=True)