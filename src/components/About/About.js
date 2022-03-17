import "../SingleChannel/SingleChannel.css";
import Container from "react-bootstrap/Container";
import ThinFooter from "../Footer/ThinFooter";
import ContentWrapper from "../Atomics/ContentWrapper/ContentWrapper";
import SingleChannelNav from "../SingleChannel/SingleChannelNav";
import SingleChannelHero from "../SingleChannel/SingleChannelHero";
import AboutDetails from "./AboutDetails";

const About = () => {
	return (
		<>
			<ContentWrapper className="single-channel-page">
			<SingleChannelHero/>
				<SingleChannelNav />
				<Container fluid>
					<AboutDetails />
				</Container>
			</ContentWrapper>

			<ThinFooter />
		</>
	);
};

export default About;
