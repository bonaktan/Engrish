"use client";
import ConversationView from "@/app/ui/ConversationView"
import CorrectionView from "@/app/ui/CorrectionView"
import UserControls from "@/app/ui/UserControls"
import { useState } from "react";

export default function Home() {


    function addConvo(item) {
        updateConvo(convo.concat(item))
    }

    return (
        <>
            <p>Engrish - Development</p>
            <ConversationView/>
            <CorrectionView/>
            <UserControls />
        </>
    )
}