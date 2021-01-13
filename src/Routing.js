import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as Layout from "./components/Layout/";

const Routing = (props) => {
  return (
    <div className="container">
      <Router>
        <Layout.NavBar />
        <Route exact path="/" component={Layout.Home} />
        <Route path="/quiz/:id" component={Layout.QuizPanel} />
        <Layout.Footer />
      </Router>
    </div>
  );
};

export default Routing;
