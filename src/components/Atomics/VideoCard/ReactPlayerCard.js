import "./VideoCard.css";

import {
  VerifiedTooltip,
  UnverifiedTooltip,
} from "../CustomCheckTooltips/CustomCheckTooltips";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";

function ReactPlayerCard({
  videoUrl,
  videoTitle,
  channelTitle,
  viewCount,
  publishedAt,
}) {
    
  return (
    <>
      <div className="video-card">
        <div className="video-card-image">
          <ReactPlayer
            controls={true}
            playIcon
            previewTabIndex
            url={videoUrl}
            height="200"
            width="200"
          />
        </div>
        <div className="video-card-body">
          <div className="video-title">
            <a>{videoTitle}</a>
          </div>
          <div className="video-page text-success-custom">
            {channelTitle} <VerifiedTooltip />
          </div>
          <div className="video-view">
            {viewCount} views &nbsp; &nbsp;
            <FontAwesomeIcon icon={faCalendarAlt} /> {publishedAt}
          </div>
        </div>
      </div>
    </>
  );
}
export function PlayList({ playlistTitle, playlistThumbnail, videoCount, playlistId }) {
    let history=useHistory();
    const ToVideoPage = () => {
    
        history.push(`/playlistvideos${playlistId}`)
      }
  return (
    <>
      <div className="video-card">
        <div onClick={ToVideoPage}   className="video-card-image pointer">
          <div>
            <img  src={playlistThumbnail} />
            <div  className="play-list-count">
              <span>{videoCount}</span>
            </div>
          </div>
        </div>
        <div className="video-card-body">
          <div className="video-title">
            <a>{playlistTitle}</a>
          </div>
        </div>
      </div>
    </>
  );
}


export default ReactPlayerCard;
