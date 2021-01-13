import React, { Component } from "react";
import "../../../css/Timer.css";

export default class Timer extends Component {
  state = {
    minutes: 9,
    seconds: 59,
  };

  componentDidMount() {
    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state;

      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1,
        }));
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.myInterval);
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59,
          }));
        }
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    const { minutes, seconds } = this.state;
    return (
      <div className="main-div-timer">
        <div className="timer">
          {minutes === 0 && seconds === 0 ? (
            <h5>00:00</h5>
          ) : (
            <h5>
              0{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </h5>
          )}
        </div>
      </div>
    );
  }
}
