import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import PostCard from "./PostCard";
import { formatDistanceToNow } from "date-fns";

export default function Home() {
  const [posts, setPosts] = React.useState([]);

  const getPosts = () => {
    const csrfToken = document.querySelector('[name="csrf-token"]').content;
    fetch("/api/v1/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  };

  const dateConverter = (datestring) => {
    const date = new Date(datestring);
    const now = new Date();
    const timeDiff = now.getTime() - date.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  
    if (daysDiff <= 10) {
      if (daysDiff === 0) {
        const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
        if (hoursDiff === 0) {
          const minutesDiff = Math.floor(timeDiff / (1000 * 60));
          return `${minutesDiff} minutes ago`;
        } else {
          return `${hoursDiff} hours ago`;
        }
      } else if (daysDiff === 1) {
        return 'Yesterday';
      } else {
        return `${daysDiff} days ago`;
      }
    } else {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    }
  };

  const compilePosts = (posts) => {
    return posts.map((post) => (
      <PostCard
        key={post.id}
        likeCount={post.like_count}
        postId={post.id}
        body={post.body}
        title={post.title}
        image_url={post.image_url}
        creator={post.creator}
        formatedDate={dateConverter(post.created_at)}
  
      />
    ));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="bg-base-200" >
      <NavBar getPosts={getPosts} />
      <div className=" flex flex-col items-center justify-center">
        {compilePosts(posts)}
      </div>
    </div>
  );
}
