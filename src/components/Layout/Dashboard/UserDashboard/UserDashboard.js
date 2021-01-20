import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import * as Action from "../../../../actionsFiles/apiActions";
import { Modal, Button } from "react-bootstrap";
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
    show: false,
    text: null,
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
      let user = this.props.auth.user;
      const quizList = quizLists.filter((quiz) => quiz.id !== id);
      user.quizList = quizList;
      Action.updateUser(user);
      this.setState({
        quizList,
      });
    }
    if (action === "play") {
      this.setState({
        play: {
          check: true,
          id: this.props.auth.user._id,
          id2: id,
        },
      });
    }
    if (action === "share") {
      this.setState({
        ...this.state,
        show: true,
        text: `${this.props.auth.user._id}/${id}`,
      });
    }
  };

  setShow(check) {
    this.setState({ ...this.state, show: check });
    navigator.clipboard.writeText(this.state.text);
  }

  render() {
    if (!this.props.auth.isAuth) {
      return <Redirect to="/" />;
    }
    if (this.state.play.check) {
      return (
        <Redirect to={`/user/${this.state.play.id}/${this.state.play.id2}`} />
      );
    }
    if (this.state.show) {
      return (
        <Modal show={this.state.show} onHide={(e) => this.setShow(true)}>
          <Modal.Header>
            <Modal.Title>Your Quiz Code</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <h5>{this.state.text}</h5>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={(e) => this.setShow(false)}>
              Copy
            </Button>
          </Modal.Footer>
        </Modal>
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
