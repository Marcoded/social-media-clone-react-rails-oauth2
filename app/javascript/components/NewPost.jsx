import axios from "axios";
import React, { useState } from "react";
import useHeaders from "./UseHeaders.jsx";

const NewPost = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageLink, setImageLink] = useState(
    "https://www.travelandleisure.com/thmb/pY4RFYpZ4Je81EnNwZZMmUyINSM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/header-SANFRAN1121-eb3b40fea0de4cb5aa346d00eb66f16f.jpg"
  );
  const [description, setDescription] = useState("");
  const [imageError, setImageError] = useState(false);

  const headers = useHeaders()

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleOverlayClick = (event) => {
    if (event.target.id === "Background") {
      console.log("closing modal");
      closeModal();
    }
  };

  const imageLinker = async (e) => {
    const inputValue = e.target.value;
    if (inputValue.trim() === "") {
      setImageLink(
        "https://www.travelandleisure.com/thmb/pY4RFYpZ4Je81EnNwZZMmUyINSM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/header-SANFRAN1121-eb3b40fea0de4cb5aa346d00eb66f16f.jpg"
      );
      setImageError(false);
    } else {
      const isValidImage = await validateImage(inputValue);
      if (isValidImage) {
        setImageLink(inputValue);
        setImageError(false);
      } else {
        setImageError(true);
      }
    }
  };

  const validateImage = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        "/api/v1/posts/create",
        {
          post: {
            image_url: imageLink,
            body: description,
          },
        },
        {
          headers,
        }
      );
  
      console.log("Post created successfully:", response.data);
      closeModal();
      props.getPosts()
    
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <>
      <button onClick={openModal} className="btn-ghost btn-circle btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-400"
          onClick={handleOverlayClick}
        >
          <div  className="fixed inset-0  bg-black/50 bg-opacity-50 backdrop-blur" id="Background" />
          <div className="z-10 flex h-2/3 w-2/3 rounded-lg bg-neutral shadow">
            <form className="flex flex-col p-8 bg-base-200">
              <input
                onChange={imageLinker}
                type="text"
                placeholder="Image link"
                className={`input-bordered input-primary input mb-4 ${
                  imageError ? "border-red-500" : ""
                }`}
              />
              {imageError && (
                <p className="mb-2 text-red-500">
                  Invalid image URL. Please enter a valid URL.
                </p>
              )}
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                className="textarea-bordered textarea mb-4"
                placeholder="Description"
              ></textarea>
              <button onClick={handleFormSubmit} className="btn-primary btn-outline btn">Post</button>
            </form>
            <div className="relative flex-1">
              <img
                className="h-full w-full object-cover"
                src={imageLink}
                alt=""
              />
              <div className="absolute inset-0 flex items-end justify-center">
                <h1 className="mb-4 max-h-full max-w-full break-words rounded-md bg-black px-5 text-2xl font-bold text-white">
                  {description}
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewPost;
