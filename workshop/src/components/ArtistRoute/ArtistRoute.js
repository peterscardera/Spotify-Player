import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArtistProfile } from "../../helpers/api-helpers";
import converter from '../../helpers/helpers'
import { useDispatch } from "react-redux";
import {
  requestArtist,
  receivedArtistInfo,
  requestArtistError,
} from "../../actions";


const ArtistRoute = () => {
  const accessToken = useSelector((state) => state.auth.token);
  const artistInfo = useSelector((state) => state.artists.currentArtist);
  console.log(artistInfo);
  const { id } = useParams();

  const dispatch = useDispatch();

  // console.log(id);
  // console.log(accessToken);

  useEffect(() => {
    if (!accessToken) {
      dispatch(requestArtist());
      const spotFetcher = async () => {
        try {
          let data = await fetchArtistProfile(accessToken, id);
          dispatch(receivedArtistInfo(data));
          // console.log(data);
        } catch (err) {
          console.log(err);
          dispatch(requestArtistError());
        }
      };

      spotFetcher();
    }
  }, [accessToken]);

  return (
    <React.Fragment>
      {artistInfo != null && (
        <>
          <img src={artistInfo.info.images[1].url} alt='hot since 82 pic' />
          <div>{artistInfo.info.name}</div>
          <div>{converter(artistInfo.info.followers.total)} Followers</div>
        </>
      )}
    </React.Fragment>
  );
};

export default ArtistRoute;

