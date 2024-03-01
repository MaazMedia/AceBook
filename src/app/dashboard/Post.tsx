
import { ThumbUpIcon, ChatAltIcon, ShareIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useEffect, useState } from "react";
import { collection, getDocs, query, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/ClientApp"
interface PostPropsType {
    message: string,
    username: string,
    picture: string,
    email: string,

}
function Post({ message, username, picture, email }: PostPropsType) {
    let [isLiked, setisLiked] = useState(false)
    let [Likes, setLikes] = useState(0)
    useEffect(() => {
        const fetchLikes = async () => {
            const postsQuery = query(collection(db, "Users", email, "posts"));
            const postsSnapshot = await getDocs(postsQuery);
            postsSnapshot.forEach((info) => {
                const userPosts = info.data();
                if (userPosts.message === message) {
                    setLikes(userPosts.Likes);

                }
            });
        };
        fetchLikes();
    }, [db, email, message]);
    const handleLike = async () => {
        console.log("Liked", isLiked)
        setisLiked(!isLiked);
        setLikes(prevLikes => isLiked ? prevLikes - 1 : prevLikes + 1); // Update likes count based on previous state

        try {
            const postsQuery = query(collection(db, "Users", email, "posts"));
            const postsSnapshot = await getDocs(postsQuery);
            postsSnapshot.forEach(async (info) => {
                const userPosts = info.data();
                if (userPosts.message === message) {
                    const postID = info.id; // Get the document ID

                    const newLikes = isLiked ? userPosts.Likes - 1 : userPosts.Likes + 1;

                    const userDocRef = doc(db, "Users", email, "posts", postID);
                    await updateDoc(userDocRef, { Likes: newLikes });

                    console.log("Likes count updated for post:", postID);
                }
            });
        } catch (error) {
            console.error("Error updating likes count:", error);
        }


    }

    return (
        <div className="flex flex-col bg-background  left-[283px] top-[60px]  relative">
            <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-sm">
                <div className="flex items-center space-x-2">
                    <Image
                        className="rounded-full"
                        src={picture}
                        width={40}
                        height={40}
                        alt={username}
                    />
                    <div>
                        <p className="font-medium">{username}</p>
                        {/* {timestamp ? (
                            <p className="text-xs text-gray-400">
                                {new Date(timestamp?.toDate()).toLocaleDateString()}
                            </p>
                        ) : (
                            <p className="text-xs text-gray-400">Loading</p>
                        )} */}
                        <p className="text-xs text-gray-400">23m</p>
                    </div>
                </div>
                <p className="pt-4">{message}</p>
            </div>
            {/* {postImage && (
                <div className="relative h-56 md:h-96 bg-white">
                    <Image src={postImage} objectFit="cover" layout="fill" />
                </div>
            )} */}
            <div className="flex justify-between items-center rounded-b-2xl bg-white shadow-md text-gray-400 border-t">
                <div className={`inputIcon rounded-none rounded-bl-2xl ${isLiked ? "text-blue-500" : ""} `}
                    onClick={handleLike}
                >
                    <ThumbUpIcon className={`h-4 ${isLiked ? "fill-current" : ""}  `} />
                    <p className="text-xs sm:text-base">
                        Like
                        {Likes !== 0 ? ` ${Likes}` : ""}
                    </p>

                </div>
                <div className="inputIcon rounded-none">
                    <ChatAltIcon className="h-4" />
                    <p className="text-xs sm:text-base">Comment</p>
                </div>
                <div className="inputIcon rounded-none rounded-br-2xl">
                    <ShareIcon className="h-4" />
                    <p className="text-xs sm:text-base">Share</p>
                </div>
            </div>
        </div>)
}

export default Post