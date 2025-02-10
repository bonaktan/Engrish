"use client";
import ConversationView from "@/app/ui/ConversationView";
import CorrectionView from "@/app/ui/CorrectionView";
import UserControls from "@/app/ui/UserControls";
import { useState, useReducer } from "react";
import useConversation from "./frontend/useConversation";
import Header from "@/app/ui/Header";
import SidebarView from "./ui/SidebarView";

export default function Home() {
    const { convo, correction, connected, reset } = useConversation();
    const [sidebarOpened, toggleOpen] = useReducer((state) => {console.log("toggle"); return !state}, false )
    // eto main na frame ng app natin
    return (
        <div className="mainView">
            <SidebarView open={sidebarOpened} toggleSidebar={toggleOpen} reset={reset}/>
            <main className="appView flex flex-col">
                <Header toggleSidebar={toggleOpen}/>
                <ConversationView convo={convo} />
                <div className="controls">
                    <CorrectionView correction={correction} />
                    <UserControls connected={connected}/>
                </div>
            </main>
        </div>
    );
}
