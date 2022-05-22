import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import YoutubeApi from "../../API/YoutubeApi";
import ReactPlayer from "react-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { VerifiedTooltip } from "../Atomics/CustomCheckTooltips/CustomCheckTooltips";
import SectionHeader from "../Atomics/SectionHeader/SectionHeader";
import VideoCard from "../Atomics/VideoCard/VideoCard";
import { useEffect, useState } from "react";
import ReactPlayerCard from "../Atomics/VideoCard/ReactPlayerCard";
import { BallTriangle } from "react-loader-spinner";
import Cookie from "js-cookie";
import axios from "axios";

const FeaturedVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const key = process.env.REACT_APP_KEY;
  const token = Cookie.get("token");

  const featuredVideoList = async () => {
    setLoading(true);
    const response4 = await axios
      .get(
        `http://localhost:8080/youtube/api/featured-videos?key=${key}&token=${token}`
      )
      .then((response) => {
        console.log("ascakjm", response);
        setVideos(response.data);
      });
    setLoading(false);
  };

  useEffect(() => {
    featuredVideoList();
  }, []);

  function nFormatter(num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
  }

  return (
    <>
      <div className="video-block section-padding">
        <Row>
          <Col md={12}>
            <SectionHeader heading="Featured Videos" />
            {loading ? (
              <div className="pagination justify-content-center pagination-sm mb-4">
                <BallTriangle
                  height="100"
                  width="100"
                  color="red"
                  ariaLabel="loading"
                />
              </div>
            ) : null}
          </Col>

          {videos.length > 0 &&
            videos.map((item) => {
              return (
                <Col xl={3} sm={6} className="mb-3">
                  <ReactPlayerCard
                    videoUrl={`https://www.youtube.com/watch?v=${item.id}`}
                    videoTitle={item.snippet.title}
                    channelTitle={item.snippet.channelTitle}
                    viewCount={`${nFormatter(item.statistics.viewCount)} views`}
                    publishedAt={`${item.snippet.publishedAt}`}
                  />
                </Col>
              );
            })}
        </Row>
      </div>
    </>
  );
};

export default FeaturedVideos;
