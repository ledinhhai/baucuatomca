import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signInWithFB } from "../helpers/auth";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      email: "",
      password: ""
    };
    this.fbSignIn = this.fbSignIn.bind(this);
  }

  async fbSignIn(){
    try {
      await signInWithFB();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      <div className="container">
        <button className="btn btn-primary" type="button" onClick={this.fbSignIn}>
            Sign in with Facebook
        </button>
      </div>
    );
  }
}
