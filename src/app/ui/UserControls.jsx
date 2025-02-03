import useUserControls from "../frontend/useControls";
export default function UserControls() {
    // handleMicrophone handles everything here
    // di nyo yun sakop pero thats defined in app/frontend/controls.js
    return (
        <div className="user-input flex-grow-0 flex-shrink-0 flex justify-evenly">
            <button className="input-button">Simulate</button>
        </div>
    );
}
