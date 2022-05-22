import { useHistory } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { PlayList } from "../Atomics/VideoCard/ReactPlayerCard";
import SectionHeader from "../Atomics/SectionHeader/SectionHeader";
import Paginate from "../Atomics/Paginate/Paginate";
import YoutubeApi from "../../API/YoutubeApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";
import axios from "axios";

const PlaylistList = () => {
  const [playlist, setPlaylist] = useState([]);
  let history = useHistory();
  const key = process.env.GOOGLE_API_KEY;
  const token = Cookie.get("token");

  // const playList = async () => {
  //   console.log("Token", token);
  //   const response = await YoutubeApi.get("/playlists", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //     params: {
  //       mine: true,
  //       key: key,
  //       part: "snippet, contentDetails, id",
  //     },
  //   });
  //   setPlaylist(response.data.items);
  //   console.log("data", response);
  //   console.log("response2", response.data.items);
  // };

  // useEffect(() => {
  //   playList();
  // }, []);

  const playList = async () => {
    const response4 = await axios
      .get(
        `http://localhost:8080/youtube/playlist-list?key=${key}&token=${token}`
      )
      .then((response) => setPlaylist(response));
  };

  useEffect(() => {
    playList();
  }, []);

  return (
    <>
      <div className="video-block section-padding ">
        <Row>
          <Col md={12}>
            <SectionHeader heading="Playlists" />
          </Col>

          {playlist.length > 0 &&
            playlist.map((item) => (
              <Col
                xl={3}
                sm={6}
                className="mb-3"
                onClick={() => {
                  history.push({
                    pathname: "/playlistvideos",
                    state: { detail: item.id },
                  });
                }}
              >
                <PlayList
                  playlistThumbnail={item.snippet.thumbnails.default.url}
                  playlistTitle={item.snippet.title}
                  videoCount={item.contentDetails.itemCount}
                  playlistId={item.id}
                />
              </Col>
            ))}
        </Row>
      </div>
      <Paginate />
    </>
  );
};

export default PlaylistList;
