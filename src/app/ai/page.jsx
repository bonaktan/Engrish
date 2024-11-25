import ConversationView from "@/app/ui/conversation"
import GrammarView from "@/app/ui/grammar"
import Header from "@/app/ui/header"
export default function Page() {
    return (
        <>
            <Header/>
            <ConversationView/>
            <GrammarView/>
        </>
    )
}