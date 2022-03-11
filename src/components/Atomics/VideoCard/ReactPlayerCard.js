import "./VideoCard.css";

import {
	VerifiedTooltip,
	UnverifiedTooltip,
} from "../CustomCheckTooltips/CustomCheckTooltips";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from 'react-player';

function ReactPlayerCard({
    videoUrl,
    videoTitle,
    channelTitle,
    viewCount,
    publishedAt
}) {
	return (
		<>
			<div className="video-card">
                <div className="video-card-image">
                    <ReactPlayer controls={true} playIcon previewTabIndex url={videoUrl} height="200" width="200" />
                </div>
                <div className="video-card-body">
                    <div className="video-title">
                        <a>{videoTitle}</a>
                    </div>
                    <div
                        className="video-page text-success-custom"
                    >
                        {channelTitle}{" "}
                        <VerifiedTooltip />
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

export default ReactPlayerCard;
