import React from "react";
import Post from "./Post";

const Posts = ({ posts, db }) => {
    return (
        <div className=" max-h-[500px] bg-background">

            {posts.slice(0).reverse().map((post) => (
                <Post key={post.id} message={post.message} username={post.name} picture={post.Picture} email={post.email} db={db} />

            ))}

        </div>
    );
};

export default Posts;
