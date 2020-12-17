import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signin, signInWithGoogle, signInWithGitHub } from "../helpers/auth";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: "" });
    try {
      await signin(this.state.email, this.state.password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  async googleSignIn() {
    try {
      await signInWithGoogle();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }
  componentDidMount(){
    if(this.props.history.location.state != undefined){
      localStorage.setItem("Redirect", this.props.history.location.state["from"]["pathname"])
    }
  }

  render() {
    return (
      <div className="container">
        <form
          className="frmLogin"
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <h1 className="mb-5">
            Đăng nhập
            {/* <Link className="title ml-2" to="/">
              Chatty
            </Link> */}
          </h1>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Email"
              name="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Mật khẩu"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
            />
          </div>
          <div className="form-group">
            {this.state.error ? (
              <p className="text-danger">{this.state.error}</p>
            ) : null}
            <button className="btn btn-primary px-5" type="submit">Đăng nhập</button>
            <p className="line"><span>Hoặc</span></p>
            <button className="btn btn-danger" type="button" onClick={this.googleSignIn}>
              Đăng nhập bằng Google
          </button>
          </div>
          <hr /><p>
            Nếu chưa có tài khoản? Bạn có thể <Link to="/signup">Đăng ký</Link>
          </p>
        </form>

      </div>
    );
  }
}
