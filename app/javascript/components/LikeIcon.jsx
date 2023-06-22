import React, { useState, useEffect } from "react";

export default function LikeIcon(props) {
  const { postId } = props;

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(null);
  const [likeId, setLikeID] = useState(0);

  const asyncCreateLike = async (postId) => {
    console.log("CREATING LIKE");
    const csrfToken = document.querySelector('[name="csrf-token"]').content;
    const response = await fetch(`/api/v1/likes/create?post_id=${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
    });
    const data = await response.json();

    setLiked(true);
    setLikeID(data.likeId);
    setLikeCount(data.likeCount);
    console.log("like id after creating like", data.likeId);
  };

  const asyncDeleteLike = async (likeId) => {
    console.log("DELETING LIKE");
    const csrfToken = document.querySelector('[name="csrf-token"]').content;
    const response = await fetch(`/api/v1/likes/${likeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
    });
    setLiked(false);
    setLikeID(null);

    const data = await response.json();
    console.log("data from deleting like", data);
    setLikeCount(data.likeCount);

   
  };

  

  const isPostLiked = async (postId) => {
    const csrfToken = document.querySelector('[name="csrf-token"]').content;
    const response = await fetch(`api/v1/likes/${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
    });
    const data = await response.json();
    setLiked(data.likedByCurrentUser);
    setLikeCount(data.likeCount);
    setLikeID(data.likeId);
  };

  const handleClick = () => {
    liked ? asyncDeleteLike(likeId) : asyncCreateLike(postId);
  };

  useEffect(() => {
    isPostLiked(postId);
  }, [postId]);

  return (
    <div className="like-icon" onClick={handleClick}>
      <div className="flex items-center ml-2">
        <h1>{likeCount}</h1>
        {liked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#a991f7"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="ml-2 h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="ml-2 h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
