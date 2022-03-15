import "../SingleChannel/SingleChannel.css";
import Container from "react-bootstrap/Container";
import ThinFooter from "../Footer/ThinFooter";
import ContentWrapper from "../Atomics/ContentWrapper/ContentWrapper";
import SingleChannelNav from "../SingleChannel/SingleChannelNav";
import PlaylistList from "./PlaylistList";
import SingleChannelHero from "../SingleChannel/SingleChannelHero";



const Playlist = () => {
	return (
		<>
			<ContentWrapper className="single-channel-page">
			<SingleChannelHero/>
				<SingleChannelNav />
				<Container fluid>
					<PlaylistList />
				</Container>
			</ContentWrapper>

			<ThinFooter />
		</>
	);
};

export default Playlist;
