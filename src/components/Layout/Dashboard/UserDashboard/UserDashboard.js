import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import QuizList from "./QuizList";
import Results from "./Results";
import "../../../css/UserDashboard.css";

class UserDashboard extends Component {
  state = {
    quizList: false,
    quiz: false,
    play: {
      check: false,
      id: null,
      id2: null,
    },
  };
  componentDidMount() {
    if (this.props.auth.isAuth) {
      this.setState({
        quizList: this.props.auth.user.quizList,
        quiz: this.props.auth.user.quizList[0],
      });
    }
  }
  onClickHandler = (id, action, quizLists) => {
    if (action === "view") {
      const quizList = quizLists.filter((quiz) => quiz.id === id);
      this.setState({
        quiz: quizList[0],
      });
    }
    if (action === "del") {
      const quizList = quizLists.filter((quiz) => quiz.id !== id);
      this.setState({
        quizList,
      });
    }
    if (action === "play") {
      this.setState({
        play: {
          check: true,
          id: this.props.auth.user.id,
          id2: id,
        },
      });
    }
  };
  render() {
    if (!this.props.auth.isAuth) {
      return <Redirect to="/" />;
    }
    if (this.state.play.check) {
      return (
        <Redirect to={`/user/${this.state.play.id}/${this.state.play.id2}`} />
      );
    }
    return (
      <div className="dashboard">
        {!this.state.quiz ? (
          <div class="position-absolute top-50 start-50 translate-middle">
            <button className="CreateQuiz">
              <Link to="/createquiz">Create Quiz</Link>
            </button>
          </div>
        ) : (
          <div className="row userDashboard">
            <div className="col-6 totalQuiz">
              <QuizList
                quizList={this.state.quizList}
                onClickHandler={this.onClickHandler}
              />
            </div>
            <div className="col-6 results">
              <Results quiz={this.state.quiz} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(UserDashboard);
