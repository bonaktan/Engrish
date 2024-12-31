import speechToText from "@/app/backend/speechtotext"
export default function ConversationView({convo}) {

    return (
        <>
            {convo.map((message, key) => {
                console.log(message, key)
                return <p key={key}>{message}</p>
            })}
        </>
    )
}