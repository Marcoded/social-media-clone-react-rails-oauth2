import React, { useState, useEffect } from "react";
import LikeIcon from "./LikeIcon";
import PostModal from "./PostModal";
import UserAndName from "./UserAndName";

export default function PostCard(props) {
  const { postId } = props;

  return (
    <>
      <div className="card card-compact w-96 bg-base-100 shadow-xl rounded-md my-2">
        <UserAndName creator={props.creator} scale="medium" />

        <figure>
          <img src={props.image_url} alt="" />
        </figure>
        <div className="card-body">
          <p>{props.body}</p>
      
        
          <div className="card-actions justify-end">
            <PostModal creator={props.creator} image_url={props.image_url} body={props.body} postId={postId}  />
            <LikeIcon postId={postId} />
          </div>
        </div>
      </div>
    </>
  );
}
