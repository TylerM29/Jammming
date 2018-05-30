let accessToken;
let expiresIn;
const clientID = 'bf8d14583fcf4789bf7c5f4a36f17cd5';
const redirectURI = "http://localhost:3000";

const Spotify = {
  getAccessToken() {
    const url = window.location.href;
    const token = url.match(/access_token=([^&]*)/);
    const expires = url.match(/expires_in=([^&]*)/);
    if(accessToken) {
      return accessToken;
    } else if (token && expires) {
      accessToken = token[1];
      expiresIn = expires[1];
        window.setTimeout(() => accessToken = null, expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
          return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },
    search(term) {
      this.getAccessToken();
      return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
        {
          Authorization: `Bearer ${accessToken}`,
          'Content-type': 'application/json'
        }
      ).then(response =>{
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
      if(!playlistName || !trackURI){return;}
        this.getAccessToken();
        let userID;
        return fetch('https://api.spotify.com/v1/me', {
          headers: `Bearer ${accessToken}`,
          'Content-type': 'application/json'
        }).then(
          response => {
          return response.json();
        }).then(jsonResponse => {
          return userID = jsonResponse.id;
        }).then(()=> {
          return fetch(	`https://api.spotify.com/v1/users/${userID}/playlists`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ name: playlistName })
          }).then(response => {
            return response.json();
          }).then( jsonResponse => {
            return userID = jsonResponse.id;
          }).then(()=> {
            let playlistID = this.jsonResponse.id;
            return fetch( `https://api.spotify.com/v1/users/${userID}/playlist/${playlistID}/tracks`, {
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





export default Spotify;
