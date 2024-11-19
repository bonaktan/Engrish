const simulatedConvo = [
    {
        type: "user",
        message: "chat, sukong suko na ko magprogram neto, tulong naman oh",
    },
    {
        type: "chatbot",
        message:
            "Sige! Eto ang mga maaari mong gawin para mapabilis ang tapos mo sa iyong paghihirap!\n1. tumalon ka sa rooftop ng SVNHS\n2. Pumunta sa Magsaysay Bldg. at mSorry, out language model cannot help you with that request. is there other things we can help you with?",
    },
];
export default function MainDisplay() {
    return (
        <div className="flex-grow">
            <div className="h-full p-8">
                <div className="h-full bg-bodytranscript/[.16] p-2 rounded-3xl">
                    {simulatedConvo.map((chat, index) => {
                        return (
                            <div
                                key={index}
                                className={`user-maindisplay-chatbubble m-2 p-2 rounded-2xl ${
                                    chat.type == "user"
                                        ? "ml-10 text-right"
                                        : "mr-10"
                                }`}
                            >
                                <p>{chat.message}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
