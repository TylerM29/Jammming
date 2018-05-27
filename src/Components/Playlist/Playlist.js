import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Playlist">
  <input defaultValue={'New Playlist'}/>
  <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
  <TrackList tracks={this.props.playlistTracks}
   onRemove={this.props.onRemove}
    isRemoval={true}
    onChange={this.handleNameChange} />
</div>
    );
  }
}

export default Playlist;
