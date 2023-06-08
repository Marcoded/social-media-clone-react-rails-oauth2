import React from "react";

const PostPreview = (props) => {
  return (
    <div className="relative group">
      <div className="aspect-w-1 aspect-h-1">
        <img
          className="w-full h-full object-cover object-center rounded"
          src={props.image_url}
          alt=""
        />
      </div>
      <div className="flex items-center justify-center absolute inset-0 invisible group-hover:visible">
        <div className="absolute inset-0 bg-slate-600 opacity-70 rounded-xl"></div>
        <h1 className="text-white z-10 mx-2">{props.likeCount}</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#a991f7"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="w-6 h-6 z-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </div>
    </div>
  );
};

export default PostPreview;
