import React, { Component } from "react";
import Loader from "../Loader/Loader";
import QuizBoard from "./QuizBoard";
import LeaderBoard from "./LeaderBoard";
import "../../css/QuizPanel.css";
import { connect } from "react-redux";
import * as action from "../../../actionsFiles/apiActions";
import * as female from "../../img/profiles/female";
import * as male from "../../img/profiles/male";

class QuizPanel extends Component {
  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    this.props.dispatch(action.getQuiz(params.id));
    this.props.dispatch(action.getGlobalLeaderBoard());
    this.props.dispatch(action.setLoaded(true));
  }
  render() {
    const {
      quizLoaded,
      isLoaded,
      lbLoaded,
      quizList,
      gLeaderboard,
    } = this.props.quiz;
    return (
      <div>
        {!quizLoaded || !lbLoaded || !isLoaded ? (
          <Loader />
        ) : (
          <div className="row">
            <div className="col-8">{<QuizBoard quiz={quizList.results} />}</div>
            <div className="col-4">
              <LeaderBoard users={this.handlerFunction(gLeaderboard)} />
            </div>
          </div>
        )}
      </div>
    );
  }

  handlerFunction(array) {
    const users = this.highestFinder(array);
    const filterArray = users.map((user, index) => {
      let image = "";
      if (user.avatar === "") {
        image = this.imageGenerator(user);
      } else {
        image = user.avatar;
      }
      const position = this.positionHandler(index + 1);
      return { ...user, avatar: image, position: position, index: index + 1 };
    });
    return filterArray;
  }

  positionHandler(index) {
    let position = "1st";
    if (index === 2) {
      position = "2nd";
    } else if (index === 3) {
      position = "3rd";
    } else if (index > 3) {
      position = `${index}th`;
    }
    return position;
  }

  imageGenerator = (user) => {
    const rand = parseInt(0 + Math.random() * 4);
    const fimg = [female.a, female.b, female.c, female.d];
    const mimg = [male.a, male.b, male.c, male.d];
    if (user.gender === "male") {
      return mimg[rand];
    } else {
      return fimg[rand];
    }
  };
  highestFinder = (array) => {
    array.sort(function (a, b) {
      return b.points - a.points;
    });
    return array;
  };
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(QuizPanel);
