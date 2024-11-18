import Footer from "../ui/footer";
import Header from "../ui/header";
import MainDisplay from "../ui/maindisplay";

export default function AIPage() {
    return (
        <div>
            <div className="user-main">
                <Header/>
                <MainDisplay/>
            </div>
            <Footer/>
        </div>
    )
}