import VideoTitle from "../VideoPage/VideoTitle";
import AuthorBox from "../VideoPage/AuthorBox";
import VideoDescription from "../VideoPage/VideoDescription";
import CommentBox from "../VideoPage/CommentBox";
import { useEffect, useState } from "react";
import YoutubeApi from "../../API/YoutubeApi";
import Cookie from "js-cookie";

const SingleVideoLeft = ({ videoId }) => {
  const [video, setVideo] = useState();
  const token = Cookie.get("token");
  const key = process.env.GOOGLE_API_KEY;

  const comments = async () => {
    console.log("videoId==>", videoId);
    const response = await YoutubeApi.get("/commentThreads", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        part: "snippet",
        textFormat:"html",
        videoId: videoId,
        key: "AIzaSyArZ0Te01G66wvhBnneyPYwTx2iWvSkz2Y",
      },
    });
    setVideo(response);
    console.log("ressssponse", response);
  };

  useEffect(() => {
    // comments();
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
      <div className="single-video-left">
        {console.log("dasdasdas", videoId)}
        <VideoTitle
          title="Contrary to popular belief, Lorem Ipsum (2020) is
							not."
          views="2,729,347"
        />

        <AuthorBox
          subscriberCount="1.4M"
          imgSrc="img/s4.png"
          channelName="Osahan Channel"
          verified
          publishedOn="Aug 10, 2020"
        />

        <VideoDescription />

        <CommentBox />
      </div>
    </>
  );
};

export default SingleVideoLeft;
