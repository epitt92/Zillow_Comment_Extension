import React, { Component, useState } from "react";
// import CommentServices from "../services/CommentServices";
// import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiCaller } from "../../Popup/utils/fetcher";

const AddCommentComponent = ({setComments}) => {
  const [comment, setComment] = useState("");

  const saveComment = async (e) => {
    e.preventDefault();
    
    chrome.storage.local.get(null, async (obj) => {
      let newComment = {
        username: obj.profile.name,
        content: comment,
        url: window.location.href
      };
      console.log(newComment)
      const {data: {success, comments}} = await apiCaller.post("/comments", comment);
      setComments(comments);
      console.log("comments =>"), comments;
    })
  };

  return (
    <div>
      <div className="container">
        <form>
          <div className="form-group">
            <textarea
              type="text"
              placeholder="Enter your comments"
              name="commentContent"
              className="form-control"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <div className="mt-3 ">
            <div className="btn btn-primary " onClick={saveComment}>
              comment
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCommentComponent;
