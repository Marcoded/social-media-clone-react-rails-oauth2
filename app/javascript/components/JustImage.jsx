import React, { useState } from "react";
import PostModal from "./PostModal";

const JustImage = (props) => {
  console.log("login props ---------------");

  return (
    <div className="relative">
      <img
        className="aspect-square max-h-56 rounded-lg"
        src={props.image_url}
        alt=""
      />
      <div className="absolute inset-0 left-0 start-0">
        <PostModal display="hidden" postId={props.postId}></PostModal>
      </div>
    </div>
  );
};

export default JustImage;
