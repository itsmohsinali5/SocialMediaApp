import "./Homepage.css";
import Container from "react-bootstrap/Container";
import YoutubeAnalyticsReport from "../YoutubeAnalytics/YoutubeAnalyticsReport";
import TopMobileSearch from "./TopMobileSearch";
import TopCategory from "./TopCategory";
import VideoBlock from "./VideoBlock";
import PopularChannels from "./PopularChannels";

import FatFooter from "../Footer/FatFooter";
import ContentWrapper from "../Atomics/ContentWrapper/ContentWrapper";
import FeaturedVideos from "../Channels/FeaturedVideos";

const Homepage = () => {
  return (
    <>
      <ContentWrapper>
        <Container fluid className="pb-0">
          <TopMobileSearch />
          <YoutubeAnalyticsReport />
          <TopCategory />

          <hr />
          {/* <VideoBlock /> */}
          <FeaturedVideos />

          <hr className="mt-0" />
          <PopularChannels />
        </Container>

        <FatFooter />
      </ContentWrapper>
    </>
  );
};

export default Homepage;
