import React, { Component } from "react";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import ReactPlayerCard from "../Atomics/VideoCard/ReactPlayerCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SectionHeader from "../Atomics/SectionHeader/SectionHeader";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#be5fb7",
        borderRadius: "1rem",
        padding: "1px 0px 1px 0px",
        marginTop: "-50px",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#be5fb7",
        borderRadius: "1rem",
        padding: "1px 0px 1px 0px",
        marginTop: "-50px",
      }}
      onClick={onClick}
    />
  );
}

const TopCategoriesSlider = () => {
  const key = process.env.GOOGLE_API_KEY;
  const token = Cookie.get("token");
  const [videos, setVideos] = useState([]);
  const channelVideoList = async () => {
    const response4 = await axios
      .get(
        `http://localhost:8080/youtube/api/my-channel-videos?key=${key}&token=${token}`
      )
      .then((response) => {
        console.log("ascakjm", response);
        setVideos(response.data);
      });
  };

  useEffect(() => {
    channelVideoList();
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

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    className: "center",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <Slider {...settings}>
      {videos.length > 0 &&
        videos.map((item) => {
          return (
            <ReactPlayerCard
              videoUrl={`https://www.youtube.com/watch?v=${item.contentDetails.videoId}`}
              videoTitle={item.snippet.title}
              channelTitle={item.snippet.channelTitle}
              publishedAt={item.snippet.publishedAt}
            />
          );
        })}
    </Slider>
  );
};
export default TopCategoriesSlider;
