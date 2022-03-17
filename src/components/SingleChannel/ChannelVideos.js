import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SectionHeader from "../Atomics/SectionHeader/SectionHeader";
import ChannelCard from "../Atomics/ChannelCard/ChannelCard";
import Paginate from "../Atomics/Paginate/Paginate";
import YoutubeApi from "../../API/YoutubeApi";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import ReactPlayerCard from "../Atomics/VideoCard/ReactPlayerCard";

const ChannelVideos = () => {
  let [uploadID, setUploadID] = useState();
  const [videos, SetVideos] = useState([]);
  const key = process.env.GOOGLE_API_KEY;
  const data = JSON.parse(localStorage.getItem("SessionToken"));
  const token = data.accessToken;

  const subscriptionPlaylist = async (id) => {
    const response2 = await YoutubeApi.get("/playlistItems", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        part: "snippet,contentDetails",
        playlistId: id.join(''),
        key: key,
      },
    });
    console.log("response", response2);
    SetVideos(response2.data.items);
  };

  const subscriptionChannel = async () => {
    const response = await YoutubeApi.get("/channels", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        part: "contentDetails",
        mine: true,
        maxResults: 10,
        key: key,
      },
    });
    console.log("res1", response.data.items);
    const id = response.data.items.map((id) => {
      return id.contentDetails.relatedPlaylists.uploads;
    });
    subscriptionPlaylist(id);
  };

  useEffect(() => {
    subscriptionChannel();
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
