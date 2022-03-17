import { Link } from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { useEffect, useState } from "react";

import { VerifiedTooltip } from "../Atomics/CustomCheckTooltips/CustomCheckTooltips";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import YoutubeApi from "../../API/YoutubeApi";

export default function SingleChannelNav({ channelName }) {

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

  const [colorVideos, setColorVideos] = useState(true);
  const [colorPlaylist, setColorPlaylist] = useState(false);
  const [colorChannel, setColorChannel] = useState(false);
  const [colorAbout, setColorAbout] = useState(false);

  const TurnPlaylistRed = () => {
    setColorPlaylist(true);
    setColorVideos(false);
    setColorChannel(false);
    setColorAbout(false);
  };
  const TurnVideosRed = () => {
    setColorVideos(true);
    setColorPlaylist(false);
    setColorChannel(false);
    setColorAbout(false);
  };

  const TurnChannelRed = () => {
    setColorChannel(true);
    setColorPlaylist(false);
    setColorVideos(false);
    setColorAbout(false);
  };

  const TurnAboutRed = () => {
    setColorAbout(true);
    setColorChannel(false);
    setColorPlaylist(false);
    setColorVideos(false);
  };

  return (
    <>
      <div className="single-channel-nav">
        <Navbar expand="lg">
        {channelsDetail.length > 0 &&
          channelsDetail.map((item) => (
          <Navbar.Brand className="channel-brand">
            {item.snippet.title} <VerifiedTooltip />
          </Navbar.Brand>
        ))}
          <Navbar.Toggle aria-controls="navbarSupportedContent" />

          <Navbar.Collapse id="navbarSupportedContent">
            <Nav as="ul" className="mr-auto">
              <li
                onClick={TurnVideosRed}
                className={colorVideos ? "nav-item active" : "nav-item"}
              >
                <Link className="nav-link " to="/single-channel">
                  Videos
                </Link>
              </li>
              <li
                onClick={TurnPlaylistRed}
                className={colorPlaylist ? "nav-item active" : "nav-item"}
              >
                <Link className="nav-link" to="/playlist">
                  Playlists
                </Link>
              </li>
              <li
                onClick={TurnChannelRed}
                className={colorChannel ? "nav-item active" : "nav-item"}
              >
                <Link className="nav-link">Channels</Link>
              </li>
              <li
                onClick={TurnAboutRed}
                className={colorAbout ? "nav-item active" : "nav-item"}
              >
                <Link className="nav-link" to="/about">About</Link>
              </li>

              {/* <NavDropdown title="Donate" id="basic-nav-dropdown">
                <NavDropdown.Item href="#">Action</NavDropdown.Item>
                <NavDropdown.Item href="#">Another action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">Something</NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <Form inline className=" my-2 my-lg-0">
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-1"
                size="sm"
              />
              <Button
                variant="outline-success"
                size="sm"
                className="my-2 my-sm-0"
              >
                <FontAwesomeIcon icon={faSearch} />
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button variant="outline-danger" size="sm">
                Subscribe <strong>1.4M</strong>
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
}
