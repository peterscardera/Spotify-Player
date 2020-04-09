import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchArtistProfile,
  fetchTopTracks,
  fetchRelatedArtists,
} from "../../helpers/api-helpers";
import converter from "../../helpers/helpers";
import Genres from "./Genres";
import TopTrack from "./TopTrack";
import Loading from "../Loading/Loading";
import RelatedArtists from "./RelatedArtists";

import { useDispatch } from "react-redux";
import {
  requestArtist,
  receivedArtistInfo,
  requestArtistError,
  receiveTopTracks,
  receiveRelatedArtists,
  finishReceivingAllArtistInfo,
} from "../../actions";

const ArtistRoute = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  const accessToken = useSelector((state) => state.auth.token);
  const artistInfo = useSelector((state) => state.artists.currentArtist);
  const fetchedTopT = useSelector((state) => state.artists.topTracks);
  const fetchedRelatedA = useSelector((state) => state.artists.relatedArtists);
  console.log(fetchedRelatedA);
  // promiseAll completed the state status becomes finished
  const stateStatus = useSelector((state) => state.artists.status);

  const { id } = useParams();

  const dispatch = useDispatch();

  // console.log(id);
  // console.log(accessToken);

  useEffect(() => {
    if (accessToken) {
      dispatch(requestArtist());

      const spotFetcher = async () => {
        try {
          //*Fetch for the artist information*
          let data = await fetchArtistProfile(accessToken, id);
          dispatch(receivedArtistInfo(data));
          //*Fetch for the artist topTrack*
          let trackData = await fetchTopTracks(accessToken, id);
          dispatch(receiveTopTracks(trackData));
          //*Fetch for the relatedArtists*
          let relatedA = await fetchRelatedArtists(accessToken, id);
          dispatch(receiveRelatedArtists(relatedA));

          Promise.all([data, trackData, relatedA])
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
  }, [accessToken, id]);

  return (
    <React.Fragment>
      {stateStatus === "loading" && <Loading></Loading>}
      {stateStatus === "finished" && (
        <>
          <Wrapper>
            <StyledImg
              src={artistInfo.info.images[1].url}
              alt="hot since 82 pic"
            />
            <StyledName>{artistInfo.info.name}</StyledName>
            <StyledNumber>
              {converter(artistInfo.info.followers.total)}{" "}
              <StyledFollowers> Followers</StyledFollowers>
            </StyledNumber>

            <div>
              {fetchedTopT.map((eachTrack, index) => {
                return (
                  <>
                    <TopTrack
                      currentlyPlaying={currentlyPlaying}
                      setCurrentlyPlaying={setCurrentlyPlaying}
                      key={index}
                      eachTrack={eachTrack}
                    ></TopTrack>
                  </>
                );
              })}
            </div>

            <StyledTag>
              <StyledTitle>tags</StyledTitle>
              <Genres twoGenres={artistInfo.info.genres}> </Genres>
            </StyledTag>

            <StyledTitle>related artists</StyledTitle>
            <WrapperRA>
              {fetchedRelatedA.map((eachRelatedArtist, index) => {
                return (
                  <>
                    <RelatedArtists
                      key={index}
                      eachRelatedArtist={eachRelatedArtist}
                    ></RelatedArtists>
                  </>
                );
              })}
            </WrapperRA>
          </Wrapper>
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

const Wrapper = styled.div`
  height: 100vh;
  margin: 5% 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const WrapperRA = styled.div`
  border-radius: 100px;
  overflow: auto;
  white-space: nowrap;
  width: 50%;

  @media only screen and (max-width: 500px) {
    width: 100%;
  }
`;

const StyledTitle = styled.span`
  font-weight: bold;
`;


const StyledTag = styled.div`

height: 100px;

`