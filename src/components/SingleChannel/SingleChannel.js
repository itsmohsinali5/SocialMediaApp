import "./SingleChannel.css";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import ThinFooter from "../Footer/ThinFooter";
import ContentWrapper from "../Atomics/ContentWrapper/ContentWrapper";
import SingleChannelHero from "./SingleChannelHero";
import SingleChannelNav from "./SingleChannelNav";
import ChannelVideos from "./ChannelVideos";

const SingleChannel = () => {
  // const [picture, setPicture] = useState("");

  const getInfo = (data) => {
    console.log("channel", data);
    setChanneltitle(data);
  };

  const [channeltitle, setChanneltitle] = useState([]);

  return (
    <>
      <ContentWrapper className="single-channel-page">
        <SingleChannelHero mychanneltitle={channeltitle} />
        <SingleChannelNav />
        <Container fluid>
          <ChannelVideos info={getInfo} />
        </Container>
      </ContentWrapper>

      <ThinFooter />
    </>
  );
};

export default SingleChannel;
