import React, { Component } from "react";
import { connect } from "react-redux";
import "../../css/LeaderBoard.css";

class LeaderBoard extends Component {
  state = {
    user: [],
  };
  componentDidMount() {
    this.setState({
      user: this.props.users[0],
    });
  }
  render() {
    const users = this.props.users;
    const { user } = this.state;
    return (
      <div className="leaderboard">
        <div className="leaderboard-header">
          <div className="profile d-flex">
            <img src={user.avatar} alt="" />
            <div className="profile-text">
              <h5>{user.name}</h5>
              <p>{user.email}</p>
            </div>
          </div>
          <div className="position text-center">
            <p>
              You are in <b>{user.position}</b> place with <b>{user.points}</b>{" "}
              points
            </p>
          </div>
        </div>
        <div className="leaderboard-footer overflow-auto ">
          {users.map((user) => this.makeProfile(user))}
        </div>
      </div>
    );
  }
  makeProfile = (user) => {
    const clickHandle = (user) => {
      this.setState({
        user: user,
      });
    };
    return (
      <div
        onClick={(e) => clickHandle(user)}
        type="button"
        className="user d-flex justify-content-between"
      >
        <div>
          <b className="number">{user.index}</b>
          <img src={user.avatar} alt="" />
          <b className="name">{user.name}</b>
        </div>
        <div>
          <b className="point">{user.points}</b>
        </div>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(LeaderBoard);
