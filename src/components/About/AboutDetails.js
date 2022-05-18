import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { PlayList } from "../Atomics/VideoCard/ReactPlayerCard";
import SectionHeader from "../Atomics/SectionHeader/SectionHeader";
import Paginate from "../Atomics/Paginate/Paginate";
import YoutubeApi from "../../API/YoutubeApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Cookie from "js-cookie";

const AboutDetails = () => {
  const [channelsDetail, setChannelsDetail] = useState([]);
  // const youtubeBaseUrl = process.env.YOUTUBE_API_BASE_URL;
  const { YOUTUBE_API_BASE_URL } = process.env;
  console.log("URLLLLL", process.env.YOUTUBE_API_BASE_URL);
  const key = process.env.GOOGLE_API_KEY;
  const token = Cookie.get("token");

  const channelsInfo = async (id) => {
    const response = await axios
      .get(
        `${YOUTUBE_API_BASE_URL}/youtube/api/creator-about?key=${key}&token=${token}`
      )
      .then((response) => setChannelsDetail(response.data));
  };

  // const channelsInfo = async (id) => {
  //   const response = await YoutubeApi.get("/channels", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //     params: {
  //       part: "snippet,statistics",
  //       mine: true,
  //       key: key,
  //     },
  //   });
  //   setChannelsDetail(response.data.items);
  //   console.log("response2", response.data.items);
  // };

  useEffect(() => {
    channelsInfo();
  }, []);

  return (
    <>
      <div className="video-block section-padding ">
        <Row>
          {/* <Col md={12}>
            <SectionHeader heading="Description" />
          </Col> */}

          {channelsDetail.length > 0 &&
            channelsDetail.map((item) => (
              <Row className="mx-md-n5">
                <Col xl={7} className="px-5 ml-3">
                  <h6 style={{ fontWeight: "bold" }}>Description</h6>
                  <h6>{item.snippet.description}</h6>
                  <hr />
                </Col>
                <Col xl={4} className="px-md-5 ml-5">
                  <h6 style={{ fontWeight: "bold" }}>Stats</h6>
                  <hr />
                  <h6>
                    Joined{" "}
                    <Moment
                      format="MMM D, YYYY"
                      date={item.snippet.publishedAt}
                    />
                  </h6>
                  <hr />
                  <h6>{item.statistics.viewCount} views</h6>
                  <hr />
                </Col>
              </Row>
            ))}
        </Row>
      </div>
    </>
  );
};

export default AboutDetails;
