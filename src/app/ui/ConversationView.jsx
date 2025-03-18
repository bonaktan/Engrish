export default function ConversationView({ convo }) {
    // convo is an array taht contains the convo history betwen user and ai
    // string bawat item sa loob ng convo (baka maging object soon)
    return (
        <div className={"convo-view " + ((convo.length == 0) ? "justify-center": "")}>
            {/* wag kayo matakot sa itsura ng ano, ginagawa lang nya iniisa isa yung items sa loob ng convo*/}
            {convo.length == 0 ? (
                <div className="convo-starter">
                    <p><b>Hey there! I&apos;m ENGRISH, Wanna talk?</b></p>
                    <div className="emphasizer-shadow">
                        <div className="emphasizer-box">
                            <p>I&apos;m excited to help you boost your grammar skills! Let&apos;s get started together!</p>
                            <p>TODO PA TO TANGINA PLEASE PAKIREVISE</p>
                        </div>
                    </div>
                </div>
            ) : (
                convo.map((message, key) => {
                    // in messages, theres 4 vars that are used
                    // timestamp: time kung kelan sinend
                    // message: message
                    // sender: sino nagsnd, system, ai, or user
                    // corrections: for user sender, anong mga mali 

                    // BUG: for some reason di nagana yung textalign left/right
                    return (
                        <div key={key} className="items-center">
                            <div className={"message-view " + (message.sender == "ai" ? "text-left mr-auto" : "text-right ml-auto")}>
                                <p>{message.message}</p>
                            </div>
                        </div>
                    );
                })
            )}
            {}
        </div>
    );
}
