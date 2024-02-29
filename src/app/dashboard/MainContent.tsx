"use client"
import Posts from './Posts';
import InputBox from './InputBox';
import { useEffect, useState } from 'react';
import { addDoc, collection, getDocs, query, setDoc } from "firebase/firestore";
import { db, app } from "../../../firebase/ClientApp"
import { getAuth } from 'firebase/auth';

function MainContent() {
    const [posts, setPosts] = useState([]);
    let [user, setUser] = useState(null)
    useEffect(() => {
        async function fetchPosts() {
            try {
                const DocRef = query(collection(db, "Users"))
                const querySnapshot = await getDocs(DocRef);
                let allPosts = [];

                querySnapshot.docs.map(async (doc) => {

                    const userData = doc.data();


                    const EmailSnapshot = await getDocs(query(collection(db, "Users", doc.id, "posts")))
                    EmailSnapshot.docs.map(async (doc) => {
                        const userPosts = doc.data()

                        allPosts = allPosts.concat(userPosts);

                        setPosts(allPosts)
                    })



                });
                allPosts.sort((a, b) => b.timestamp - a.timestamp);

                setPosts([...posts, allPosts]);

            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }

        fetchPosts();
    }, []);

    useEffect(() => {
        let auth = getAuth(app)
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user)

            }
            else {
                setUser(null)

            }
        })
        return () => unsubscribe()
    }, [])
    const addPost = async (postText, username, DP, email) => {
        const newPost = {
            id: Date.now(),
            message: postText,
            name: username,
            Picture: DP,
            email: email
        };


        await addDoc(collection(db, "Users", email, "posts"), {
            id: Date.now(),
            message: postText,
            name: username,
            Picture: DP,
            email: email,
            Likes: 0

        });
        setPosts([...posts, newPost]);
    };

    return (

        <div className='bg-background h-max'>
            <InputBox addPost={addPost} />
            <Posts posts={posts} db={db} />
        </div>
    )

}

export default MainContent