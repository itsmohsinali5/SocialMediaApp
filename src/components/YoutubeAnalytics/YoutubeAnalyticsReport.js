import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
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
  let viewsArray = [];
  let commentsArray = [];
  let dateArray = [];
  const [chart, setChart] = useState();
  const [date, setDate] = useState([]);
  const [comments, setComments] = useState([]);
  const [totalViews, setTotalViews] = useState("");
  const [totalComments, setTotalComments] = useState("");
  const youtubeAnalytics = async () => {
    const response = await axios
      .get(
        `http://localhost:8080/youtube/api/channel-analytics?key=${key}&token=${token}`
      )
      .then((response) => {
        console.log("nhljcanc", response.data.rows);
        for (let i = 0; i < response.data.rows.length; i++) {
          viewsArray.push(response.data.rows[i][1]);
          commentsArray.push(response.data.rows[i][2]);
          setComments(response.data.rows[i][2]);
          dateArray.push(response.data.rows[i][0]);
        }
        setChart({
          labels: dateArray,
          datasets: [
            {
              label: "Comment ",
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
  };

  useEffect(() => {
    youtubeAnalytics();
    console.log(viewsArray, "views");
    console.log(commentsArray, "comments");
    console.log("date", dateArray);
    console.log("comments", commentsArray);
  }, []);

  return (
    <div>
      <p>{totalViews}</p>
      <p>{totalComments}</p>
      <div style={{ width: "800px", height: "800px" }}>
        {chart && <Line data={chart} />}
      </div>

      <p>{}</p>
    </div>
  );
}
export default YoutubeAnalyticsReport;