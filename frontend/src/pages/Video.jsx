import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../componants/NavBar";
import VideoRecommendCard from "../componants/VideoRecommendCard";
import { Share, ThumbsDown, ThumbsUp } from "lucide-react";
import CommentCard from "../componants/CommentCard";
import useVideo from "../store/useVideo";
import useAuth from "../store/useAuth";
import LoadingSpinner from "../componants/LoadingSpinner";
import useComment from "../store/useComment";
import useHistory from "../store/useHistory";

const Video = () => {
  const { id } = useParams();
  const {
    videos,
    selectedVideo,
    subscribe,
    increaseViews,
    selectVideoById,
    getVideos,
    likeVideo,
    dislikeVideo,
  } = useVideo();
  const { addComment } = useComment();
  const { currentUser } = useAuth();
  const { addToHistory } = useHistory();

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const [liked, setLiked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    selectVideoById(id);
    increaseViews(id);
    addToHistory(id);
    getVideos("/recommended");
  }, [id, selectVideoById, getVideos, increaseViews, addToHistory]);

  useEffect(() => {
    if (selectedVideo) {
      setComments(selectedVideo.comments);
      setLikes(selectedVideo.likes.length);
      if (currentUser) {
        setLiked(selectedVideo.likes.includes(currentUser?._id));
        setDisliked(selectedVideo.dislikes.includes(currentUser?._id));
        setSubscribed(
          selectedVideo.user.subscribers.includes(currentUser?._id)
        );
      }
    }
  }, [selectedVideo, currentUser]);

  const handleLike = async () => {
    try {
      if (!currentUser) return;
      await likeVideo(selectedVideo._id);
      setLiked((prev) => !prev);
      setLikes((prev) => (liked ? prev - 1 : prev + 1));
      if (disliked) {
        setDisliked(false);
      }
    } catch (error) {
      console.error("Error liking video:", error);
    }
  };

  const handleDislike = async () => {
    try {
      if (!currentUser) return;
      await dislikeVideo(selectedVideo._id);
      setDisliked((prev) => !prev);
      if (liked) {
        setLiked(false);
        setLikes((prev) => prev - 1);
      }
    } catch (error) {
      console.error("Error disliking video:", error);
    }
  };

  const handleComment = async () => {
    if (!currentUser) return;
    if (!comment) return;
    const newComment = await addComment({
      video: id,
      content: comment,
    });

    setComments((prev) => [...prev, { ...newComment, user: currentUser }]);

    setComment("");
  };

  const handleSubscribe = () => {
    if (!currentUser) return;
    subscribe(selectedVideo.user._id);
    setSubscribed((prev) => !prev);
  };

  if (!selectedVideo) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <NavBar />
      <div className="video-container">
        <div className="right">
          <div className="video-holder">
            <video key={selectedVideo._id} controls autoPlay>
              <source
                src={
                  selectedVideo?.videoUrl ||
                  "https://example.com/default-video.mp4"
                }
              />
            </video>

            <h3>{selectedVideo.title}</h3>
            <div className="subscribe">
              <div className="channel">
                <img
                  src={selectedVideo.user?.profilePic || "default-profile.jpg"}
                  alt="Profile"
                  className="userImg"
                />
                <div className="channel-info">
                  <h3>{selectedVideo.user?.name || "Unknown"}</h3>
                  <p>
                    {selectedVideo.user?.subscribers.length || 0} subscribers
                  </p>
                </div>
                {currentUser?._id !== selectedVideo.user._id && (
                  <button
                    style={{
                      backgroundColor: subscribed ? "#3f3f3f" : "white",
                      color: subscribed ? "white" : "black",
                    }}
                    onClick={handleSubscribe}
                  >
                    {subscribed ? "Unsubscribed" : "Subscribe"}
                  </button>
                )}
              </div>
              <div className="react">
                <div className="like-dislike">
                  <div className="like">
                    <ThumbsUp
                      fillOpacity={0.5}
                      fill={liked ? "white" : "none"}
                      onClick={handleLike}
                    />
                    <p>{likes}</p>
                  </div>
                  <hr className="like-devider" />
                  <div className="dislike">
                    <ThumbsDown
                      fillOpacity={0.5}
                      focusable="true"
                      fill={disliked ? "white" : "none"}
                      onClick={handleDislike}
                    />
                  </div>
                </div>
                <div className="share">
                  <Share />
                  <p>Share</p>
                </div>
              </div>
            </div>
          </div>
          <div className="comments-holder">
            <h3>{comments.length || 0} Comments</h3>
            {currentUser && (
              <div className="add-comment">
                <img
                  src={currentUser?.profilePic || "default-profile.jpg"}
                  alt="Profile"
                  className="userImg"
                />
                <div className="comment-input">
                  <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    type="text"
                  />
                  <button disabled={!comment} onClick={handleComment}>
                    Post
                  </button>
                </div>
              </div>
            )}
            {comments
              .slice()
              .reverse()
              .map((comment) => (
                <CommentCard key={comment._id} comment={comment} />
              ))}
          </div>
        </div>
        <div className="left">
          {videos.map((video) => (
            <VideoRecommendCard
              title={video.title}
              key={video._id}
              id={video._id}
              channelName={video.user?.name}
              date={video.createdAt}
              views={video.views}
              thumbnailUrl={video.thumbnailUrl}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Video;
