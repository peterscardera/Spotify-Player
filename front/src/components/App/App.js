import React, { useEffect } from "react";
import ArtistRoute from '../ArtistRoute'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import GlobalStyles from "../GlobalStyles";
import { useDispatch } from "react-redux";
import {
  requestAccessToken,
  receiveAccessToken,
  receiveAccessTokenError,
} from "../../actions";

const App = () => {
  const dispatch = useDispatch();
  const DEFAULT_ARTIST_ID = "1tRBmMtER4fGrzrt8O9VpS";

  useEffect(() => {
    dispatch(requestAccessToken());

    const spotifyFetcher = async () => {
      try {
        let data = await fetch("https://bootcamp-spotify.herokuapp.com/spotify_access_token")
         console.log(data,"DATAAAA")
        if (data.status === 200) {
        
          let jsonData = await data.json();
            console.log(jsonData)
          dispatch(receiveAccessToken(jsonData.access_token));
        } else console.log("something went wrong");
      } catch (err) {
        console.log(err);
        dispatch(receiveAccessTokenError());
      }
    };
    spotifyFetcher();
  }, []);

  return (
    <React.Fragment>
      <GlobalStyles />

      <Router>
        <Switch>
          <Route exact path="/artists/:id">
            <ArtistRoute/>
          </Route>
          <Route exact path="/">
            <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`} />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
