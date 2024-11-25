import { Sender } from "@/app/api/enums";
import { LLMConvo } from "../api/components/llm";

export default function ConversationView() {
    return (
        <div>
            {LLMConvo.map((message, index) => {
                return (
                    <div key={index}>
                        <p>{message.message}</p>
                    </div>
                );
            })}
        </div>
    );
}
