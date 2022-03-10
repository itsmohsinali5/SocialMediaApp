import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import SectionHeader from "../Atomics/SectionHeader/SectionHeader";
import ChannelCard from "../Atomics/ChannelCard/ChannelCard";
import Paginate from "../Atomics/Paginate/Paginate";
import YoutubeApi from "../../API/YoutubeApi";
import { useEffect, useState } from "react";

const ChannelList = () => {
    const key = "AIzaSyCRzUvhuzQkfxmFshgWiBsTZmgPuoQ6NqM";
	const data = JSON.parse(localStorage.getItem('SessionToken'));
	const token = data.accessToken;

	const subscriptions = async () => {
		console.log("Token", token);
        const response = await YoutubeApi.get('/subscriptions', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            params: {
                mine: true,
                key: key
            }
        })
        console.log("response", response);
    }

	useEffect(() => {
		subscriptions();
	},[])

	return (
		<>
			<div className="video-block section-padding ">
				<Row>
					<Col md={12}>
						<SectionHeader heading="Channels" />
					</Col>

					<Col xl={3} sm={6} className="mb-3">
						<ChannelCard
							imgSrc="img/s1.png"
							views="1.4M"
							channelName="Channel Name"
							subscriberCount="382,323"
							outline
						/>
					</Col>
					<Col xl={3} sm={6} className="mb-3">
						<ChannelCard
							imgSrc="img/s1.png"
							views="1.4M"
							channelName="Channel Name"
							subscriberCount="382,323"
							outline
						/>
					</Col>
					<Col xl={3} sm={6} className="mb-3">
						<ChannelCard
							imgSrc="img/s1.png"
							views="1.4M"
							channelName="Channel Name"
							subscriberCount="382,323"
							verified
							isSubscribed
							outline
						/>
					</Col>
					<Col xl={3} sm={6} className="mb-3">
						<ChannelCard
							imgSrc="img/s1.png"
							views="1.4M"
							channelName="Channel Name"
							subscriberCount="382,323"
							outline
						/>
					</Col>
					<Col xl={3} sm={6} className="mb-3">
						<ChannelCard
							imgSrc="img/s1.png"
							views="1.4M"
							channelName="Channel Name"
							subscriberCount="382,323"
							outline
						/>
					</Col>
					<Col xl={3} sm={6} className="mb-3">
						<ChannelCard
							imgSrc="img/s1.png"
							views="1.4M"
							channelName="Channel Name"
							subscriberCount="382,323"
							outline
						/>
					</Col>
					<Col xl={3} sm={6} className="mb-3">
						<ChannelCard
							imgSrc="img/s1.png"
							views="1.4M"
							channelName="Channel Name"
							subscriberCount="382,323"
							outline
						/>
					</Col>
					<Col xl={3} sm={6} className="mb-3">
						<ChannelCard
							imgSrc="img/s1.png"
							views="1.4M"
							channelName="Channel Name"
							subscriberCount="382,323"
							outline
						/>
					</Col>
					<Col xl={3} sm={6} className="mb-3">
						<ChannelCard
							imgSrc="img/s1.png"
							views="1.4M"
							channelName="Channel Name"
							subscriberCount="382,323"
							outline
						/>
					</Col>
					<Col xl={3} sm={6} className="mb-3">
						<ChannelCard
							imgSrc="img/s1.png"
							views="1.4M"
							channelName="Channel Name"
							subscriberCount="382,323"
							verified
							isSubscribed
							outline
						/>
					</Col>
					<Col xl={3} sm={6} className="mb-3">
						<ChannelCard
							imgSrc="img/s1.png"
							views="1.4M"
							channelName="Channel Name"
							subscriberCount="382,323"
							outline
						/>
					</Col>
					<Col xl={3} sm={6} className="mb-3">
						<ChannelCard
							imgSrc="img/s1.png"
							views="1.4M"
							channelName="Channel Name"
							subscriberCount="382,323"
							outline
						/>
					</Col>
				</Row>
			</div>

			<Paginate />
		</>
	);
};

export default ChannelList;
