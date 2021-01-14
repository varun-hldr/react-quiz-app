import React, { Component } from "react";
import Timer from "./Timer";
import "../../../css/Quiz.css";

class Quiz extends Component {
  state = {
    options: {
      0: [
        {
          char: "a",
          bg: "",
        },
        {
          char: "b",
          bg: "",
        },
        {
          char: "c",
          bg: "",
        },
        {
          char: "d",
          bg: "",
        },
        { check: false },
      ],
    },
  };

  componentDidMount() {
    let options = [];
    for (var i = 0; i < 10; i++) {
      options.push(this.state.options[0]);
    }
    this.setState({
      options,
    });
  }

  onClickOption = (char, rand) => {
    const { currentPage } = this.props;
    if (!this.state.options[this.props.currentPage][4].check) {
      let options = [...this.state.options[this.props.currentPage]];
      let index = options.findIndex((option) => option.char === char);
      if (index !== rand) {
        options[index] = { ...options[index], bg: "#fc5054" };
      }
      options[rand] = { ...options[rand], bg: "#37e9bb" };
      options[4] = { check: true };
      this.setState((prevState) => ({
        options: { ...prevState.options, [currentPage]: options },
      }));
    }
  };

  render() {
    const { currentQuiz, currentPage, random } = this.props;
    return (
      <div>
        <Timer />
        <p>{currentPage + 1}/10</p>
        {currentQuiz.map((quiz) => {
          return (
            <div className="quizzes">
              <div className="question-title">
                <h4>{quiz.question}</h4>
              </div>
              <div className="options">{this.makeOptions(quiz, random)}</div>
            </div>
          );
        })}
      </div>
    );
  }
  makeOptions = (quiz, rand) => {
    let number = 3;
    const check = (quiz) => {
      number = number - 1;
      return <h6>{quiz.incorrect_answers[number]}</h6>;
    };
    let options = this.state.options[this.props.currentPage];
    return options.map((option, index) => {
      if (index !== 4) {
        return (
          <div
            onClick={(e) => this.onClickOption(option.char, rand)}
            type="button"
            className="option"
            style={{ backgroundColor: option.bg }}
          >
            <h5>{option.char}</h5>

            {rand === index ? <h6>{quiz.correct_answer}</h6> : check(quiz)}
          </div>
        );
      }
      return null;
    });
  };
}

export default Quiz;
