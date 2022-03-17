import "../SingleChannel/SingleChannel.css";
import Container from "react-bootstrap/Container";
import ThinFooter from "../Footer/ThinFooter";
import ContentWrapper from "../Atomics/ContentWrapper/ContentWrapper";
import SingleChannelNav from "../SingleChannel/SingleChannelNav";
import Channelseclist from "./Channelseclist";
import SingleChannelHero from "../SingleChannel/SingleChannelHero";

const Channelsec = () => {
  return (
    <>
      <ContentWrapper className="single-channel-page">
        <SingleChannelHero />
        <SingleChannelNav />
        <Container fluid>
          <Channelseclist />
        </Container>
      </ContentWrapper>

      <ThinFooter />
    </>
  );
};

export default Channelsec;
