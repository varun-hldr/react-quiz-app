import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as Logic from "../../Logics/Logics";
import * as Action from "../../../actionsFiles/apiActions";
import SuccessPage from "./SuccessPage";
import "../../css/CreateQuiz.css";

class CreateQuiz extends Component {
  state = {
    question: [{ id: 1, style: null, text: "Save question" }],
    quizData: {
      id: Logic.generateID(this.props.auth.user.quizList),
      totalPlayed: 0,
      players: [],
      quiz: [],
    },
    quiz: {
      question: null,
      correct_answer: null,
      incorrect_answers: [null, null, null],
    },
    save: false,
    success: false,
    style: null,
  };

  onClickSave = (e, value) => {
    const initialQuiz = {
      question: null,
      correct_answer: null,
      incorrect_answers: [null, null, null],
    };
    const question = this.state.quiz;
    let quiz = this.state.quizData.quiz;
    if (
      question.question !== null &&
      question.correct_answer !== null &&
      question.incorrect_answers[0] !== null &&
      question.incorrect_answers[1] !== null &&
      question.incorrect_answers[2] !== null
    ) {
      let nonQuestion = this.state.question.map((val) => {
        if (val.id === value.id) {
          return { ...val, style: "#37e9bb", text: "Saved" };
        } else {
          return val;
        }
      });
      quiz.push(question);
      this.setState({
        quizData: { ...this.state.quizData, quiz },
        question: nonQuestion,
      });
      this.setState({
        quiz: initialQuiz,
      });
    }

    if (e.target.name === "savequiz") {
      if (this.state.quizData.quiz.length === 10) {
        let user = this.props.auth.user;
        user.quizList.push(this.state.quizData);
        Action.updateUser(user);
        Action.setUser(user);
        this.setState({
          success: true,
        });
      }
    }
  };

  render() {
    if (!this.props.auth.isAuth) {
      return <Redirect to="login" />;
    }
    return (
      <div className="createQuizMain">
        {!this.state.success ? (
          <div className="createQuiz">
            <div className="createQuizHeading">
              <h3>Create an awesome quiz in minutes</h3>
              <span className="para">
                QuizUp is the easiest way to make quizzes FREE
              </span>
            </div>
            {this.state.question.map((value) => this.addQuestion(value))}
            {!this.state.save ? (
              <div className="addQuestions">
                <button onClick={this.onClickHandler} name="addquestions">
                  Add Questions
                </button>
              </div>
            ) : null}

            <div className="saveQuiz">
              <div className="d-flex justify-content-between">
                <button>New Quiz</button>
                {this.state.save ? (
                  <button onClick={this.onClickSave} name="savequiz">
                    Save Quiz
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <SuccessPage />
        )}
      </div>
    );
  }

  onChangeHandler = (e) => {
    let quiz = this.state.quiz;

    if (e.target.name === "incorrect_a") {
      quiz.incorrect_answers[0] = e.target.value;
    } else if (e.target.name === "incorrect_b") {
      quiz.incorrect_answers[1] = e.target.value;
    } else if (e.target.name === "incorrect_c") {
      quiz.incorrect_answers[2] = e.target.value;
    } else {
      quiz = { ...quiz, [e.target.name]: e.target.value };
    }
    this.setState({ quiz });
  };

  addQuestion = (value) => {
    return (
      <div className="createQuizFooter">
        <h2>Type your question</h2>
        <div className="input">
          <b className="question">Q{value.id}.</b>
          <input onChange={this.onChangeHandler} name="question" />
        </div>

        <div className="correctOption">
          <h5>Type right answer </h5>
          <div className="input">
            <b>a</b>
            <input onChange={this.onChangeHandler} name="correct_answer" />
          </div>
        </div>

        <div className="wrongOptions">
          <h5>Type wrong answer </h5>
          <div className="input">
            <b>a</b>
            <input onChange={this.onChangeHandler} name="incorrect_a" />
          </div>

          <div className="input">
            <b>b</b>
            <input onChange={this.onChangeHandler} name="incorrect_b" />
          </div>

          <div className="input">
            <b className="c">c</b>
            <input onChange={this.onChangeHandler} name="incorrect_c" />
          </div>
        </div>
        <h5 className="mt-3 ">Please fill all worng options</h5>
        <div className="saveQuiz">
          <button
            onClick={(e) => this.onClickSave(e, value)}
            name="save"
            style={{ backgroundColor: value.style }}
          >
            {value.text}
          </button>
        </div>
      </div>
    );
  };

  onClickHandler = () => {
    const { question } = this.state;
    if (question.length < 10) {
      let value = question;
      value.push({
        id: question.length + 1,
        style: null,
        text: "Save question",
      });
      this.setState({
        question: value,
      });
    }

    if (question.length === 10) {
      this.setState({
        save: true,
      });
    }
  };
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(CreateQuiz);
