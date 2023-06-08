import React, { useEffect, useState } from "react";
import axios from "axios";

const FollowBtn = (props) => {
  const [followInfo, setFollowInfo] = useState(null);

  const getHeaders = () => {
    const csrfToken = document.querySelector("[name=csrf-token]").content;
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    };
  };

  const getFollowInfo = (userId) => {
    axios
      .get(`/api/v1/follows/show?user_id=${userId}`, {
        headers: getHeaders(),
      })
      .then((response) => {
        // handle success
        console.log(response.data);
        console.log("setting follow info");
        setFollowInfo(response.data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    getFollowInfo(props.user.id);
  }, []);

  const createFollow = (userId) => {
    axios
      .post(
        "/api/v1/follows/create",
        { user_id: userId },
        {
          headers: getHeaders(),
        }
      )
      .then((response) => {
        // handle success
        console.log(response.data);
        setFollowInfo((prevFollowInfo) => ({
          ...prevFollowInfo,
          follow: {
            ...prevFollowInfo.follow,
            exists: true,
            id: response.data.follow.id,
          },
        }));
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const unFollow = async (userId) => {
    try {
      const response = await axios.delete("/api/v1/follows/destroy", {
        params: { user_id: userId },
        headers: getHeaders(),
      });
      console.log(response.data);
      setFollowInfo((prevFollowInfo) => ({
        ...prevFollowInfo,
        follow: {
          ...prevFollowInfo.follow,
          exists: false,
          id: null,
        },
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const renderedButton2 = () => {
    if (!followInfo) return;

    return followInfo.follow.exists ? (
      <button
        onClick={() => unFollow(props.user.id)}
        className="btn btn-outline btn-ghost btn-xs"
      >
        Unfollow
      </button>
    ) : (
      <button
        onClick={() => createFollow(props.user.id)}
        className="btn btn-outline btn-secondary btn-xs"
      >
        {followInfo.followed_back.exists ? "Follow back" : "Follow"}
      </button>
    );
  };

  return renderedButton2();
};

export default FollowBtn;
