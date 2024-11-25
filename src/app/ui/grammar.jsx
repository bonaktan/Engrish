import { GrammarCorrections } from "../api/components/grammar";
export default function GrammarView() {
    return (
        <div>
            <p>{GrammarCorrections}</p>
            <div className="flex justify-between mx-5">
                <div>
                    <button>...</button>
                </div>
                <div>
                    <button>+</button>
                </div>
            </div>
        </div>
    );
}
