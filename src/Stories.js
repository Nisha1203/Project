import React from "react";
import { useGlobalContext } from "./context";
import loadingImage from "./images/yellow-dog-cartoon-loading-ew3e959wjluh9so7.gif";
import "./App.css";

const Stories = () => {
  const { hits, isLoading, removePost } = useGlobalContext();
  if (isLoading) {
    return (
      <>
        <div className="loading-container">
          <img src={loadingImage} alt="Loading..." className="loading-image" />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="stories-div">
        {hits.map((currPost) => {
          const { title, author, objectID, url, num_comments } = currPost;
          return (
            <>
              <div className="card" key={objectID}>
                <h2>{title}</h2>
                <p>
                  By <span>{author} </span>| <span>{num_comments}</span>comments
                </p>
                <div className="card-button">
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    Read More
                  </a>

                  {/* objectID to find which particular post ios removed */}
                  <a href="/" onClick={() => removePost(objectID)}>
                    Remove
                  </a>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Stories;
