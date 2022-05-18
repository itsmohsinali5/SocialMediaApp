import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SectionHeader from "../Atomics/SectionHeader/SectionHeader";
import ChannelCard from "../Atomics/ChannelCard/ChannelCard";
import Paginate from "../Atomics/Paginate/Paginate";
import YoutubeApi from "../../API/YoutubeApi";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import ReactPlayerCard from "../Atomics/VideoCard/ReactPlayerCard";
import Cookie from "js-cookie";
import axios from "axios";

const ChannelVideos = () => {
  let [uploadID, setUploadID] = useState();
  const [videos, SetVideos] = useState([]);
  const key = process.env.GOOGLE_API_KEY;
  const token = Cookie.get("token");

  const channelVideoList = async () => {
    const response4 = await axios
      .get(
        `http://localhost:8080/youtube/api/my-channel-videos?key=${key}&token=${token}`
      )
      .then((response) => {
        console.log("ascakjm", response);
        SetVideos(response.data);
      });
  };

  useEffect(() => {
    channelVideoList();
  }, []);

  return (
    <>
      <>
        <div className="video-block section-padding">
          <Row>
            <Col md={12}>
              <SectionHeader heading="My Videos" />
            </Col>

            {videos.length > 0 &&
              videos.map((item) => {
                return (
                  <Col xl={3} sm={6} className="mb-3">
                    <ReactPlayerCard
                      videoUrl={`https://www.youtube.com/watch?v=${item.contentDetails.videoId}`}
                      videoTitle={item.snippet.title}
                      channelTitle={item.snippet.channelTitle}
                      publishedAt={item.snippet.publishedAt}
                    />
                  </Col>
                );
              })}
          </Row>
        </div>
      </>
    </>
  );
};

export default ChannelVideos;
