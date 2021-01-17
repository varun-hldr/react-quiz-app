import React from "react";
import * as Logics from "../../../Logics/Logics";
import "../../../css/UserDashboard.css";

const Results = ({ quiz }) => {
  return (
    <div className="resultDetails">
      <h3>All Quizzes Created by you</h3>
      <h4>Total no. of users played</h4>
      <button className="times">{quiz.totalPlayed} times</button>
      <div className="userLeaderboard">
        <h4 className="text-center text-uppercase">leaderboard</h4>
        <div className="leaderboardList overflow-auto">
          {Logics.getLeaderboard(quiz.players)}
        </div>
      </div>
    </div>
  );
};

export default Results;
