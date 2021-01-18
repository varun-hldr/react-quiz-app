import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as action from "../../../actionsFiles/apiActions";
import "../../css/Home.css";

class Home extends Component {
  componentDidMount() {
    const { dispatch, quiz } = this.props;
    if (!quiz.lbLoaded) {
      dispatch(action.getGlobalLeaderBoard());
    }
    if (!quiz.uLoaded) {
      dispatch(action.getUsers());
    }
  }
  getQuizFromApi = (e) => {
    const id = e.target.name;
    this.props.dispatch(action.getQuiz(id));
  };
  makeQuiz = (name, id) => {
    return (
      <li key={id}>
        <b>QuizUP :</b>
        <Link to={`/quiz/${id}`} name={id} onClick={this.getQuizFromApi}>
          {name}
        </Link>
      </li>
    );
  };
  render() {
    const category = [
      "General Knowledge",
      "Entertainment: Books",
      "Entertainment: Film",
      "Entertainment: Music",
      "Entertainment: Musicals & Theatres",
      "Entertainment: Television",
      "Entertainment: Video Games",
      "Entertainment: Board Games",
      "Science & Nature",
      "Science: Computers",
      "Science: Mathematics",
      "Mythology",
      "Sports",
      "Geoghaphy",
      "History",
    ];
    return (
      <div className="container home">
        <div className="header-area">
          <h2>I'm QuizUp</h2>
          <p className="homePara">
            <b>Bright emotions, happy audiences & beautiful memories</b>
          </p>
          <button type="createquiz">
            <Link to="/createquiz">Create Quiz</Link>
          </button>
        </div>
        <div className="footer-area">
          <div className="row">
            <div className="col-5"></div>
            <div className="col-7">
              <div className="quiz-section">
                <div className="quiz-heading">
                  <h4>Latest Quizzes</h4>
                </div>
                <div className="quiz-list overflow-auto">
                  <ul>
                    {category.map((cat, index) =>
                      cat !== "Arts" ? this.makeQuiz(cat, index + 9) : null
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Home);
