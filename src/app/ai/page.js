import Footer from "../ui/footer";
import Header from "../ui/header";
import MainDisplay from "../ui/maindisplay";

export default function AIPage() {
    return (
        <div className="flex flex-col h-screen">
            <div className="user-main flex-grow flex flex-col">
                <Header/>
                <MainDisplay/>
            </div>
            <Footer/>
        </div>
    )
}