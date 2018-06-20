import React, { Component } from "react";
import "./App.css";
import Menu from "./Components/Menu";
import { Scatter } from "react-chartjs-2";
import axios from "axios";
import Map from "./Components/Map"

class App extends Component {
  componentDidMount() {
    axios.get("https://data.nasa.gov/resource/y77d-th95.json").then(res => {
      this.setState({ data: res.data });
    });
  }

  state = {
    data: [],
    x: "year",
    y: "mass"
  };

  render() {
    return (
      <div className="App">
        {this.state.data.length && <h1>Meteor Data Visualisation</h1> || ''}
        {this.state.data.length && <span>x:{"  year"}</span> || ''} 
        {this.state.data.length && <span>y:{""}</span> || ''}
        {this.state.data.length && (
          <Menu
            setAxisState={event => this.setAxisState("y", event)}
            axis="y"
            data={this.state.data}
          />
        ) || ''}
        {this.state.data.length && <div className="scatter"><Scatter  data={() => this.formatData()} /></div> || ''}
        {this.state.data.length && <hr /> || ''}
        {this.state.data.length && <h2>Meteor Landing Sites</h2> || ''}
        {this.state.data.length &&<Map formatCoordData={() => this.formatCoordData()} className="map"/> || ''}
        <br />
      </div>
    );
  }
  setAxisState = (axis, event) => {
    this.setState({ y: event });
  };

  formatData = () => {
    let data = this.state.data;
    let formattedData = data.reduce((acc, el) => {
      if (
        el[this.state.x] !== undefined &&
        el[this.state.y] !== undefined &&
        Number(el[this.state.y]) < 100000
      ) {
        if (el[this.state.x].slice(0, 4) > 1000) {
          acc.push({
            x: el[this.state.x].slice(0, 4),
            y: Number(el[this.state.y])
          });
        }
      }
      return acc;
    }, []);

    return this.generateScatter(formattedData);
  };

  generateScatter = formattedData => {
    return {
      labels: ["Scatter"],
      datasets: [
        {
          label: `Scatter Chart of ${this.state.x} vs ${this.state.y}`,
          fill: false,
          backgroundColor: "#FF5722",
          pointBorderColor: "#FF5722",
          pointBackgroundColor: "#FF5722",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#FF5722",
          pointHoverBorderColor: "#FF5722",
          pointHoverBorderWidth: 2,
          pointRadius: 2,
          pointHitRadius: 1,
          data: formattedData
        }
      ]
    };
  };
  formatCoordData = () => {
  return this.state.data.reduce((acc, el) => {
    if(el.reclong && el.reclat){
      if (el.mass < 100000){
        acc.push({coordinates: [el.reclong, el.reclat], mass:el.mass})}
      }
      return acc
    }, [])
  }
}

export default App;
