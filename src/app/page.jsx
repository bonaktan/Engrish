"use client";
import ConversationView from "@/app/ui/ConversationView"
import CorrectionView from "@/app/ui/CorrectionView"
import UserControls from "@/app/ui/UserControls"
import { useState } from "react";
import useConversation from "./frontend/appContext";

export default function Home() {
    const {convo, correction, handleAddConvo, setCorrection} = useConversation()
    return (
        <>
            <p>Engrish - Development</p>
            <ConversationView convo={convo} />
            <CorrectionView correction={correction}/>
            <UserControls handleAddConvo={handleAddConvo} setCorrection={setCorrection}/>
        </>
    )
}