import React, { useState, useEffect } from "react";
import LikeIcon from "./LikeIcon";
import PostModal from "./PostModal";
import UserAndName from "./UserAndName";

export default function PostCard(props) {
  const { postId } = props;
  console.log("postcard props : ", props);

  return (
    <>
      <div className="card card-compact my-5 w-96 rounded-md bg-base-100 font-sans shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <UserAndName className="ml-5" creator={props.creator} scale="medium" />
          </div>
          <div className="ml-auto mr-5">
            <p className="text-sm text-slate-500">{props.formatedDate}</p>
          </div>
        </div>

        <figure>
          <img src={props.image_url} alt="" />
        </figure>
        <div className="card-body">
          <p className="">{props.body}</p>

          <div className="card-actions justify-end">
            <div></div>
            <PostModal Getpost={props.getpost} postId={postId} />
            <LikeIcon postId={postId} />
          </div>
        </div>
      </div>
    </>
  );
}
