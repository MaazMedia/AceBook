import React from "react";
import Post from "./Post";

interface PostData {
    id: number;
    message: string;
    name: string;
    Picture: string;
    email: string;
    Likes: number;
}

interface Props {
    posts: PostData[];
}

const Posts: React.FC<Props> = ({ posts }) => {
    return (
        <div className="max-h-[500px] bg-background">
            {posts.slice(0).reverse().map((post) => (
                <Post key={post.id} message={post.message} username={post.name} picture={post.Picture} email={post.email} />
            ))}
        </div>
    );
};

export default Posts;
