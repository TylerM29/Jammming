import React, { Component } from 'react';
import './App.css';
import Playlist from '../Playlist/Playlist.js';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'Change name here',
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  addTrack(track) {
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      let tracks = this.state.playListTracks.concat(track);
      this.setState({ playlistTracks: tracks});
    }
  }
  removeTrack(track){
    let newTracks = this.tracks.filter(playlistTrack => playlistTrack.id !== track.id);
    this.setState({ playlistTracks: newTracks });
  }
  updatePlaylistName(name) {
    this.setState({ playListName: name });
  }
  savePlaylist() {
    let trackURIS = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playListName, trackURIS);
  }
  handleNameChange() {
    this.onNameChange(this.onChange)
  }
  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    })
  }
  render() {

    return (
      <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <div className="App-playlist">
    <Playlist
    playListName={this.state.playListName}
    playlistTracks={this.state.playListTracks}
    onRemove={this.removeTrack}
    onNameChange={this.updatePlaylistName}
    onSave={this.savePlaylist}
    onSearch={this.search}  />
    </div>
  </div>
</div>
    );
  }
}

export default App;
