import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";
import PostPreview from "./PostPreview";
import UserAndName from "./UserAndName";
import JustImage from "./JustImage";
import FollowBtn from "./Follow";

const UserPage = () => {
  const { id } = useParams();

  const [userInfo, setUserInfo] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  const getUserInfo = (id) => {
    const csrfToken = document.querySelector("[name=csrf-token]").content;

    axios
      .get(`/api/v1/users/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
      })
      .then((response) => {
        // handle success
        console.log(response.data);
        setUserInfo(response.data.user);
        setUserPosts(response.data.posts);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    getUserInfo(id);
  }, [id]);

  const compileUserPosts = (posts) => {
    return posts.map((post) => (
      <PostPreview
        key={post.id}
        postId={post.id}
        body={post.body}
        title={post.title}
        image_url={post.image_url}
        creator={post.creator}
        likeCount={post.like_count}
      />
    ));
  };

  const compileUserPosts2 = (posts) => {
    return posts.map((post) => (
      <JustImage
        key={post.id}
        postId={post.id}
        body={post.body}
        title={post.title}
        image_url={post.image_url}
        creator={post.creator}
        likeCount={post.like_count}
      />
    ));
  };

  return (
    <>
      <NavBar />
      {userInfo ? (
        <div className="h-screen w-screen flex flex-col items-center ">
          <div className="flex  justify-between align-middle items-center">
            <UserAndName creator={userInfo} scale="main" />
            <FollowBtn user={userInfo}/>
          </div>

          <div className="w-full lg:w-1/2 grid grid-cols-custom gap-2">
            {compileUserPosts2(userPosts)}
          </div>
        </div>
      ) : (
        <span className="loading loading-spinner loading-md"></span>
      )}
    </>
  );
};

export default UserPage;
