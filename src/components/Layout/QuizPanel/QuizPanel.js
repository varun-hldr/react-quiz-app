import React, { Component } from "react";
import Loader from "../Loader/Loader";
import QuizBoard from "./QuizBoard";
import LeaderBoard from "./LeaderBoard";
import "../../css/QuizPanel.css";
import { connect } from "react-redux";
import * as action from "../../../actionsFiles/apiActions";
import * as Logic from "../../Logics/Logics";

class QuizPanel extends Component {
  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    if (this.props.match.url.includes("quiz")) {
      this.props.dispatch(action.getQuiz(params.id));
    }
    console.log(this.props.match.url);
    if (this.props.match.url.includes("user")) {
      this.props.dispatch({ type: "LOADED" });
      this.props.dispatch(action.getUserQuiz(params.id, params.id2));
    }

    this.props.dispatch(action.getGlobalLeaderBoard());
  }
  render() {
    const { qLoaded, lbLoaded, quizList, gLeaderboard } = this.props.quiz;
    return (
      <div>
        {!lbLoaded || !qLoaded ? (
          <Loader />
        ) : (
          <div className="row">
            <div className="col-8">
              {<QuizBoard quiz={quizList} params={this.props.match.params} />}
            </div>
            <div className="col-4">
              <LeaderBoard users={this.handlerFunction(gLeaderboard)} />
            </div>
          </div>
        )}
      </div>
    );
  }

  handlerFunction(array) {
    const users = Logic.highestFinder(array);
    const filterArray = users.map((user, index) => {
      let image = "";
      if (user.avatar === "") {
        image = Logic.imageGenerator(user);
      } else {
        image = user.avatar;
      }
      const position = Logic.positionHandler(index + 1);
      return { ...user, avatar: image, position: position, index: index + 1 };
    });
    return filterArray;
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(QuizPanel);
