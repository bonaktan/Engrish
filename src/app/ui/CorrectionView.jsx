export default function CorrectionView({ correction }) {
    // correction is a string that contains the corrections na sinuggest ni grmmar checker
    return (
       <div className="correction-view">
        <div className="correction-box">
            <p>{correction}</p>
        </div>
     </div> 
 
    );
}


