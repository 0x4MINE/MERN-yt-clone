import { useEffect, useState, useMemo } from "react";
import Menu from "../componants/Menu";
import NavBar from "../componants/NavBar";
import VideoCard from "../componants/VideoCard";
import UploadVideo from "../componants/UploadVideo";
import { useLocation } from "react-router-dom";
import useVideo from "../store/useVideo";
import useHistory from "../store/useHistory";

const Home = ({ path }) => {
  const { videos, getVideos, searchVideos, getVideoById } = useVideo();
  const { getHistory, history } = useHistory();
  const [open, setOpen] = useState(false);
  const [historyVideos, setHistoryVideos] = useState([]);
  const search = useLocation().search;
  const query = new URLSearchParams(search).get("query");

  useEffect(() => {
    if (path === "/history") getHistory();
    else if (path) getVideos(path);
    else searchVideos(query);
  }, [path, query, getHistory, getVideos, searchVideos]);

  useEffect(() => {
    if (path === "/history" && history?.length > 0) {
      const fetchHistoryVideos = async () => {
        const videos = await Promise.all(history.map((id) => getVideoById(id)));
        setHistoryVideos(videos.filter((v) => v));
        console.log("videos:", videos);
      };
      fetchHistoryVideos();
    } else {
      setHistoryVideos([]); 
    }
  }, [history, getVideoById, path]);
  

  return (
    <>
      {open && <UploadVideo setOpen={() => setOpen(false)} />}
      <div className="container">
        <NavBar uploadOnClick={() => setOpen(true)} />
        <div className="page">
          <Menu />
          <div className="videos-section">
            {path === "/history" ? (
              historyVideos.length > 0 ? (
                historyVideos.map((video) => (
                  <VideoCard key={video._id} video={video} deletable={true} />
                ))
              ) : (
                <h3 className="no-videos">No Videos in History</h3>
              )
            ) : videos.length > 0 ? (
              videos.map((video) => (
                <VideoCard key={video._id} video={video} deletable={false} />
              ))
            ) : (
              <h3 className="no-videos">No Videos Found</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
