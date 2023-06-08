import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import PostCard from "./PostCard";

export default function Home() {
  const [posts, setPosts] = React.useState([]);

  const getPosts = () => {
    const csrfToken = document.querySelector('[name="csrf-token"]').content;
    fetch("/api/v1/posts", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      });
  };

  const compilePosts = (posts) => {
    return posts.map((post) => (
  
        <PostCard key={post.id} postId={post.id} body={post.body} title={post.title} image_url={post.image_url} creator={post.creator} />
   
    
    ));
  };
  

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="  bg-gray-200">
      <NavBar />
      <div className=" items-center justify-center flex flex-col">{compilePosts(posts)}
      </div>
    </div>
  );
}
