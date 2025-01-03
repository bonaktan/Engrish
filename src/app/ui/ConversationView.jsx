import speechToText from "@/app/backend/speechtotext"
export default function ConversationView({convo}) {

    return (
        <div className="flex-grow">
            {convo.map((message, key) => {
                console.log(message, key)
                return <p key={key}>{message}</p>
            })}
        </div>
    )
}