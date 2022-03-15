import { useEffect, useState } from "react";
export default function SingleChannelHero({ mychanneltitle }) {
  useEffect(() => {
    console.log("chtitle", mychanneltitle);
  }, []);

  return (
    <>
      <div className="single-channel-image">
        <img className="img-fluid" alt="" src="img/channel-banner.png" />
        <div className="channel-profile">
          <img
            className="channel-profile-img"
            alt=""
            // src={
            //   userData?.profileObj?.imageUrl == ""
            //     ? "img/v4.png"
            //     : userData?.profileObj?.imageUrl
            // }
            alt=""
          />
          {mychanneltitle.map((it) => (
            <div className="social hidden-xs">
              <a className="fb mr-1" href="#"></a>
              <a className="tw mr-1" href="#">
                {it.snippet.channelTitle}
              </a>
              <a className="gp" href="#">
                Google
              </a>
            </div>
          ))}
          ;
        </div>
      </div>
    </>
  );
}
