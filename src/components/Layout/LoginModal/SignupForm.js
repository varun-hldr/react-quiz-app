import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Profile from "../../img/profiles";
import "../../css/LoginSignup.css";

export default class SignupForm extends Component {
  state = {
    formData: [],
    check: false,
  };

  render() {
    const names = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

    return (
      <div className="container signupForm">
        <div className="d-flex justify-content-center">
          <div className="signupHead">
            <h1>Sign Up</h1>
            <div className="signupFoot">
              {!this.state.check ? (
                <div className="signupDetails">
                  {this.state.text ? (
                    <span className="fieldValidate">{this.state.text}</span>
                  ) : null}
                  <h6 className="avatar text-center">Choose your avatar</h6>
                  <div className="userImages d-flex justify-content-center">
                    {names.map((name) => (
                      <div
                        onClick={(e) => this.onChangeHandler(e, Profile[name])}
                        type="button"
                        className="user"
                        key={name}
                      >
                        <img src={Profile[name]} alt={Profile[name]} />
                      </div>
                    ))}
                  </div>
                  <div className="d-flex justify-content-center">
                    <div className="signupData">
                      <div className="fullName input">
                        {this.state.name ? (
                          <span className="Validator">{this.state.name}</span>
                        ) : null}
                        <h5>Full name</h5>
                        <input
                          onChange={this.onChangeHandler}
                          name="name"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="Email input">
                        {this.state.email ? (
                          <span className="Validator">{this.state.email}</span>
                        ) : null}
                        <h5>Email</h5>
                        <input
                          onChange={this.onChangeHandler}
                          name="email"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div className="Password input">
                        {this.state.password ? (
                          <span className="Validator">
                            {this.state.password}
                          </span>
                        ) : null}

                        <h5>Password</h5>
                        <input
                          onChange={this.onChangeHandler}
                          name="password"
                          type="password"
                          placeholder="Enter password"
                        />
                      </div>
                      <div className="ConfirmPassword input">
                        <h5>Confirm Password</h5>
                        <input
                          onChange={this.onChangeHandler}
                          name="confirmPassword"
                          type="password"
                          placeholder="Confirm password"
                        />
                      </div>
                      <div className="signupButton">
                        <button
                          onClick={(e) =>
                            this.onSubmitHandler(this.state.formData)
                          }
                        >
                          Sign Up
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="successHead">
                  <div className="success">
                    <div className="rightTick">
                      <h1>✔</h1>
                    </div>
                  </div>
                  <div className="successDown">
                    <span className="successText">
                      Congratulations, your account has been successfully
                      created.
                    </span>
                  </div>
                  <button className="successButton">
                    <Link to="/login">Log In</Link>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  onChangeHandler = (e, url) => {
    let formData = this.state.formData;
    if (url) {
      formData = { ...formData, avatar: url };
    } else {
      formData = { ...formData, [e.target.name]: e.target.value };
    }
    this.setState({
      formData,
      password: null,
      text: null,
      name: null,
      email: null,
    });
  };

  onSubmitHandler = (formData) => {
    let check = false;
    function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
    if (
      !formData.password ||
      !formData.name ||
      !formData.email ||
      !formData.avatar
    ) {
      this.setState({
        text: "Field or Avatar cannot be empty.",
      });
    } else {
      if (formData.name.length < 5) {
        this.setState({
          name: "Please enter your full name.",
        });
      } else {
        if (!validateEmail(formData.email)) {
          this.setState({
            email: "Please enter proper email id.",
          });
        } else {
          if (formData.password !== formData.confirmPassword) {
            this.setState({
              password: "The password confirmation does not match.",
            });
          } else {
            check = true;
          }
        }
      }
    }
    if (check) {
      console.log(formData);
      this.setState({
        check: true,
      });
    }
  };
}
