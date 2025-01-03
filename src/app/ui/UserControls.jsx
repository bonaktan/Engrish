export default function UserControls({handleAddConvo}) {
    // handleAddConvo is a function that initiates the whole process
    // di nyo yun sakop pero thats defined in app/frontend/appContext.js
    return <button onClick={handleAddConvo}>Send Input</button>
}