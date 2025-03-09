import React from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

const VideoRecommendCard = ({
  id,
  thumbnailUrl,
  title,
  channelName,
  views,
  date
}) => {
  return (
    <Link to={'/video/'+id} className="recommend-card">
      <img
        className="recommend-card-img"
        src={thumbnailUrl}
        alt=""
      />
      <div className="recommend-card-info">
        <h3> {title}</h3>
        <p>{channelName}</p>
        <p>{views} views * {format(date)}</p>
      </div>
    </Link>
  );
};

export default VideoRecommendCard;
