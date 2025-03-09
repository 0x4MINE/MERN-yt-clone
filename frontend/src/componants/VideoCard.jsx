import { Link } from "react-router-dom";
import useHistory from "../store/useHistory";
import { format } from "timeago.js";

const VideoCard = ({ video, deletable }) => {
  const { deleteVideo } = useHistory();

  const handleDelete = (e) => {
    e.preventDefault(); // Prevent Link Navigation
    deleteVideo(video._id);
  };

  return (
    <Link className="video-card" to={`/video/${video?._id}`}>
      {deletable && (
        <div onClick={handleDelete} className="deleteBtn">
          ✖️
        </div>
      )}
      <img
        src={video?.thumbnailUrl || "https://via.placeholder.com/300"}
        alt={video?.title || "Video Thumbnail"}
        className="thumbnail"
      />
      <div className="info">
        <img
          src={video?.user?.profilePic || "/default-avatar.png"}
          alt={video?.user?.name || "User Avatar"}
          className="userImg"
        />
        <div className="text">
          <h3 className="video-title">{video?.title}</h3>
          <h5 className="channel-name">{video?.user?.name}</h5>
          <p className="views-date">
            {video?.views} views ☼ {format(video?.createdAt)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
