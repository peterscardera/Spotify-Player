import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArtistProfile, fetchTopTracks } from "../../helpers/api-helpers";
import converter from "../../helpers/helpers";
import Genres from "./Genres";
import TopTrack from "./TopTrack";

import { useDispatch } from "react-redux";
import {
  requestArtist,
  receivedArtistInfo,
  requestArtistError,
  receiveTopTracks,
  finishReceivingAllArtistInfo,
} from "../../actions";

const ArtistRoute = () => {
  const [ currentlyPlaying, setCurrentlyPlaying] = useState(null)


  const accessToken = useSelector((state) => state.auth.token);
  const artistInfo = useSelector((state) => state.artists.currentArtist);
  const fetchedTopT = useSelector((state) => state.artists.topTracks);

  // promiseAll completed the state status becomes finished
  const finishedState = useSelector((state) => state.artists.status);

  const { id } = useParams();

  const dispatch = useDispatch();

  // console.log(id);
  // console.log(accessToken);

  useEffect(() => {
    if (accessToken) {
      dispatch(requestArtist());

      const spotFetcher = async () => {
        try {
          let data = await fetchArtistProfile(accessToken, id);
          dispatch(receivedArtistInfo(data));

          let trackData = await fetchTopTracks(accessToken, id);
          dispatch(receiveTopTracks(trackData));

          Promise.all([data, trackData])
            .then(() => {
              dispatch(finishReceivingAllArtistInfo());
            })
            .catch((err) => {
              dispatch(requestArtistError());
              console.log(err);
            });
        } catch (err) {
          console.log(err);
        }
      };
      spotFetcher();
    } else {
      return;
    }
  }, [accessToken]);

  return (
    <React.Fragment>
      {finishedState === "finished" && (
        <>
          <StyledImg
            src={artistInfo.info.images[1].url}
            alt="hot since 82 pic"
          />
          <StyledName>{artistInfo.info.name}</StyledName>
          <StyledNumber>
            {converter(artistInfo.info.followers.total)}{" "}
            <StyledFollowers> Followers</StyledFollowers>
          </StyledNumber>
          {fetchedTopT.map((eachTrack, index) => {
            return (
              <>
                <TopTrack currentlyPlaying={currentlyPlaying}  setCurrentlyPlaying={setCurrentlyPlaying} key={index} eachTrack={eachTrack}></TopTrack>
              </>
            );
          })}

          <div>tags</div>
          <Genres twoGenres={artistInfo.info.genres}> </Genres>
          <div> related artists component</div>
        </>
      )}
    </React.Fragment>
  );
};

export default ArtistRoute;

const StyledImg = styled.img`
  width: 175px;
  height: 175px;
  border-radius: 190.5px;
`;

const StyledName = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 59px;
  text-shadow: 4px 8px 25px #000000, 0px 4px 4px rgba(0, 0, 0, 0.5),
    1px 2px 2px rgba(0, 0, 0, 0.75);
`;
const StyledNumber = styled.div`
  color: #ff4fd8;
  text-transform: lowercase;
  display: flex;
`;
const StyledFollowers = styled.div`
  color: white;
`;
