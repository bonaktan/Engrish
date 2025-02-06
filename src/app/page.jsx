"use client";
import ConversationView from "@/app/ui/ConversationView";
import CorrectionView from "@/app/ui/CorrectionView";
import UserControls from "@/app/ui/UserControls";
import { useReducer, useState } from "react";
import useConversation from "./frontend/appContext";
import Header from "@/app/ui/Header";
import SidebarView from "./ui/SidebarView";

export default function Home() {
    const { convo, correction, handleAddConvo, setCorrection } = useConversation();
    const [sidebarOpened, toggleOpen] = useReducer((state) => {return !state}, false )
    // eto main na frame ng app natin
    return (
        <>
            <SidebarView open={sidebarOpened} toggleSidebar={toggleOpen}/>
            <main className="flex flex-col h-dvh">
                <Header toggleSidebar={toggleOpen}/>
                <ConversationView convo={convo} />
                <CorrectionView correction={correction} />
                <UserControls handleAddConvo={handleAddConvo} setCorrection={setCorrection} />
            </main>
        </>
    );
}
