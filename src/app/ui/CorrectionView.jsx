export default function CorrectionView({ correction }) {
    // correction is a string that contains the corrections na sinuggest ni grmmar checker
    return (
       <div className="correction-view flex-grow-0 flex-shrink-0">
        <div className="correction-box">
            <p>{correction} - correction</p>
        </div>
     </div> 
 
    );
}


