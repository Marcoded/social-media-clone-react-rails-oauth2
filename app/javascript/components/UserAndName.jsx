import React from "react";
import { Link } from "react-router-dom";

const UserAndName = (props) => {

  console.log("entering user and name, props are", props)

  const scale = () => {
    if (props.scale === "large") {
      return { imgClass: "h-20 w-20", textClass: "text-3xl" };
    }
    if (props.scale === "medium") {
      return { imgClass: "h-10 w-10", textClass: "text-base" };
    }
    if (props.scale === "small") {
      return { imgClass: "h-6 w-6", textClass: "text-sm" };
    }

    if (props.scale === "main") {
      return { imgClass: "h-24 w-24", textClass: "text-3xl mx-5" };
    }
    return { imgClass: "h-10 w-10", textClass: "" };
  };

  const { imgClass, textClass } = scale();

  return (
    <div className="flex flex-row justify-left items-center m-3">
      <img
        className={`${imgClass} object-cover object-center rounded-full`}
        src={props.creator.avatar_url}
        alt=""
      />

      <Link
        to={`/users/${props.creator.id}`}
        className={`font-bold mx-3 ${textClass}`}
        tabIndex="-1"
      >
        {props.creator.full_name}
      </Link>
    </div>
  );
};

export default UserAndName;
