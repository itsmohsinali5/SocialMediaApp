import "./SingleChannel.css";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import ThinFooter from "../Footer/ThinFooter";
import ContentWrapper from "../Atomics/ContentWrapper/ContentWrapper";
import SingleChannelHero from "./SingleChannelHero";
import SingleChannelNav from "./SingleChannelNav";
import ChannelVideos from "./ChannelVideos";
import YoutubeApi from "../../API/YoutubeApi";

const SingleChannel = () => {

  return (
    <>
      <ContentWrapper className="single-channel-page">
        <SingleChannelHero />
        <SingleChannelNav />
        <Container fluid>
          <ChannelVideos />
        </Container>
      </ContentWrapper>

      <ThinFooter />
    </>
  );
};

export default SingleChannel;
