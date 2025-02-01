export default function UserControls({ handleAddConvo }) {
    // handleAddConvo is a function that initiates the whole process
    // di nyo yun sakop pero thats defined in app/frontend/appContext.js
    return (
        <div className="user-input flex-grow-0 flex-shrink-0 flex justify-evenly">
            <button className="input-button" onClick={handleAddConvo}>Simulate</button>
        </div>
    );
}
