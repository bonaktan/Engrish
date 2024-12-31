import receiveUserInput from "@/app/api/receiveUserInput"
export default function UserControls() {
    return <button onClick={receiveUserInput}>Send Input</button>
}