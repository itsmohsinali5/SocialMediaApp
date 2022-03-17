import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SectionHeader from "../Atomics/SectionHeader/SectionHeader";
import ChannelCard from "../Atomics/ChannelCard/ChannelCard";
import Paginate from "../Atomics/Paginate/Paginate";
import YoutubeApi from "../../API/YoutubeApi";
import { useEffect, useState } from "react";

const ChannelList = () => {
  const [subscription, setSubscription] = useState([]);
  const [channel, setChannel] = useState([]);
  const [channelID, setChannelID] = useState([]);

    const key = process.env.GOOGLE_API_KEY;
	const data = JSON.parse(localStorage.getItem('SessionToken'));
	const token = data.accessToken;

	const channelsDetail = async (id) => {
		const response2 = await YoutubeApi.get('/channels', {
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
			params: {
				part: 'snippet, statistics',
				id: id.join(','),
				key: key
			}
		})
		setChannel(response2.data.items);
		console.log("response2", response2.data.items);
	}

	const subscriptions = async () => {
        const response = await YoutubeApi.get('/subscriptions', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            params: {
				part: 'snippet, contentDetails',
                mine: true,
				maxResults: 15,
                key: key

            }
        })
		setSubscription(response.data.items);
		const id = response.data.items.map((item) => {
			return item.snippet.resourceId.channelId;
		})
		channelsDetail(id);
        console.log("response", response.data.items);
    }

	useEffect(() => {
		subscriptions();
	},[])
   

	function nFormatter(num) {
		if (num >= 1000000000) {
		   return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
		}
		if (num >= 1000000) {
		   return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
		}
		if (num >= 1000) {
		   return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
		}
		return num;
   }

	return (
		<>
			<div className="video-block section-padding ">
				<Row>
					<Col md={12}>
						<SectionHeader heading="Subscriptions" />
					</Col>
					{subscription.length > 0 && subscription.map((item, i) => {
						return (
							channel && channel.map((it, j) => (
								item.snippet.title == it.snippet.title ? (
									<Col xl={3} sm={6} className="mb-3">
										<ChannelCard
											imgSrc={item.snippet.thumbnails.default.url}
											views={nFormatter(it.statistics.viewCount)}
											channelName={item.snippet.title}
											subscriberCount={nFormatter(it.statistics.subscriberCount)}
											isSubscribed
										/>
									</Col>
								) : null
							))
						)
					})}
				</Row>
			</div>

			<Paginate />
		</>
	);
};

export default ChannelList;
