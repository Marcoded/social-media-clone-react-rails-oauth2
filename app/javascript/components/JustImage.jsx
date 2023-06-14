import React from "react";
import PostModal from "./PostModal";

const JustImage = (props) => {
  console.log("login props ---------------")
  console.log(props)
  return (
    <div className="relative">
      <img
        className="max-h-56 rounded-lg aspect-square"
        src={props.image_url}
        alt=""
      />
      <div className="absolute start-0 left-0 inset-0">
        <h1 className="text-white">{props.postId}</h1>
      <PostModal postId = {props.postId}></PostModal>
      </div>
    </div>
  );
};

export default JustImage;
