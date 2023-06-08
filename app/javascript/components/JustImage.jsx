import React from "react";
const JustImage = (props) => {
  return (
    <img
      className="h-auto max-w-full rounded-lg aspect-square"
      src={props.image_url}
      alt=""
    />
  );
};

export default JustImage