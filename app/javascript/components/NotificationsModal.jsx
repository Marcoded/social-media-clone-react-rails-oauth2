import React, { useState, useEffect } from "react";
import axios from "axios";
import useHeaders from "./UseHeaders.jsx";

const NotificationModal = () => {
  const headers = useHeaders();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const getNotifications = () => {
    axios
      .get(`/api/v1/notifications/all`, {
        headers: headers,
      })
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getNotifications();
  }, [headers]);

  const deleteNotification = (id) => {
    axios
      .post(`/api/v1/notifications/set_read/${id}`, {}, { headers: headers })
      .then(() => {
        getNotifications();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const unreadNotifications = notifications.filter(
    (notification) => !notification.read
  );
  const unreadNotificationCount = unreadNotifications.length;

  const compileNotifications = () => {
    return unreadNotifications.map((notification) => (
      <div
        className="justify-left flex h-10 w-full items-center"
        key={notification.id}
      >
        <img
          src={notification.from_user.avatar_url}
          alt=""
          className="mx-2 h-7 w-7 rounded-full"
        />
        <h1>{notification.message}</h1>
        <button
          onClick={() => deleteNotification(notification.id)}
          className="mx-2 text-slate-400 hover:text-slate-600"
        >
          x
        </button>
      </div>
    ));
  };

  return (
    <div className="relative">
      <button onClick={openModal} className="btn-ghost btn-circle btn">
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
          {unreadNotificationCount === 0 ? null : (
            <span className="badge badge-primary badge-xs indicator-item">
              {unreadNotificationCount}
            </span>
          )}
        </div>
      </button>
      {isOpen && (
        <div
          onClick={closeModal}
          className="fixed left-0 top-0 z-20 h-screen w-screen"
          id="Background-modal"
        >
          <div
            className="absolute right-0 mr-20 mt-20 flex w-80 flex-col rounded border border-gray-300 bg-white p-4 shadow"
            id="modal"
          >
            {unreadNotificationCount === 0 ? (
              <h1>No new notifications</h1>
            ) : (
              compileNotifications()
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationModal;
