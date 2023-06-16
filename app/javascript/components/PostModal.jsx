import React, { useState, useEffect } from "react";
import axios from "axios";
import UserAndName from "./UserAndName";
import SingleComment from "./SingleComment";

const PostModal = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [postInfo, setPostInfo] = useState();

  const size = () => {
     if (props.display === "hidden") return "h-64 w-64 opacity-0"
     return "h-6 w-6"
  }

  const openModal = () => {
    getPostInfo();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleOverlayClick = (event) => {
    if (event.target.id == "Background") {
      console.log("closing modal");
      closeModal();
    }
  };

  const displayComments = () => {
    return postInfo.comments.map((comment) => {
      return (
        <SingleComment key={comment.id} comment={comment} user={comment.user} />
      );
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const csrfToken = document.querySelector('[name="csrf-token"]').content;
    await fetch(`/api/v1/comments/create?post_id=${props.postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
      body: JSON.stringify({
        body: event.target.elements.body.value,
      }),
    });

    // Clear the form input values
    event.target.elements.body.value = "";
    getPostInfo();
  };

  const getPostInfo = async () => {
    console.log("entering post info fonction");
    console.log("fetching post info with if of", props.postId);
    const csrfToken = document.querySelector('[name="csrf-token"]').content;
    const response = await fetch(`/api/v1/posts/${props.postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
    });
    const data = await response.json();
    setPostInfo(data);
    console.log("data from post modal", data);
  };

  return (
    <div>

      <svg
        onClick={openModal}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={size()}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
        />
      </svg>

      {isOpen && postInfo && (
        <div
        id="Background"
          className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50 backdrop-blur bg-black/50"
          onClick={handleOverlayClick}
        >
        

          <div className="z-10 flex rounded-lg bg-white shadow-lg">
            <img
              className=" object-fit max-h-[calc(100vh-10rem)] max-w-[calc(90vw-10rem)] object-cover object-center"
              src={postInfo.image_url}
              alt=""
            />

            <div className="flex w-96 flex-col bg-slate-50 px-5">
              <UserAndName creator={postInfo.creator}></UserAndName>

              <p className="px-5" style={{ flexGrow: 0 }}>
                {postInfo.body}
              </p>

              <div className="divider" />

              <div className="h-96 flex-grow overflow-auto ">
                {displayComments()}
              </div>

              <div className="justify-end">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="body"
                    placeholder="Add a comment"
                    className="input w-3/4 max-w-xs focus:outline-none"
                  />
                  <button type="submit">Publish</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostModal;
