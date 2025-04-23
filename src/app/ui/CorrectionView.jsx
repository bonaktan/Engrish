import { useContext } from "react";
import { EngrishContext } from "../frontend/useEngrish";
export default function CorrectionView() {
    const {correction} = useContext(EngrishContext)
    // correction is a string that contains the corrections na sinuggest ni grmmar checker
    return (
       <div className="correction-view">
        <div className="correction-box">
            <p>{correction}</p>
        </div>
     </div> 
 
    );
}


