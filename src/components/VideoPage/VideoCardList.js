import SectionHeader from "../Atomics/SectionHeader/SectionHeader";
import Moment from 'react-moment';

import {
	VerifiedTooltip,
	UnverifiedTooltip,
} from "../Atomics/CustomCheckTooltips/CustomCheckTooltips";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlayCircle,
	faEllipsisV,
	faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

const VideoCardList = ({
	imgAlt = "",
	imgSrc,
	videoTitle,
	videoCategory,
	views,
	timeAgo,
	videoHref = "#",
	time,
	active = null,
	verified = false,
	onClick
}) => {
	const activeStatus = active
		? "video-card video-card-list active"
		: "video-card video-card-list";
	const categoryClass = verified
		? "video-page text-success-custom"
		: "video-page text-danger-custom";
	return (
		<>
			<div className={activeStatus} onClick={onClick}>
				<div className="video-card-image">
					<a className="play-icon" >
						<FontAwesomeIcon icon={faPlayCircle} />
					</a>
					
						<img className="img-fluid" src={imgSrc} alt={imgAlt} />
					
					<div className="time">{time}</div>
				</div>

				<div className="video-card-body">
					<SectionHeader
						dropdownOnly
						icon={faEllipsisV}
						noIconLabel
					/>

					<div className="video-title">
						<a >{videoTitle}</a>
					</div>
					<div className={categoryClass}>
						{videoCategory}{" "}
						{verified ? <VerifiedTooltip /> : <UnverifiedTooltip />}
					</div>
					<div className="video-view">
						{views} views &nbsp;
						<FontAwesomeIcon icon={faCalendarAlt} /> <Moment fromNow date={timeAgo} />

					</div>
				</div>
			</div>
		</>
	);
};

export default VideoCardList;
