
import React, { Component } from "react"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
  Annotation
} from "react-simple-maps"
import geography from "./static/world-50m"

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
}



class Map extends Component {
  markers = this.props.formatCoordData()
  render() {
    return (
      <div style={wrapperStyles}>
        <ComposableMap
          projectionConfig={{ scale: 205 }}
          width={1000}
          height={1000}
          style={{
            width: "100%",
            height: "auto",
          }}
          >
          <ZoomableGroup center={[ 0, 0 ]} disablePanning>
            <Geographies geography={geography}>
              {(geographies, projection) =>
                geographies.map((geography, i) =>
                    <Geography
                      key={i}
                      geography={geography}
                      projection={projection}
                      style={{
                        default: {
                          fill: "#ECEFF1",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                        hover: {
                          fill: "#ECEFF1",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                        pressed: {
                          fill: "#ECEFF1",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        }
                      }}
                    />
                  
                )
              }
            </Geographies>
            <Markers>
              {this.markers.map((marker, i) => (
                <Marker onMouseEnter = {(event) => {console.log(event)}}
                  onMouseLeave = {() => {console.log('bye')}}
                  key={i}
                  marker={marker}
                  style={{
                    default: { fill: "#FF5722" },
                    hover: { fill: "#FFFFFF",  },
                    pressed: { fill: "#FF5722" },
                  }}
                  >
                  <circle
                    cx={0}
                    cy={0}
                    r={1}
                    style={{
                      stroke: "#FF5722",
                      strokeWidth: 3,
                      opacity: 0.9,
                    }}
                  />
                  <text
                    textAnchor="middle"
                    y={25}
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fill: "#607D8B",
                    }}
                    >
                    {marker.hi}
                  </text>
                </Marker>
              ))}
            </Markers>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    )
  }
}

export default Map