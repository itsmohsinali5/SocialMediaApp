import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SectionHeader from "../Atomics/SectionHeader/SectionHeader";
import ChannelCard from "../Atomics/ChannelCard/ChannelCard";
import Paginate from "../Atomics/Paginate/Paginate";
import YoutubeApi from "../../API/YoutubeApi";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import ReactPlayerCard from "../Atomics/VideoCard/ReactPlayerCard";

const ChannelVideos = ({ info }) => {
  const [channeltitle, setChanneltitle] = useState([]);
  let [uploadID, setUploadID] = useState();
  const [videos, SetVideos] = useState([]);
  const key = "AIzaSyC74dosQTFV6UrAalBSCRpY6y8ZcTTco2s";
  const data = JSON.parse(localStorage.getItem("SessionToken"));
  const token = data.accessToken;
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
      setUploadID(id.contentDetails.relatedPlaylists.uploads);
    });
  };
  const subscriptionPlaylist = async () => {
    const response2 = await YoutubeApi.get("/playlistItems", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        part: "snippet,contentDetails",
        playlistId: uploadID,
        key: key,
      },
    });

    console.log("response", response2);
    SetVideos(response2.data.items);
    setChanneltitle(response2.data.items);

    info(response2.data.items);
  };
  useEffect(() => {
    subscriptionChannel();
  }, []);
  useEffect(() => {
    console.log(uploadID);
    subscriptionPlaylist();
  }, [uploadID]);

  return (
    <>
      <>
        <div className="video-block section-padding">
          <Row>
            <Col md={12}>
              <SectionHeader heading="Myvideos" />
            </Col>

            {videos.length > 0 &&
              videos.map((item) => {
                return (
                  <Col xl={3} sm={6} className="mb-3">
                    <ReactPlayerCard
                      videoUrl={`https://www.youtube.com/watch?v=${item.contentDetails.videoId}`}
                      videoTitle={item.snippet.title}
                      channelTitle={item.snippet.publishedAt}
                      publishedAt={item.contentDetails.PublishedAt}
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
