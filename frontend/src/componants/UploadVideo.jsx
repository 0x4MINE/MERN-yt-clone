import { useState, useEffect, useRef } from "react";
import FileInput from "../componants/FileInput";
import axiosInstance from "../libs/axiosInstance";
import { Navigate, useNavigate } from "react-router-dom";

const UploadVideo = ({ setOpen }) => {
  const [video, setVideo] = useState(null);
  const [img, setImg] = useState(null);
  const [inputs, setInputs] = useState({});
  const [videoPerc, setVideoPerc] = useState(0);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoUrl, setVideoUrl] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const navigate = useNavigate();

  const handleFileUpload = async (file, fieldName) => {
    if (!file) return;

    const formData = new FormData();
    formData.append(fieldName, file);

    try {
      setUploadError(null);
      const res = await axiosInstance.post(
        `/video/upload-${fieldName}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            if (fieldName === "video") setVideoPerc(percentCompleted);
            else setImgPerc(percentCompleted);
          },
        }
      );

      if (fieldName === "video") setVideoUrl(res.data.url);
      else setThumbnailUrl(res.data.url);

      if (fieldName === "video") setVideoPerc(0);
      else setImgPerc(0);
    } catch (error) {
      setUploadError(`Failed to upload ${fieldName}`);
      console.error(`Error uploading ${fieldName}:`, error);
    }
  };

  useEffect(() => {
    const generateThumbnail = () => {
      if (!video || img) return;

      const videoElement = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const videoURL = URL.createObjectURL(video);
      videoElement.src = videoURL;

      videoElement.onloadedmetadata = () => {
        videoElement.currentTime = videoElement.duration / 2;
      };

      videoElement.onseeked = async () => {
        await new Promise((resolve) => setTimeout(resolve, 100));

        const videoWidth = videoElement.videoWidth;
        const videoHeight = videoElement.videoHeight;
        const canvasWidth = 480; 
        const canvasHeight = (canvasWidth * videoHeight) / videoWidth;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

        const thumbnailDataUrl = canvas.toDataURL("image/png");
        setThumbnailUrl(thumbnailDataUrl);

        fetch(thumbnailDataUrl)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], "thumbnail.png", {
              type: "image/png",
            });
            handleFileUpload(file, "thumbnail");
          });
      };
    };

    generateThumbnail();
  }, [video, img]);

  useEffect(() => {
    return () => {
      if (videoRef.current?.src) {
        URL.revokeObjectURL(videoRef.current.src);
      }
    };
  }, [video]);

  return (
    <div className="uploadPopup">
      <div className="uploadContainer">
        <div className="uploadHeader">
          <h2>Upload Video</h2>
          <button onClick={() => setOpen(false)}>X</button>
        </div>

        <div className="uploadBody">
          {/* Thumbnail Input */}
          <FileInput
            label="Thumbnail"
            accept="image/*"
            name="thumbnail"
            onChange={(e) => {
              setImg(e.target.files[0]);
              handleFileUpload(e.target.files[0], "thumbnail");
            }}
          />
          {imgPerc > 0 && <p>Uploading Thumbnail: {imgPerc}%</p>}

          {/* Video Input */}
          <FileInput
            label="Video"
            accept="video/*"
            name="video"
            onChange={(e) => {
              setVideo(e.target.files[0]);
              handleFileUpload(e.target.files[0], "video");
            }}
          />
          {videoPerc > 0 && <p>Uploading Video: {videoPerc}%</p>}

          {/* Hidden Video Player for Thumbnail Generation */}
          <video ref={videoRef} hidden />
          <canvas ref={canvasRef} hidden />

          {/* Thumbnail Preview */}
          {thumbnailUrl && (
            <img
              src={thumbnailUrl}
              alt="Thumbnail Preview"
              style={{ width: "100%", maxHeight: "200px", borderRadius: "8px" }}
            />
          )}

          {/* Video Details */}
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            onChange={(e) =>
              setInputs({ ...inputs, description: e.target.value })
            }
          />

          {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}

          {/* Upload Button */}
          <button
            disabled={!videoUrl || !thumbnailUrl}
            onClick={async () => {
              if (!videoUrl || !thumbnailUrl)
                return alert("Upload not complete!");

              await axiosInstance.post("/video/crud/upload", {
                title: inputs.title,
                description: inputs.description,
                videoUrl,
                thumbnailUrl,
              });

              alert("Video Uploaded!");
              setOpen(false);
              navigate("/");
            }}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;
