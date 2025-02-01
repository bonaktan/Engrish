"use client";
import ConversationView from "@/app/ui/ConversationView";
import CorrectionView from "@/app/ui/CorrectionView";
import UserControls from "@/app/ui/UserControls";
import { useState } from "react";
import useConversation from "./frontend/appContext";
import Header from "@/app/ui/Header";

export default function Home() {
    const { convo, correction, handleAddConvo, setCorrection } = useConversation();
    // eto main na frame ng app natin
    return (
        <>
            <main className="flex flex-col h-dvh">
                <Header />
                <ConversationView convo={convo} />
                <CorrectionView correction={correction} />
                <UserControls handleAddConvo={handleAddConvo} setCorrection={setCorrection} />
            </main>
        </>
        
    );
}
