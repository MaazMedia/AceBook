"use client"
import {
    ChevronDownIcon,
    ShoppingBagIcon,
    UserGroupIcon,

} from "@heroicons/react/outline";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../../../firebase/ClientApp";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SidebarRow from "./SideBarRow";

import {
    ArrowSmLeftIcon,
    CalendarIcon,
    ClockIcon,
    DesktopComputerIcon,
    UsersIcon
} from "@heroicons/react/solid";
import { Router } from "next/router";
import { useUser } from "../UserContext"

function Sidebar() {
    const { user, setUser } = useUser()
    const router = useRouter()
    const handleSignOut = () => {
        let auth = getAuth(app)
        router.replace("/")
        signOut(auth)
        setUser(null)

    }

    return (
        <div className="pt-16 fixed p-2 mt-5 w-[250px]  ">
            <div className="flex p-3 cursor-pointer hover:bg-opacity-5 hover:bg-black  ">
                <img className="rounded-full " width={30} height={30} src={user ? `${user.photoURL}` : `data:image/png;base64,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`} />
                <p className="hidden sm:inline-flex font-medium ml-2 items-center">{user ? user.name : "Guest"}</p>
            </div>

            <SidebarRow Icon={UsersIcon} title="Friends" />
            <SidebarRow Icon={UserGroupIcon} title="Groups" />
            <SidebarRow Icon={ShoppingBagIcon} title="MarktetPlace" />
            <SidebarRow Icon={DesktopComputerIcon} title="Watch" />
            <SidebarRow Icon={CalendarIcon} title="Events" />
            <SidebarRow Icon={ClockIcon} title="Memories" />
            <div onClick={handleSignOut}>
                <SidebarRow Icon={ArrowSmLeftIcon} title="SignOut" />
            </div>
        </div>
    )
}

export default Sidebar