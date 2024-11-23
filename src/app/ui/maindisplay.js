import { simulatedConvo } from "../api/conversations";

export default function MainDisplay() {
    return (
        <div>
            <div>
                <div>
                    {simulatedConvo.map((chat, index) => {
                        return (
                            <div key={index}>
                                <p>{chat.message}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
