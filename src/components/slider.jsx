import React, { Component } from "react";
import bicycle from "../icons/bicycle.svg";
import styled from "styled-components";

const sliderThumbStyles = ({ opacity }) => `
  width: 100px;
  height: 100px;
  background: no-repeat center url(${bicycle}) transparent;
  cursor: pointer;
  opacity: ${opacity};
  -webkit-transition: .2s;
  transition: opacity .2s;
`;

const Styles = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
  margin-left: 20px;
  margin-right: 20px;
  .slider {
    flex: 6;
    -webkit-appearance: none;
    width: 100%;
    height: 15px;
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
    const { maxMarkers, value, onChange } = this.props;
    return (
      <Styles opacity={value > 10 ? value / maxMarkers : 0.1}>
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
