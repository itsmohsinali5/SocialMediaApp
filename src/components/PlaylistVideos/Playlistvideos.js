import { useLocation } from "react-router-dom";
import "../VideoPage/VideoPage.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Cookie from "js-cookie";
import ThinFooter from "../Footer/ThinFooter";
import ContentWrapper from "../Atomics/ContentWrapper/ContentWrapper";

import VideoCardList from "../VideoPage/VideoCardList";
import SingleVideoRight from "./SingleVideoRight";
import SingleVideoLeft from "./SingleVideoLeft";
import { useEffect, useState } from "react";
import YoutubeApi from "../../API/YoutubeApi";

const PlaylistVideoPage = () => {
  const [video, setVideo] = useState("");
  const [videoId, setVideoId] = useState();
  const [playlistItem, setPlaylistItem] = useState([]);
  const key = "AIzaSyArZ0Te01G66wvhBnneyPYwTx2iWvSkz2Y";
  const token = Cookie.get("token");
  const location = useLocation();

  const comments = async (id) => {
    console.log("key",key)
    const responseComment = await YoutubeApi.get("/commentThreads", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        part: "snippet",
        textFormat:"html",
        videoId: id,
        key: key,
      },
    });
    setVideoId(responseComment);
    console.log("ressssponse", responseComment);
  };

  const playList = async () => {
    console.log("Token", token);
    const response = await YoutubeApi.get("/playlistItems", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        part: "snippet, contentDetails, id",
        playlistId: location.state.detail,
      },
    });
    setPlaylistItem(response.data.items);
    setVideo(response.data.items[0].contentDetails.videoId);
    comments(response.data.items[0].contentDetails.videoId);
  };

  const displayVideo = (e) => {
    setVideo(e);
    console.log("dataaa", e);
  };

  useEffect(() => {
    playList();
  }, []);
  //   function nFormatter(num) {
  //     if (num >= 1000000000) {
  //       return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
  //     }
  //     if (num >= 1000000) {
  //       return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  //     }
  //     if (num >= 1000) {
  //       return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  //     }
  //     return num;
  //   }

  return (
    <>
      <ContentWrapper>
        <Container fluid>
          <div className="video-block-right-list section-padding">
            <Row className="mb-4">
              <Col md={8}>
                <div className="single-video">
                  <iframe
                    title="Youtube Video"
                    width="100%"
                    height="315"
                    src={`https://www.youtube-nocookie.com/embed/${video}?rel=0&amp;controls=0&amp;showinfo=0`}
                    frameborder="0"
                    allow=" encrypted-media"
                    allowfullscreen
                  ></iframe>
                </div>
              </Col>

              <Col md={4}>
                {playlistItem.length > 0 &&
                  playlistItem.map((item) => (
                    <div className="video-slide	r-right-list">
                      <VideoCardList
                        onClick={() => {
                          displayVideo(item.contentDetails.videoId);
                        }}
                        imgSrc={item.snippet.thumbnails.medium.url}
                        time="3:50"
                        videoTitle={item.snippet.title}
                        views="1.8M"
                        timeAgo={`${item.snippet.publishedAt}`}
                        videoCategory="Education"
                        verified
                      />
                    </div>
                  ))}
              </Col>
            </Row>
          </div>

          <div className="video-block section-padding">
            <Row>
              <Col md={8}>
                <SingleVideoLeft videoId={video} />
              </Col>

              {/* <Col md={4}>
								<SingleVideoRight />
							</Col> */}
            </Row>
          </div>
        </Container>
        <ThinFooter />
      </ContentWrapper>
    </>
  );
};

export default PlaylistVideoPage;
