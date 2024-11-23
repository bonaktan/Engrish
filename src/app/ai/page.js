import Footer from "../ui/footer";
import Header from "../ui/header";
import MainDisplay from "../ui/maindisplay";

export default function AIPage() {
    return (
        <div className="flex flex-col h-dvh">
            <Header/>
            <div className="user-main flex-grow">
                <MainDisplay/>
            </div>
            <Footer/>
        </div>
    )
}