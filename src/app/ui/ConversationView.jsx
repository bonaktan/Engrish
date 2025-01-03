export default function ConversationView({convo}) {
    // convo is an array taht contains the convo history betwen user and ai
    // string bawat item sa loob ng convo (baka maging object soon)
    return (
        <div className="flex-grow">
            {/* wag kayo matakot sa itsura ng ano, ginagawa lang nya iniisa isa yung items sa loob ng convo*/}
            {convo.map((message, key) => {
                return <p key={key}>{message}</p>
            })}
        </div>
    )
}