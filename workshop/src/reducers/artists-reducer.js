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
      console.log(action);
      return {
        ...state,
        currentArtist: {
          info: action.artistProfile,
        },
      };
    }
    default: {
      return state;
    }
  }
}
