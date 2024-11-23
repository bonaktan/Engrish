import { corrections } from "../api/conversations";

export default function Footer() {
    return (
        <div>
            <div>
                <div>
                    <p>{corrections}</p>
                </div>
            </div>
            <diiv>
                <div>
                    <button>...</button>
                </div>
                <div>
                    <button>NewConvo</button>
                </div>
            </diiv>
        </div>
    );
}