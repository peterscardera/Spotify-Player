const initialState = {
  currentArtist: null,
  status: "idle ",
};

export default function artitstReducer(state = initialState, action) {
  // console.log(action)
  switch (action.type) {
    case "REQUEST_ARTIST_INFO": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVED_ARTIST_INFO": {
      //console.log(action);
      //THIS OR BELOW
      // let stateCopy = {...state}
      // stateCopy.currentArtist.profile = action.artistProfile
      return {
        ...state,
        status:'idle',
        currentArtist: {
          info: action.artistProfile,
        },
      };
    }
    case "RECEIVE_TOP_TRACKS": {
      console.log(action, "IT HIT THE CASE TYPE");
      let onlyThreeTracks = action.topTracks.slice(0, 3);
      // console.log(onlyTwoTracks);
      // onlyTwoTracks.map((item, i) => {
      //   console.log(item);
      // });
      return {

        ...state,
        topTracks: onlyThreeTracks,
      };
    }
    case "FINISH_RECEIVING_ALL_ARTIST_INFO": {
      console.log(action, 'IT FINISHED RECEIVING')
      return {
        ...state,
        status: "finished"
      }
    }
    default: {
      return state;
    }
  }
}
