import React, { Component } from "react";
import "./App.css";
import Menu from "./Components/Menu";
import { Scatter } from "react-chartjs-2";
import axios from "axios";
import GoogleMapReact from "google-map-react";

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
        <h1>Meteor Data Visualisation</h1>
        x:{" year "}              y:{" "}
        {this.state.data.length && (
          <Menu
            setAxisState={event => this.setAxisState("y", event)}
            axis="y"
            data={this.state.data}
          />
        )}
        {this.state.data.length && <Scatter data={() => this.formatData()} />}
        <br />
        <br />
        {this.state.data.length && (
          <GoogleMapReact
            defaultCenter={{ lat: 0, long: 0 }}
            defaultZoom={11}
          />
        )}
      </div>
    );
  }
  setAxisState = (axis, event) => {
    this.setState({ y: event });
  };

  formatData = () => {
    let formattedData = this.state.data;

    formattedData = formattedData.reduce((acc, el) => {
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
          backgroundColor: "rgba(75,192,192,0.4)",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "rgba(75,192,192,0)",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 1,
          data: formattedData
        }
      ]
    };
  };
}

export default App;
