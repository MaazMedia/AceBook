import Posts from './Posts';
import InputBox from './InputBox';
import { useEffect, useState } from 'react';
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db, app } from "../../../firebase/ClientApp"
import { getAuth, User } from 'firebase/auth';

interface Post {
    id: number;
    message: string;
    name: string;
    Picture: string;
    email: string;
    Likes: number;
}

function MainContent() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const docRef = query(collection(db, "Users"))
                const querySnapshot = await getDocs(docRef);
                let allPosts: Post[] = [];

                await Promise.all(querySnapshot.docs.map(async (doc) => {
                    const userData = doc.data();
                    const email = doc.id;

                    const emailSnapshot = await getDocs(query(collection(db, "Users", email, "posts")))
                    emailSnapshot.docs.forEach(doc => {
                        const userPosts = doc.data() as Post[];
                        allPosts = allPosts.concat(userPosts);
                    });
                }));

                allPosts.sort((a, b) => b.id - a.id);
                setPosts(allPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }

        fetchPosts();
    }, []);

    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const addPost = async (postText: string, username: string, DP: string, email: string) => {
        const newPost: Post = {
            id: Date.now(),
            message: postText,
            name: username,
            Picture: DP,
            email: email,
            Likes: 0
        };

        await addDoc(collection(db, "Users", email, "posts"), newPost);
        setPosts(prevPosts => [...prevPosts, newPost]);
    };

    return (
        <div className='bg-background h-max'>
            <InputBox addPost={addPost} />
            <Posts posts={posts} db={db} />
        </div>
    );
}

export default MainContent;
