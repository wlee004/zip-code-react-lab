import React, { Component } from 'react'; 
import './App.css';

function Zipcode(props) {
  return (
    <div className="card">
      <div className="card-header text-center">
        Zip Codes
      </div>
      <div className="card-body">
        <ul className="card-text">
          {
            props.zipInfo.map(element => {
              return <li> {element} </li>
            })
          }
        </ul>
      </div>
    </div>
  )
}

function CitySearchField( {onCityChange} ) {
  return(
    <div className='text-center'>
      <label>City: </label>
      <input type='text' onChange={onCityChange}/>
    </div>
  );
}

class App extends Component{ 
  constructor(props){
    super(props); 
    this.state={
      city: '', 
      zipcodes: [],
    }
  }
  cityChanged(e) { 
    fetch(`http://ctp-zip-api.herokuapp.com/city/${e.target.value.toUpperCase()}`)
      .then(request => request.json())
      .then(data => {
        this.setState({
          zipcodes: []
        });
        this.setState({
          zipcodes: this.state.zipcodes.concat(data)
        });
        console.log(this.state.zipcodes);
      })
      .catch((error) => {
        console.log('Error: ' + error)
      });

    this.setState({
      city: e.target.value
    });
  }

  render() { 
    return(
      <div className='App'>
        <div className='App-header'> 
          <h2>City Search</h2>
        </div>
        <CitySearchField onCityChange={(e) => this.cityChanged(e)} />
        <div> 
         {
          /*Displays zipcodes*/
          <Zipcode zipInfo={this.state.zipcodes} />
         }
        </div>
      </div>
      
    );
  }
}

export default App;
