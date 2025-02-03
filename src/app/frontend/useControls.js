"use client"

import { useReducer } from "react"

export default function useUserControls() {
    // RESPONSIBILITY: control UserControls
    const [recording, toggleRecording] = useReducer((state) => {return !state}, false)
    return {recording, toggleRecording}
}