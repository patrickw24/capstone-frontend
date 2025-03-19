import React from "react";
import { useState } from "react";

export const AddTweet = () => {
  const email1 = window.localStorage.getItem("social-email");
  const [formData, setFormData] = useState({ content: "", email: email1 });
  const [notification, setNotification] = useState("");

  const onChangeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    const tmpObject = formData;
    tmpObject[property] = value;
    setFormData(tmpObject);
  };

  const token = window.localStorage.getItem("social-credential");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = import.meta.env.VITE_BASE_URL;
    const newURL = `${url}/posts`;

    if (!formData.content) {
      setNotification("Please Enter Message");
      return;
    }
    const response = await fetch(newURL, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setNotification("Tweet Posted... Please wait!");

      setTimeout(() => {
        window.location.href = "#/posts";
      }, 1000);
    }
  };

  return (
    <div className="container addTweetCSS">
      <div className="card text-white bg-primary">
        <div className="card-body">
          <h4 className="card-title text-center">Create Message</h4>

          <form onSubmit={handleSubmit}>
            <fieldset>
              <div>
                <label className="form-label mt-4"></label>
                <textarea
                  onChange={onChangeHandler}
                  type="text"
                  className="form-control"
                  name="content"
                  placeholder="Enter Message..."
                />
              </div>

              <button type="submit" className="btn btn-info mt-4 mr-4">
                Post Message
              </button>
            </fieldset>
          </form>
          <p className="mr-3 mt-3 text-danger"> {notification} </p>
        </div>
      </div>
    </div>
  );
};
