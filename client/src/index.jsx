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
  }

  show () {
    $.ajax({
      type: 'GET',
      url: '/repos',
    })
    .done(function(data) {

       this.state.repos = data;
       console.log('data saved', data);
    })
    .fail(function(err) {
      console.error('failed',err);
    })
  }

  search (term) {
    var outsideMethods = this;
    console.log(`${term} was searched`);
    $.ajax({
      type: 'POST',
      url: '/repos/import',
      contentType: 'application/json',
      data: JSON.stringify({username: term})
    })
    .done(function(data) {
      outsideMethods.show();
        console.log('success', data);
      })
      .fail(function(err) {
        console.error('failed', err);
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
