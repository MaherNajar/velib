import React, { Component } from 'react';
import bicycle from '../icons/bicycle.svg';
import wheelSpin from '../assets/wheel_spin.mp3';
import styled from 'styled-components';
import road from '../assets/road.jpg';

const sliderThumbStyles = ({ opacity }) => `
  width: 150px;
  height: 80px;
  background: no-repeat center url(${bicycle}) transparent;
  cursor: pointer;
  opacity: ${opacity};
  -webkit-transition: .2s;
  transition: opacity .2s;
`;

const Styles = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
  .slider {
    flex: 6;
    -webkit-appearance: none;
    background: center/100% url(${road});
    border-radius: 10px;
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      ${(props) => sliderThumbStyles(props)}
    }
    &::-moz-range-thumb {
      ${(props) => sliderThumbStyles(props)}
    }
  }
`;

export default class Slider extends Component {
  playAudio = () => {
    document.getElementById('audio').play();
  };

  stopAudio = () => {
    document.getElementById('audio').pause();
  };

  render() {
    const { maxMarkers, value, onChange } = this.props;
    return (
      <React.Fragment>
        <Styles opacity={value > 400 ? value / maxMarkers : 0.5}>
          <input
            type="range"
            min={10}
            step={10}
            max={maxMarkers}
            value={value}
            className="slider"
            onMouseDown={this.playAudio}
            onMouseUp={this.stopAudio}
            onChange={(e) => onChange(e.target.value)}
          />
          <audio loop id="audio" src={wheelSpin} />
        </Styles>
      </React.Fragment>
    );
  }
}
