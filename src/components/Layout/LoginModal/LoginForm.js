import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Loader from "../Loader/Loader";
import * as actions from "../../../actionsFiles/apiActions";
import * as Social from "../../img/socialIcon";
import * as Logic from "../../Logics/Logics";
import "../../css/LoginSignup.css";

class LoginForm extends Component {
  state = {
    formData: [],
    text: null,
    redirect: null,
  };

  componentDidMount() {
    const { dispatch, quiz } = this.props;
    if (!quiz.uLoaded) {
      dispatch(actions.getUsers());
    }
  }

  onSubmitHandler = (users) => {
    const { formData } = this.state;
    let check = false;
    users.map((user) => {
      if (
        user.email === formData.email &&
        user.password === formData.password
      ) {
        let theUser = user;
        if (user.avatar === "") {
          const img = Logic.imageGenerator(user);
          theUser = { ...theUser, avatar: img };
        }
        this.props.dispatch(actions.setUser(theUser));
        check = true;
      }
      return null;
    });
    if (!check) {
      this.setState({
        text: "Invalid email or password.",
      });
    } else {
      this.setState({
        redirect: "/dashboard",
      });
    }
  };

  render() {
    const { users, uLoaded } = this.props.quiz;
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div>
        {!uLoaded ? (
          <Loader />
        ) : (
          <div className="container signupForm">
            <div className="d-flex justify-content-center">
              <div className="signupHead">
                <h1>QuizUp</h1>
                <div className="signupFoot">
                  <div className="signupDetails">
                    <div className="d-flex justify-content-center">
                      <div className="signupData">
                        <h2 className="login">Log In</h2>
                        <div className="Email input">
                          {this.state.text ? (
                            <span className="Validator">{this.state.text}</span>
                          ) : null}
                          <h5>Email</h5>
                          <input
                            onChange={this.onChangeHandler}
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                          />
                        </div>
                        <div className="Password input">
                          <h5>Password</h5>
                          <input
                            onChange={this.onChangeHandler}
                            name="password"
                            type="password"
                            placeholder="Enter password"
                          />
                        </div>
                        <div className="signupButton">
                          <button
                            onClick={(e) => this.onSubmitHandler(users)}
                            className="btnn"
                          >
                            Log In
                          </button>
                        </div>
                        <h5 className="text-center mt-4">or login using</h5>
                        <div className="d-flex justify-content-center">
                          <div type="button">
                            <img src={Social.facebook} alt={Social.facebook} />
                          </div>
                          <div type="button">
                            <img src={Social.google} alt={Social.google} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  onChangeHandler = (e) => {
    let formData = this.state.formData;
    formData = { ...formData, [e.target.name]: e.target.value };

    this.setState({
      formData,
      text: null,
    });
  };
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(LoginForm);
