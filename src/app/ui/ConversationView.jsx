export default function ConversationView({convo}) {
    // convo is an array taht contains the convo history betwen user and ai
    // string bawat item sa loob ng convo (baka maging object soon)
    return (
        <div className="flex-grow">
            {/* wag kayo matakot sa itsura ng ano, ginagawa lang nya iniisa isa yung items sa loob ng convo*/}
            {convo.map((message, key) => {
                // in messages, theres 4 vars that are used
                // timestamp: time kung kelan sinend     
                // message: message
                // sender: sino nagsnd, system, ai, or user
                // corrections: for user sender, anong mga mali
                const time = new Date(message.time)
                return (
                    <div key={key} className="flex">
                        <p>{time.getHours()}:{time.getMinutes()}</p>
                        <p>{message.message}</p>
                    </div>
                )
            })}
            <p>test</p>
        </div>
    )
}