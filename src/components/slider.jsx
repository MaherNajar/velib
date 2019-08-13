import React, { Component } from "react";
import styled from "styled-components";

const sliderThumbStyles = ({ color, opacity }) => `
  width: 25px;
  height: 25px;
  background: ${color};
  cursor: pointer;
  outline: 5px solid #333;
  opacity: ${opacity};
  -webkit-transition: .2s;
  transition: opacity .2s;
`;

const Styles = styled.div`
  display: flex;
  align-items: center;
  color: #888;
  margin-top: 2rem;
  margin-left: 20px;
  .slider {
    flex: 6;
    -webkit-appearance: none;
    width: 100%;
    height: 15px;
    border-radius: 5px;
    background: #efefef;
    outline: none;
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      ${props => sliderThumbStyles(props)}
    }
    &::-moz-range-thumb {
      ${props => sliderThumbStyles(props)}
    }
  }
`;

export default class Slider extends Component {
  render() {
    const { color, maxMarkers, value, onChange } = this.props;
    return (
      <Styles opacity={value > 10 ? value / maxMarkers : 0.1} color={color}>
        <input
          type="range"
          min={10}
          step={10}
          max={maxMarkers}
          value={value}
          className="slider"
          onChange={e => onChange(e.target.value)}
        />
      </Styles>
    );
  }
}
