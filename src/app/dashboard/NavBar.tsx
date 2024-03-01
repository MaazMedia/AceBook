"use client"
import { TextInput } from '@tremor/react';
import Search from '../../../public/search.svg';
import Friends from '../../../public/friends.svg';
import HomeBlue from '../../../public/blue-home.svg';
import FriendsBlue from '../../../public/friends-blue.svg';
import GroupBlue from '../../../public/group-blue.svg';
import message from '../../../public/messenger.png';
import bell from '../../../public/bell.png';
import Group from '../../../public/group.svg';
import Home from '../../../public/home.svg';
import { useState, useEffect } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useUser } from '../UserContext';
const NavBar = () => {
    const { user } = useUser()
    const router = useRouter()

    const [HomeisClicked, setHomeIsClicked] = useState(false);
    const [FriendsisClicked, setFriendsIsClicked] = useState(false);
    const [GroupisClicked, setGroupIsClicked] = useState(false);
    const HomeClick = () => {
        setFriendsIsClicked(false)
        setGroupIsClicked(false)
        setHomeIsClicked(!HomeisClicked)

    }
    const FriendsClick = () => {
        setHomeIsClicked(false)
        setGroupIsClicked(false)
        setFriendsIsClicked(!FriendsisClicked)
    }
    const GroupClick = () => {
        setFriendsIsClicked(false)
        setHomeIsClicked(false)
        setGroupIsClicked(!GroupisClicked)
    }
    return (
        <div className="fixed top-0 z-50 bg-white w-full p-3 shadow flex">
            <div className=' w-64 outline-none overflow-none relative rounded-full '>
                <Image src={Search} alt="Search Icon" className='absolute left-0 top-1/2 transform -translate-y-1/2 w-5 z-10 mx-4 text-opacity-10 text-black' />
                <TextInput placeholder='Search AceBook'
                    className=' px-7 bg-gray-100 rounded-full overflow-hidden border-2 border-black border-opacity-10 outline-none '
                />
            </div>
            <div className='flex justify-center gap-14 mx-96 relative'>
                <Image
                    src={HomeisClicked ? HomeBlue : Home}
                    alt="Home"
                    className={`w-10 cursor-pointer hover:bg-zinc-100 transition duration-500 ease-in-out `}
                    title="Home"
                    onClick={HomeClick}
                />

                <Image
                    src={FriendsisClicked ? FriendsBlue : Friends}
                    alt='Friends'
                    className='w-10 cursor-pointer hover:bg-zinc-100 transition duration-500 ease-in-out'
                    onClick={FriendsClick}
                    title="Friends"
                />
                <Image
                    src={GroupisClicked ? GroupBlue : Group}
                    alt="Group"
                    className='w-10 cursor-pointer hover:bg-zinc-100 transition duration-500 ease-in-out'
                    onClick={GroupClick}
                    title="Groups"
                />

                <div className={HomeisClicked ? "bg-blue-700 z-10 h-1 w-24 absolute transform translate-x-[-96px] translate-y-[50px] transition duration-500 ease-in-out opacity-100" : "hidden opacity-0"} />
                <div className={GroupisClicked ? "bg-blue-700 z-10 h-1 w-24 absolute transform translate-x-[96px] translate-y-[50px] transition duration-500 ease-in-out opacity-100" : "hidden opacity-0"} />
                <div className={FriendsisClicked ? "bg-blue-700 z-10 h-1 w-24 absolute transform translate-y-[50px] transition-transform " : "hidden opacity-0"} />
            </div>

            <div className=' justify-end flex gap-3 relative right-[-170px]' >


                <div className="relative rounded-full cursor-pointer hover:bg-gray-400 bg-gray-300 p-1 w-10 h-10 shadow-md">
                    <Image src={message} className='absolute bottom-1 left-1 w-8 rounded-3xl hover:bg-gray-400 cursor-pointer ' alt="Messenger" />
                </div>
                <div className="relative rounded-full cursor-pointer hover:bg-gray-400 bg-gray-300 p-1 w-10 h-10 shadow-md">
                    <Image src={bell} className='absolute bottom-1 left-1 w-8 rounded-3xl hover:bg-gray-400 cursor-pointer ' alt="Bell" />
                </div>
                <div className="relative rounded-full cursor-pointer hover:bg-gray-400 bg-gray-300  w-10 h-10 shadow-md">
                    <img src={user ? ` ${user.photoURL}` : `data:image/png;base64,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`} className='absolute rounded-3xl w-10 hover:bg-gray-400 cursor-pointer ' alt="Profile" />
                    <div className="absolute inset-0 hover:bg-black opacity-20 rounded-3xl cursor-pointer transition-opacity duration-300" />

                </div>


            </div>
        </div>
    )
}

export default NavBar
