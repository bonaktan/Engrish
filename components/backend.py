import asyncio
from websockets.asyncio.server import serve

async def echo(websocket):
    async for message in websocket:
        print(message)
        await websocket.send(message + "test")

async def main():
    async with serve(echo, "localhost", 8765):
        await asyncio.get_running_loop().create_future()  # run forever

asyncio.run(main())
# @route("/api/userInput")
# def microphoneInput():
#     return "isang malaking tite"


# run(host="127.0.0.1", port=8000, reloader=True)