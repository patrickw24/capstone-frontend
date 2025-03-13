import React from "react";
import { useState, useEffect } from "react";

export const Wall = () => {
  const [tweets, setTweets] = useState([]);
  const token = window.localStorage.getItem("social-credential");
  console.log(token);
  
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
  }, []);

  

  return (
    <>
      <h2>Posts</h2>
      <div className="container centerdiv" style={{ height: "100vh" }}>
        {tweets.map((tweet) => (
          <div
            key={tweet.email}
            className="card border-info mb-3"
            style={{ maxWidth: "50rem" }}
          >
            <div className="card-header">{tweet.created_at}</div>
            <div className="card-body">
              <h4 className="card-title">{tweet.content}</h4>
              <p className="card-text">{tweet.email}</p>
              <button> btn  </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
