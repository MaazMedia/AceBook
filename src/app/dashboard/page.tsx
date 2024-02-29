"use client"
import Contacts from "./Contacts";
import MainContent from "./MainContent";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Head from 'next/head';


const Home = () => {

    return (
        <>
            <Head>
                <title>
                    AceBook
                </title>
                <script src="https://kit.fontawesome.com/316ffe2be1.js" crossOrigin="anonymous"></script>
            </Head>
            <body className="bg-gray-100 h-screen ">


                <NavBar />
                <div className="flex">
                    <SideBar />
                    <Contacts />
                    <MainContent />
                </div>
            </body>
        </>
    );
};

export default Home;
