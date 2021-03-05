import React, { Component } from 'react';
import './App.css';

function City(props) {
  return (
    <div class="card">
      <div class="card-header">
        {props.cityInfo.City}, {props.cityInfo.State}
      </div>
      <div class="card-body">
        <ul class="card-text">
          <li>State: {props.cityInfo.State}</li>
          <li>Location: ({props.cityInfo.Lat}) </li>
          <li>Population (estimated): {props.cityInfo.EstimatedPopulation}</li>
          <li>Total Wages: {props.cityInfo.TotalWages}</li>
        </ul>
      </div>
    </div>
  );
}

function ZipSearchField({ onZipChange }) {
  return (
    <div className="text-center">
      <label>Zip Code:</label>
      <input type="text" onChange={onZipChange} />
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCode: '',
      cities: [],
    }
  }

  zipChanged(e) {
    // Make GET request for the zip resource
    // then, when you receive the result, store it in state
    fetch(`http://ctp-zip-api.herokuapp.com/zip/${e.target.value}`)
      .then(request => request.json())
      .then(data => {
        this.setState({
          cities: [],
        });
        this.setState({
          cities: this.state.cities.concat(data),
        });
        console.log(this.state.cities);
      })
      .catch((error) => {
        console.log('Error: ' + error);
      });

    this.setState({
      zipCode: e.target.value
    })
  }
7
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField onZipChange={(e) => this.zipChanged(e)} />
        <div>
          {/*
            Instead of hardcoding the following 3 cities,
            Create them dynamically from this.state.cities
          */}
          {this.state.cities.map(element => {
            return <City cityInfo={element} />
          })}
          
        </div>
      </div>
    );
  }
}

export default App;