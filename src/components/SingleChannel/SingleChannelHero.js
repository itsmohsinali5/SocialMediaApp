import { useEffect, useState } from "react";
import YoutubeApi from "../../API/YoutubeApi";

export default function SingleChannelHero({ mychannelInfo }) {
  const [channelsDetail, setChannelsDetail] = useState([]);

  const key = process.env.GOOGLE_API_KEY;
  const data = JSON.parse(localStorage.getItem("SessionToken"));
  const token = data.accessToken;

  const channelsInfo = async () => {
    const response = await YoutubeApi.get("/channels", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        part: "snippet,statistics,brandingSettings",
        mine: true,
        key: key,
      },
    });
    setChannelsDetail(response.data.items);
    console.log("response2", response.data.items);
  };

  useEffect(() => {
    channelsInfo();
  }, []);

  return (
    <>
      {channelsDetail.length > 0 &&
        channelsDetail.map((item) => (
          <div className="single-channel-image">
            <img
              alt=""
              height={300}
              width="100%"
              src={item.brandingSettings?.image?.bannerExternalUrl}
            />
            {/* <div className="channel-profile">
              <img
                className="channel-profile-img"
                alt=""
                src={item.snippet.thumbnails.default.url}
              />
              <div className="social hidden-xs">
                <a className="fb mr-1" href="#">
                  Facebook
                </a>
                <a className="tw mr-1" href="#"></a>
                <a className="gp" href="#">
                  Google
                </a>
              </div>
            </div> */}
          </div>
        ))}
    </>
  );
}
