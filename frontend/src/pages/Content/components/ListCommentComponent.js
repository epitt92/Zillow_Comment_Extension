// functional component that lists all the current comments related to the page
import React, {
  useEffect,
  useInsertionEffect,
  useState,
  className,
} from "react";
// import CommentServices from "../services/CommentServices";
// import ReplyBottonComponent from "./ReplyBottonComponent";
// import { v4 } from 'uuid';
// import { useDispatch, useSelector } from "react-redux";
// import { registerAction } from "../../Popup/redux/slices/commontSlice";

const ListCommentComponent = ({comments}) => {

  return (
    <div className="container">
      <div>
        {comments.map((comment, idx) => (
          <div
            className="card mb-3"
            key={"comment"+idx}
          >
            <div className="card-body">
              <div className="col-xl-11">
                <div className="row">
                  <p>
                    <strong> @{comment.username}</strong>
                    <span className="mx-2 color-me">
                      {comment.timestamp}
                    </span>
                  </p>
                </div>
                <p> {comment.content}</p>
                {/* <ReplyBottonComponent /> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListCommentComponent;
