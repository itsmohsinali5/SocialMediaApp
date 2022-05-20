import React from "react";
import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import axios from "axios";

const YoutubeAnalyticsReport = () => {
  const [chartData, setChartData] = useState([]);
  const key = process.env.GOOGLE_API_KEY;
  const token = Cookie.get("token");
  const [analytics, setAnalytics] = useState([]);

  const youtubeAnalytics = async () => {
    const response4 = await axios
      .get(
        `http://localhost:8080/youtube/api/channel-analytics?key=${key}&token=${token}`
      )
      .then((response) => {
        console.log("nhljcanc", response.data.rows);
        setAnalytics(response.data.rows);
      });
  };

  useEffect(() => {
    youtubeAnalytics();
  }, []);

  return (
    <div>
      <h3>YoutubeReports</h3>
    </div>
  );
};

export default YoutubeAnalyticsReport;
