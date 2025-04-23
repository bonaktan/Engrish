"use client";
import ConversationView from "@/app/ui/ConversationView";
import CorrectionView from "@/app/ui/CorrectionView";
import UserControls from "@/app/ui/UserControls";
import { useState, useReducer } from "react";
import Header from "@/app/ui/Header";
import SettingsView from "./ui/SettingsView";

export default function Home() {
    // eto main na frame ng app natin
    return (
        <>
            <div className="mainView flex flex-col">
                <Header/>
                <ConversationView/>
                <div className="controls">
                    <CorrectionView/>
                    <UserControls/>
                </div>
            </div>
            <SettingsView/>
        </>
    );
}
