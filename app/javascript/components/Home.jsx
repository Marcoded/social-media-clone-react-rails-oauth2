import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import PostCard from "./PostCard";
import { formatDistanceToNow } from "date-fns";
import useHeaders from "./UseHeaders";
import axios from "axios";

export default function Home() {
  headers = useHeaders();

  const [posts, setPosts] = useState([]);



  const getPosts = () => {
    axios.get("/api/v1/posts", { headers: headers }).then((response) => {
      setPosts(response.data);
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
        return "Yesterday";
      } else {
        return `${daysDiff} days ago`;
      }
    } else {
      const options = { year: "numeric", month: "long", day: "numeric" };
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
    <div className="bg-base-200">
      <NavBar getPosts={getPosts} />
      <div className=" flex flex-col items-center justify-center">
        {compilePosts(posts)}
      </div>
    </div>
  );
}
