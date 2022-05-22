import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import Cookie from "js-cookie";
import Chart from "chart.js/auto";

export default function YoutubeAnalyticsReport() {
  const [label, setLabel] = useState([]);
  const [data, setData] = useState([]);
  const key = process.env.GOOGLE_API_KEY;
  const token = Cookie.get("token");

  React.useEffect(() => {
    axios
      .get(
        `http://localhost:8080/youtube/api/channel-analytics?key=${key}&token=${token}`
      )
      .then((response) => {
        setLabel(Object.keys(response).map((key) => response.data.rows[0]));
        setData(Object.keys(response).map((key) => response.data.rows[1]));
        console.log(response.data.rows);
      });
  }, []);

  return (
    <div>
      <h1>cnlaskn</h1>
      <Bar
        data={{
          labels: label,
          datasets: [
            {
              label: "My First dataset",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255,99,132,0.4)",
              hoverBorderColor: "rgba(255,99,132,1)",
              data: data,
            },
          ],
        }}
      />
    </div>
  );
}
