// "use client"
import { Metadata } from "next";
import Contacts from "./Contacts";
import MainContent from "./MainContent";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "AceBook is a platform made by Maaz Saeed to showcase his abilities in NextJS and database managment. This whole website works without any server behind it. Its a standalone website",
};
const Home = () => {
    return (
        <>
            <div className="bg-gray-100 h-screen">
                <NavBar />
                <div className="flex">
                    <SideBar />
                    <Contacts />
                    <MainContent />
                </div>
            </div>
        </>
    );
};

export default Home;
