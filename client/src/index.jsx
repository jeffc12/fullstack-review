import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

this.show = this.show.bind(this);
  }



  search (term) {
    console.log(`${term} was searched`);
     var outsideMethods = this;
    $.ajax({
      type: 'POST',
      url: '/repos/import',
      contentType: 'application/json',
      data: {username: term}
    })
    .done(function(data) {
      outsideMethods.show();
        console.log('success POST', data);
      })
      .fail(function(err) {
        console.error('failed POST', err);
      })

  }

  show() {

    $ajax({
      url: '/repos',
      type: 'GET'.
      datatype: 'json'
    })
    .done(function(data) {

      this.setState({
        repos: data
      })
      console.log('success GET', data);
    })
    .fail(function(err) {
      console.log('failed to GET', err);
    })

  }


  render () {

    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
