
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import Roulette from './Roulette';


class App extends React.Component { 

  constructor() {
    super();
    this.state = {
      poems: [],
    }

    this.getPoems = this.getPoems.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentWillMount() {
    this.getPoems("William Shakespeare");
  }

  getRandomPoem(poems){
    const poem = poems[Math.floor(Math.random() * poems.length)];
    return poem;
  }

  getPoems(author){
    axios({
      method: 'GET',
      url: 'https://proxy.hackeryou.com',
      dataResponse: 'json',
      params: {
        reqUrl:`http://poetrydb.org/linecount,author/14;${author}`
      }
    }).then((response) => {
      this.setState({ poems: response.data });
    });
  }

  handleOnChange(value) {
    this.getPoems(value);
  }

  render() {
    if(this.state.poems.length === 0){
      return <div className="loading">loading...</div>;
    } 
  
    const poem = this.getRandomPoem(this.state.poems);

    const authors = [
      "Percy Bysshe Shelley",
      "Lord Byron",
      "John Clare",
      "Robert Browning",
      "William Shakespeare",
      "Edward Thomas"
    ]

    return (
      <div id="wrapper">     
          <header>
            <h1>Classical Sonnet Generator</h1>
          </header>
          <main>
            <div className="left">
              <Roulette options={authors} baseSize={250} onComplete={this.handleOnChange}/>
            </div>
            <div className="right">
              <h3>{poem.title}</h3>
              <h5>{poem.author}</h5>
              {poem.lines.map((line, index)=> 
                <p key={index}>{line}</p>
              )}
            </div>
          </main>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
