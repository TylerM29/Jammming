let accessToken;
let expiresIn;
const clientID = 'bf8d14583fcf4789bf7c5f4a36f17cd5';
const redirectURI = "https://impolite-arm.surge.sh";

const Spotify = {
  getAccessToken() {
    if(accessToken) {
      return accessToken;
    }
    const url = window.location.href;
    const token = token[1];
    const expires = Number(expires[1]);
    if(token && expires) {
      accessToken = url.match(/access_token=([^&]*)/)[1];
      expiresIn = url.match(/expires_in=([^&]*)/)[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id={clientID}&response_type=token&scope=playlist-modify-public&redirect_uri={redirectURI}`;
    }
  },
    search(term) {
      return fetch('https://api.spotify.com/v1/search?type=track&q={term}',
        {
          headers: `Bearer ${accessToken}`,
          'Content-type': 'application/json'
        }
      ,).then(response =>{
        return response.json();
      }).then(jsonResponse =>{
        if(!jsonResponse.tracks){return [];}

        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album:track.album.name,
          uri: track.uri
        }));
      });
    },

    savePlaylist(playlistName, trackURI) {
      if(!playlistName || !trackURI){
        let accessToken = Spotify.getAccessToken;
        let userId;
        return fetch('https://api.spotify.com/v1/me', {
          headers: `Bearer ${accessToken}`,
          'Content-type': 'application/json'
        }).then(
          response => {
          return response.json();
        }).then(jsonResponse => {
          return fetch(	`https://api.spotify.com/v1/users/{user_id}/playlists`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ name: playlistName })
          }).then(response => {
            return response.json();
          }).then( jsonResponse => {
            let playlistID = jsonResponse.id;
            return fetch( `https://api.spotify.com/v1/users/{user_id}/playlist/{playlist_id}/tracks`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-type': 'application/json'
              },
              method: 'POST',
              body: JSON.stringify({ uri: trackURI })
            })
          })
        })
      }
    }
  }




export default Spotify;
