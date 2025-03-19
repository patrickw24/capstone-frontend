import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const Wall = () => {
  const [size, setSize] = useState(window.screen.availWidth);
  const [divCenterClass, setDivCenterClass] = useState("centerdiv");
  const [tweets, setTweets] = useState([]);
  const [notification, setNotification] = useState("");
  const token = window.localStorage.getItem("social-credential");
  const { posts_id } = useParams();
  const globalUser = window.localStorage.getItem("social-email");

  const getTweets = async () => {
    const url = import.meta.env.VITE_BASE_URL;
    const newURL = `${url}/posts`;

    const response = await fetch(newURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (response.ok) {
      const result = await response.json();
      setTweets(result);
    } else {
      console.log("Failed to Fetch Tweets");
    }
  };

  useEffect(() => {
    getTweets();
    if (size < 600) {
      setDivCenterClass("centerdivMobile");
    }
  }, []);

  const commentButton = (id) => {
    window.location.href = `/comments/${id}`;
  };

  const deletePost = async (id, postEmail) => {
    const token = window.localStorage.getItem("social-credential");

    const url = import.meta.env.VITE_BASE_URL;
    const newURL = `${url}/posts/${id}`;

    const response = await fetch(newURL, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });
    if (response.ok) {
      getTweets();
    }
  };

  return (
    <>
      <div className={`container ${divCenterClass}`}>
        {tweets.map((tweet) => (
          <div key={tweet.posts_id} className="card border-info mb-3">
            <div className="card-header">{tweet.created_at}</div>
            <div className="card-body">
              <h4 className="card-title">{tweet.content}</h4>
              <p className="card-text">{tweet.email}</p>

              <div className="row">

                <div className="col">
                  <button
                    type="button"
                    onClick={() => commentButton(tweet.posts_id)}
                    className="btn btn-info"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-chat-left-dots-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                    </svg>
                  </button>

                  {globalUser === tweet.email ? (
                    <div className="col">
                      <button
                        type="button"
                        onClick={() => deletePost(tweet.posts_id, tweet.email)}
                        className="btn btn-danger ms-5"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash3"
                          viewBox="0 0 16 16"
                        >
                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
