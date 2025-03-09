import { MoreVertical, ThumbsDown, ThumbsUp } from "lucide-react";
import React, { useEffect } from "react";
import { format } from "timeago.js";

import useComment from "../store/useComment";
import useAuth from "../store/useAuth";

const CommentCard = ({
  comment: { _id, content, createdAt, user, video, likes, dislikes },
}) => {
  const { likeComment, dislikeComment } = useComment();

  const [liked, setLiked] = React.useState(false);
  const [disliked, setDisliked] = React.useState(false);

  const { currentUser } = useAuth();

  useEffect(() => {
    console.log(_id);
    if (likes.includes(currentUser._id)) setLiked(true);
    if (dislikes.includes(currentUser._id)) setDisliked(true);
  }, [currentUser]);

  return (
    <div className="comment-card">
      <div className="comment-right">
        <img src={user.profilePic} alt="" className="userImg" />
        <div className="comment-info">
          <div className="comment-meta">
            <h3>@{user.name}</h3>
            <p>{format(createdAt)}</p>
          </div>
          <h5 className="comment-content">{content}</h5>
          <div className="comment-react">
            <ThumbsUp
              cursor={"pointer"}
              fillOpacity={0.5}
              fill={liked ? "white" : "none"}
              onClick={() => {
                likeComment(_id);
                setLiked((prev) => !prev);
                if (disliked) setDisliked(false);
              }}
            />
            <ThumbsDown
              cursor={"pointer"}
              fillOpacity={0.5}
              fill={disliked ? "white" : "none"}
              onClick={() => {
                dislikeComment(_id);
                setDisliked((prev) => !prev);
                if (liked) setLiked(false);
              }}
            />
            <h6>Reply</h6>
          </div>
        </div>
      </div>
      <div className="more">
        <MoreVertical />
      </div>
    </div>
  );
};

export default CommentCard;
