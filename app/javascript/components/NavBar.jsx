import React, { useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";
import NotificationModal from "./NotificationsModal";
import NewPost from "./NewPost";
import useHeaders from "./UseHeaders.jsx";
import axios from "axios";

export default function NavBar(props) {
  headers = useHeaders();

  const [currentUser, setCurrentUser] = useState(null);



  const signOut = () => {
    axios.delete("/users/sign_out", { headers: headers }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        console.log("User signed out successfully.");
        window.location.href = "/";
      } else {
        console.error("Failed to sign out.");
      }
    });
  };

  const setTheme = () => {
    const currentTheme = document
      .querySelector("html")
      .getAttribute("data-theme");
    let newTheme;
    if (currentTheme === "dark") {
      newTheme = "light";
    } else {
      newTheme = "dark";
    }
    document.querySelector("html").setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    get_current_user();
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      document.querySelector("html").setAttribute("data-theme", storedTheme);
    }
  }, []);

  const get_current_user = () => {
    console.log("getting current_user -----------------------------");
    axios
      .get("./api/v1/users/me", null, headers)
      .then((response) => {
        setCurrentUser(response.data);
      
      })
      .catch((error) => {
        // handle error
      });
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-sm mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <a
                href="https://github.com/Temporal76/social-media-clone-react-rails-oauth2/blob/main/README.md"
                target="_blank"
              >
                About this project
              </a>
            </li>
            <li>
              <a href="https://pollet.dev">My portofolio</a>
            </li>
           
            <li>
              <a onClick={setTheme}> Switch theme</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/" className=" text-xl normal-case text-primary">
          PhotoGram
        </Link>
      </div>
      <div className="navbar-end">
        

        {currentUser && (
          <Link to={`users/${currentUser.userId}`}>
            <button id="profile" className="btn-ghost btn-circle btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </button>
          </Link>
        )}

        <NewPost getPosts={props.getPosts}></NewPost>
        <NotificationModal></NotificationModal>
        <button onClick={signOut} className="btn-ghost btn-circle btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
