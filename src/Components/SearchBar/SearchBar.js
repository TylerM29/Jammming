import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }
  handleTermChange(event) {
    this.setState({ term: event.target.value });
  }
  search() {
    this.props.onSearch(this.state.term);
  }
  handleKeyPress(whatKey) {
    if(whatKey.key === 'Enter') {
      return this.search;
    }
  }
  render() {
    return (
      <div className="SearchBar">
  <input placeholder="Enter A Song, Album, or Artist"
  onChange={this.handleTermChange} />
  <a onClick= {this.search} onKeyPress={this.handleKeyPress} >SEARCH</a>
</div>
    );
  }
}

export default SearchBar;
