import React, { useState, useEffect } from "react";
import LikeIcon from "./LikeIcon";
import PostModal from "./PostModal";
import UserAndName from "./UserAndName";

export default function PostCard(props) {
  const { postId } = props;

  return (
    <>
      <div className="card card-compact my-5  w-96 bg-base-100 shadow-xl rounded-md font-sans ">
        <UserAndName creator={props.creator} scale="medium" />

        <figure>
          <img src={props.image_url} alt="" />
        </figure>
        <div className="card-body">
          <p className="font-lato">{props.body}</p>
      
        
          <div className="card-actions justify-end">
            <div></div>
            <PostModal postId={postId}  />
            <LikeIcon postId={postId} />
          </div>
        </div>
      </div>
    </>
  );
}
