import React from 'react';
import TrackList from '../TrackList/TrackList';
import './SearchResults.css';

class SearchResults extends React.Component {
  SearchResults() {
    //this.state.searchResults;
    this.setState({ searchResults: this.props.searchResults })
    this.addTrack = this.addTrack.bind(this);
  }
  render() {
    return (
      <div className="SearchResults">
  <h2>Results</h2>
  {/this.props is an external call/}
  <TrackList tracks={this.props.searchResults}
  onAdd={this.props.onAdd}
  isRemoval={false}
  onAdd={SearchResults}/>
</div>
    );
  }
}

export default SearchResults;
