import React, { useEffect, useState } from "react";
import axios from "axios";
import useHeaders from "./UseHeaders";

const FollowBtn = (props) => {
  const [followInfo, setFollowInfo] = useState(null);

  headers = useHeaders();

  const getFollowInfo = (userId) => {
    axios
      .get(`/api/v1/follows/show?user_id=${userId}`, {
        headers: headers,
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
          headers: headers,
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
        headers: headers,
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
        id="Unfollow"
        onClick={() => unFollow(props.user.id)}
        className="btn-ghost btn-outline btn-xs btn"
      >
        Unfollow
      </button>
    ) : (
      <button
        id="Follow"
        onClick={() => createFollow(props.user.id)}
        className="btn-secondary btn-outline btn-xs btn"
      >
        {followInfo.followed_back.exists ? "Follow back" : "Follow"}
      </button>
    );
  };

  return renderedButton2();
};

export default FollowBtn;
