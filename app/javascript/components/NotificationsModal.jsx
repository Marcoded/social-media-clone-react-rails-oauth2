import React, { useState, useEffect } from "react";
import axios from "axios";

const NotificationModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState([]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const getHeaders = () => {
    const csrfToken = document.querySelector("[name=csrf-token]").content;
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    };
  };

  const getNotification = (userId) => {
    axios
      .get(`/api/v1/notifications/all`, {
        headers: getHeaders(),
      })
      .then((response) => {
        // handle success
        console.log(response.data);
        setNotification(response.data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(
      "fetching notification ---------------------------------------------------------------------"
    );
    getNotification();
  }, []);

  const compileNotification = () => {
    return notification.map((notification) => (
      <div className="h-10  flex items-center justify-evenly w-full" key={notification.id}>
        <img
          
          src={notification.from_user.avatar_url}
          alt=""
          className="rounded-full h-7 w-7 "
        />
        <h1>{notification.message}</h1>
      </div>
    ));
  };

  return (
    <div className="relative">
      <button onClick={openModal} className="btn btn-ghost btn-circle">
        <div className="indicator">
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
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="badge badge-xs badge-primary indicator-item"></span>
        </div>
      </button>
      {isOpen && (
        <div
          onClick={closeModal}
          className="fixed top-0 left-0 z-20 h-screen w-screen"
          id="Background-modal"
        >
          <div
            className="bg-white border absolute right-0  mt-20 mr-20  border-gray-300 rounded p-4 shadow w-80 flex flex-col  "
            id="modal"
          >
            {compileNotification()}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationModal;
