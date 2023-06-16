import React from "react";
import UserAndName from "./UserAndName";
import { comment } from "postcss";
const SingleComment = (props) => {
  return (
    <>
      <div className="flex flex-col items-start justify-start text-left align-middle">
        <UserAndName creator={props.user} scale="small"></UserAndName>
        <p className="mx-3">{props.comment.body}</p>
        <div className="divider" />
      </div>
    </>
  );
};

export default SingleComment;
