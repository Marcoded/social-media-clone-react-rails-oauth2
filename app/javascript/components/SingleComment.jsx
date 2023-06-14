import React from "react"
import UserAndName from "./UserAndName"
import { comment } from "postcss"
const SingleComment = (props) => {
    return (
        <>
            <UserAndName creator={props.user} scale="small"></UserAndName>
            <p>{props.comment.body}</p>
            <div className="divider" />
           
        </>
    )
}

export default SingleComment