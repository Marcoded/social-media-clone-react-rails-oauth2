import React, { useState, useEffect } from "react";
import UserAndName from "./UserAndName";
import SingleComment from "./SingleComment";

const PostModal = (props) => {
  const { postId } = props;
  const [isOpen, setIsOpen] = useState(false);

  const [comments, setComments] = useState([]);

  const openModal = () => {
    setIsOpen(true);
    getComment(postId);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const displayComments = () => {
    return comments.map((comment) => {
      return (
        <SingleComment key={comment.id} comment={comment} user={comment.user} />
      );
    });
  };

  const getComment = async (post_id) => {
    console.log("fetching comment for", postId);
    const csrfToken = document.querySelector('[name="csrf-token"]').content;
    const response = await fetch(
      `/api/v1/comments/get_post_comment?post_id=${postId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setComments(data);
    // do something with the data
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const csrfToken = document.querySelector('[name="csrf-token"]').content;
    await fetch(`/api/v1/comments/create?post_id=${postId}`, {
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
    getComment(postId);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      >
        Open Modal
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleOverlayClick}
          />

          <div className="bg-white rounded-lg shadow-lg z-10 flex">

            <img
              className="max-h-[calc(100vh-10rem)] max-w-[calc(90vw-10rem)]"
              src={props.image_url}
              alt=""
            />

            <div className="w-96  bg-slate-50 flex flex-col">
              <UserAndName creator={props.creator} scale="medium" />
              <p className="" style={{ flexGrow: 0 }}>
                {props.body}
              </p>

              <div className="divider" />
              <div className="h-96 overflow-auto ">{displayComments()}</div>

              <div className="justify-end">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="body"
                    placeholder="Add a comment"
                    className="input w-full max-w-xs focus:outline-none"
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
