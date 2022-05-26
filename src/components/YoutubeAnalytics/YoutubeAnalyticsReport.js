import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import CountUp from "react-countup";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ContentWrapper from "../Atomics/ContentWrapper/ContentWrapper";
import { BallTriangle } from "react-loader-spinner";
import SectionHeader from "../Atomics/SectionHeader/SectionHeader";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);

const YoutubeAnalyticsReport = () => {
  const key = process.env.GOOGLE_API_KEY;
  const token = Cookie.get("token");
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(false);
  let viewsArray = [];
  let commentsArray = [];
  let dateArray = [];
  let likesArray = [];
  let dislikesArray = [];
  let estimatedMinutesWatchedArray = [];
  const [chart, setChart] = useState();
  const [totalViews, setTotalViews] = useState("");
  const [totalLikes, setTotalLikes] = useState("");
  const [totalDisLikes, setTotalDisLikes] = useState("");
  const [estimatedMinutesWatched, setEstimatedMinutesWatched] = useState("");
  const [totalComments, setTotalComments] = useState("");
  const youtubeAnalytics = async () => {
    setLoading(true);
    const response = await axios
      .get(
        `http://localhost:8080/youtube/api/channel-analytics?key=${key}&token=${token}`
      )
      .then((response) => {
        console.log("nhljcanc", response);
        for (let i = 0; i < response.data.rows.length; i++) {
          viewsArray.push(response.data.rows[i][1]);
          commentsArray.push(response.data.rows[i][2]);
          dateArray.push(response.data.rows[i][0]);
          likesArray.push(response.data.rows[i][3]);
          dislikesArray.push(response.data.rows[i][4]);
          estimatedMinutesWatchedArray.push(response.data.rows[i][5]);
        }
        setChart({
          labels: dateArray ? dateArray : "",
          datasets: [
            {
              label: "Views ",
              data: viewsArray,
              backgroundColor: "white",
              borderColor: "Red",
              tension: 0.1,
              fill: true,
              pointStyle: "rect",
              pointBorderColor: "red",
              pointBackgroundColor: "#fff",
              showLine: true,
            },
          ],
        });

        console.log("dateArray: ", dateArray);
      });

    const totalView = viewsArray.reduce(
      (previousScore, currentScore) => previousScore + currentScore
    );
    setTotalViews(totalView);
    const totalComment = commentsArray.reduce(
      (previousScore, currentScore) => previousScore + currentScore
    );
    setTotalComments(totalComment);
    const totalLike = likesArray.reduce(
      (previousScore, currentScore) => previousScore + currentScore
    );
    setTotalLikes(totalLike);
    const totalDisLike = dislikesArray.reduce(
      (previousScore, currentScore) => previousScore + currentScore
    );
    setTotalDisLikes(totalDisLike);
    const estimatedWatchTime = estimatedMinutesWatchedArray.reduce(
      (previousScore, currentScore) => previousScore + currentScore
    );
    setEstimatedMinutesWatched(estimatedWatchTime);
    setLoading(false);
  };

  useEffect(() => {
    youtubeAnalytics();
  }, []);

  return (
    <>
      <ContentWrapper>
        <Container fluid className="upload-details">
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
          <Row>
            <Col lg={2}>
              <h6 style={{ color: "#be5fb7", textAlign: "center" }}>
                Total Views
              </h6>
              <CountUp
                style={{ display: "flex", justifyContent: "space-around" }}
                end={totalViews}
                duration={3}
              />
            </Col>
            {/* <Col lg={2}></Col> */}
            <Col lg={2}>
              <h6 style={{ color: "#be5fb7", textAlign: "center" }}>
                Total comments
              </h6>
              <CountUp
                style={{ display: "flex", justifyContent: "space-around" }}
                end={totalComments}
                duration={3}
              />
            </Col>
            <Col lg={2}>
              <h6 style={{ color: "#be5fb7", textAlign: "center" }}>
                Total likes
              </h6>
              <CountUp
                style={{ display: "flex", justifyContent: "space-around" }}
                end={totalLikes}
                duration={3}
              />
            </Col>
            <Col lg={2}>
              <h6 style={{ color: "#be5fb7", textAlign: "center" }}>
                Total dislikes
              </h6>
              <CountUp
                style={{ display: "flex", justifyContent: "space-around" }}
                end={totalDisLikes}
                duration={3}
              />
            </Col>
            <Col lg={3}>
              <h6 style={{ color: "#be5fb7", textAlign: "center" }}>
                Total estimated time watched{" "}
              </h6>
              <CountUp
                style={{ display: "flex", justifyContent: "space-around" }}
                end={estimatedMinutesWatched}
                duration={3}
              />
            </Col>
            <Col lg={12}>
              <div style={{ width: "800px", height: "800px" }}>
                {chart && <Line data={chart} />}
              </div>

              <h5>{}</h5>
            </Col>
          </Row>
        </Container>
      </ContentWrapper>
    </>
  );
};
export default YoutubeAnalyticsReport;
