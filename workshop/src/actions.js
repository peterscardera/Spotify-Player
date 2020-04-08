export const requestAccessToken = () => ({
    type: 'REQUEST_ACCESS_TOKEN',
})

export const receiveAccessToken = (token) => ({
    type: 'RECEIVE_ACCESS_TOKEN',
    token
})

export const receiveAccessTokenError = () => ({
    type: 'RECEIVE_ACCESS_TOKEN_ERROR',
  });

//--------------ACTIONS FOR ARTIST--------------//
export const requestArtist = () => ({
    type: 'REQUEST_ARTIST_INFO'
})

export const receivedArtistInfo = (artistProfile) => ({
    type: 'RECEIVED_ARTIST_INFO',
    artistProfile
})

export const receiveTopTracks = (topTracks) => ({
    type: 'RECEIVE_TOP_TRACKS',
    topTracks: topTracks.tracks
})

//dispatched when BOTH are finished
export const finishReceivingAllArtistInfo =() => ({
    type: 'FINISH_RECEIVING_ALL_ARTIST_INFO'
})

export const requestArtistError = () => ({
    type: 'RECEIVE_ARTIST_ERROR'
})