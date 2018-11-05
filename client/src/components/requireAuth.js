// convention: lower case filename if exporting a function

/* High Order Component */

import React, { Component } from "react";
import { connect } from "react-redux";

export default ChildComponent => {
  class ComposedComponent extends Component {
    // component just got rendered
    componentDidMount() {
      this.shouldNavigateAway();
    }

    // this is called whenever component gets a new set of props
    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if (!this.props.auth) {
        this.props.history.push("/");
      }
    }

    render() {
      // whatever props were originally set on the child component
      // need to be passed in forward now that the HOC has been injected
      return <ChildComponent {...this.props} />;
    }
  }

  // every component with a connect expects to see a parent up the chain
  // with a Provider wrapper

  // state.auth comes out of the combineReducers function
  function mapStateToProps(state) {
    return { auth: state.auth.authenticated };
  }

  return connect(mapStateToProps)(ComposedComponent);
};
