import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as Action from "../../../actionsFiles/apiActions";
import * as Page from "./QuizPages";
import "../../css/QuizBoard.css";

class QuizBoard extends Component {
  state = {
    totalPoints: null,
    tryagain: false,
  };

  onTryAgain = () => {
    this.setState({
      tryagain: true,
    });
  };

  onSubmitHandler = (totalPoints) => {
    this.setState({
      totalPoints,
    });

    if (this.props.auth.isAuth) {
      const gLeaderBoard = this.props.quiz.gLeaderboard;
      const USER = this.props.auth.user;

      let check = false;
      gLeaderBoard.filter((user) => {
        if (user.email === USER.email) {
          let data = { ...user, points: user.points + totalPoints };
          check = true;
          Action.updateGlobalLeader(data);
        }
      });
      if (!check) {
        let user = {
          name: USER.name,
          email: USER.email,
          gender: USER.gender,
          avatar: USER.avatar,
          points: totalPoints,
        };
        Action.postGlobalLeader(user);
        check = false;
      }
    }
  };

  render() {
    const random = [];
    while (random.length < 10) {
      random.push(parseInt(0 + Math.random() * 4));
    }
    if (this.state.tryagain) {
      return <Redirect to="/" />;
    }
    return (
      <div className="quizboard">
        {this.state.totalPoints === null ? (
          <Page.FillQuiz
            quiz={this.props.quizList}
            random={random}
            onSubmitHandler={this.onSubmitHandler}
          />
        ) : (
          <Page.QuizResult
            totalPoints={this.state.totalPoints}
            onTryAgain={this.onTryAgain}
            params={this.props.params}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(QuizBoard);
