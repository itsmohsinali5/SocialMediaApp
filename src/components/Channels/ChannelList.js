import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SectionHeader from "../Atomics/SectionHeader/SectionHeader";
import ChannelCard from "../Atomics/ChannelCard/ChannelCard";
import YoutubeApi from "../../API/YoutubeApi";
import { useEffect, useState } from "react";
import "./channelStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { BallTriangle } from "react-loader-spinner";
import Cookie from "js-cookie";
import axios from "axios";

const ChannelList = () => {
  const [subscription, setSubscription] = useState([]);
  const [channel, setChannel] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [prePage, setPrePage] = useState("");
  const [loading, setLoading] = useState(false);

  const key = process.env.GOOGLE_API_KEY;
  const token = Cookie.get("token");

  // const channelsDetail = async (id) => {
  //   const response2 = await YoutubeApi.get("/channels", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //     params: {
  //       part: "snippet, statistics",
  //       id: id.join(","),
  //       key: key,
  //     },
  //   });
  //   setChannel(response2.data.items);
  //   console.log("response2", response2);
  // };

  // const subscriptions = async (pageToken) => {
  //   setLoading(true);
  //   const response = await YoutubeApi.get("/subscriptions", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //     params: {
  //       part: "snippet, contentDetails",
  //       mine: true,
  //       maxResults: 4,
  //       key: key,
  //       pageToken: pageToken,
  //     },
  //   });
  //   console.log("ressssss", response.data.items);
  //   if (response.data.items.length == 0) {
  //     setLoading(false);
  //   }
  //   if (response.data.nextPageToken) {
  //     setLoading(false);
  //     setNextPage(response.data.nextPageToken);
  //   } else {
  //     setNextPage("");
  //   }
  //   if (response.data.prevPageToken) {
  //     setLoading(false);
  //     setPrePage(response.data.prevPageToken);
  //   } else {
  //     setPrePage("");
  //   }
  //   setSubscription(response.data.items);
  //   const id = response.data.items.map((item) => {
  //     return item.snippet.resourceId.channelId;
  //   });
  //   channelsDetail(id);
  //   console.log("response", response.data.items);
  // };

  const subscriptionList = async () => {
    const response4 = await axios
      .get(
        `http://localhost:8080/youtube/api/subscriptions?key=${key}&token=${token}`
      )
      .then((response) => {
        console.log("resiiiig", response);
        setSubscription(response.data);
      });
  };

  // const subscriptionDelete = async (Id) => {
  //   const response3 = await YoutubeApi.delete("/subscriptions", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //     params: {
  //       key: key,
  //       id: Id,
  //     },
  //   });
  // };

  useEffect(() => {
    setLoading(false);
    // subscriptions();
    subscriptionList();
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
      <div className="video-block section-padding ">
        <Row style={{ height: "270px" }}>
          <Col md={12}>
            <SectionHeader heading="Subscriptions" />
            {loading ? (
              <div className="pagination justify-content-center pagination-sm mb-4">
                <BallTriangle
                  height="100"
                  width="100"
                  color="red"
                  ariaLabel="loading"
                />
              </div>
            ) : (
              <div>You have not subscribed any channel</div>
            )}
          </Col>
          {subscription.length > 0 &&
            subscription.map((item, i) => {
              return (
                subscription &&
                subscription.map((it, j) =>
                  item.snippet.title == it.snippet.title ? (
                    <Col xl={3} sm={6} className="mb-3">
                      <ChannelCard
                        imgSrc={item.snippet.thumbnails.default.url}
                        views={nFormatter(it.statistics.viewCount)}
                        channelName={item.snippet.title}
                        subscriberCount={nFormatter(
                          it.statistics.subscriberCount
                        )}
                        // deleteSub={() => {
                        //   subscriptionDelete(item.id);
                        // }}
                        isSubscribed
                      />
                    </Col>
                  ) : null
                )
              );
            })}
        </Row>
      </div>

      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center pagination-sm mb-4">
          {prePage && (
            <li
              className="page-item"
              // onClick={() => {
              //   subscriptions(prePage);
              // }}
            >
              <a className="page-link" href="#">
                <FontAwesomeIcon icon={faArrowLeft} /> Previous
              </a>
            </li>
          )}
          {nextPage && (
            <li
              className="page-item"
              // onClick={() => {
              //   subscriptions(nextPage);
              // }}
            >
              <a className="page-link" href="#">
                Next <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};
export default ChannelList;
