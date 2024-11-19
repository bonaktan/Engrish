const corrections = "yan kasi kung ano pinagsasasabi tangina mo ahhhh"
export default function Footer() {
    return (
        <div className="user-foot">
            <div className="user-corrections">
                <div className="bg-footercorrections/[.16] mx-8 my-4">
                    <p>{corrections}</p>
                </div>
            </div>
            <diiv className="user-nav flex flex-row justify-around gap-20">
                <div className="user-morebutton">
                    <button>...</button>
                </div>
                <div className="user-plusbutton">
                    <button>NewConvo</button>
                </div>
            </diiv>
        </div>
    );
}