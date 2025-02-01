export default function ConversationView({ convo }) {
    // convo is an array taht contains the convo history betwen user and ai
    // string bawat item sa loob ng convo (baka maging object soon)
    return (
        <div className="convo-shadow">
            <div className="convo-view h-full flex flex-col overflow-y-auto">
                {/* wag kayo matakot sa itsura ng ano, ginagawa lang nya iniisa isa yung items sa loob ng convo*/}
                {convo.map((message, key) => {
                    // in messages, theres 4 vars that are used
                    // timestamp: time kung kelan sinend
                    // message: message
                    // sender: sino nagsnd, system, ai, or user
                    // corrections: for user sender, anong mga mali
                    const time = new Date(message.time).toLocaleTimeString("en-BR", { hour: "2-digit", minute: "2-digit" });
                    return (
                        <div key={key} className="items-center">
                            <div className={"message-view flex " + (message.sender=="ai" ? "text-left mr-auto" : "text-right ml-auto")}>
                                {/* <p className="flex-shrink-0 mr-2">{time}</p> subject to design choices */}
                                <p>{message.message}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
