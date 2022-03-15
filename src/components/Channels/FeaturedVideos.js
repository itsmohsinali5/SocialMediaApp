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

export default function FeaturedVideos() {
  const [videos, setVideos] = useState([]);

  const key = "AIzaSyC74dosQTFV6UrAalBSCRpY6y8ZcTTco2s";
  const data = JSON.parse(localStorage.getItem("SessionToken"));
  const token = data.accessToken;

  const feturedVideos = async () => {
    const response = await YoutubeApi.get("/videos", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        part: "snippet, contentDetails, statistics",
        chart: "mostPopular",
        regionCode: "PK",
        maxResults: 4,
        key: key,
      },
    });
    setVideos(response.data.items);
    console.log("videos", response.data.items);
  };

  useEffect(() => {
    feturedVideos();
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
          </Col>

          {videos.length > 0 &&
            videos.map((item) => {
              return (
                <Col xl={3} sm={6} className="mb-3">
                  <ReactPlayerCard
                    videoUrl={`https://www.youtube.com/watch?v=${item.id}`}
                    videoTitle={item.snippet.title}
                    channelTitle={item.snippet.channelTitle}
                    viewCount={nFormatter(item.statistics.viewCount)}
                    publishedAt={item.snippet.publishedAt}
                  />
                </Col>
              );
            })}
        </Row>
      </div>
    </>
  );
}
