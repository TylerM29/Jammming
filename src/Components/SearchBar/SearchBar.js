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
  handleKeyChange(e) {
    if(e.keyCode === '13') {
      //this.search();
      console.log('Hello');
    }
  }
  search() {
    this.props.onSearch(this.state.term);
  }
  render() {
    return (
      <div className="SearchBar">
  <input placeholder="Enter A Song, Album, or Artist"
  onChange={this.handleTermChange} />
  <a onClick= {this.state.search} onkeypress={this.handleKeyChange} >SEARCH</a>
</div>
    );
  }
}

export default SearchBar;
