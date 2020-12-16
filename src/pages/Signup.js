import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signup, signInWithGoogle, signInWithGitHub } from "../helpers/auth";

export default class SignUp extends Component {

  constructor() {
    super();
    this.state = {
      error: null,
      email: '',
      password: '',
      name:''
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
    this.setState({ error: '' });
    if( this.state.name.length === 0){
      this.setState({ error: "Vui lòng chọn biệt danh" });
      return;
    }
    try {
      await signup(this.state.email, this.state.password, this.state.name);
    } catch (error) {
      console.log(error);
      if(error.code ==="auth/email-already-in-use"){
        this.setState({ error: "Email đã được sử dụng vui lòng sử dụng email khác" });
      }else if(error.code === "auth/weak-password"){
        this.setState({ error: "Mật khẩu phải có ít nhất 6 ký tự" });
      }else {
        this.setState({ error: "Đã có lỗi vui lòng liên hệ admin để hỗ trợ" });
      }
      
    }
  }

  async googleSignIn() {
    try {
      await signInWithGoogle();
    } catch (error) {
      this.setState({ error: error.message });
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
            Đăng ký tài khoản
            {/* <Link className="title ml-2" to="/">
              Chatty
            </Link> */}
          </h1>
          <div className="form-group">
            <input className="form-control" placeholder="Biệt danh" name="name" onChange={this.handleChange} value={this.state.name} type="text"></input>
          </div>
          <div className="form-group">
            <input className="form-control" placeholder="Email" name="email" type="email" onChange={this.handleChange} value={this.state.email}></input>
          </div>
          <div className="form-group">
            <input className="form-control" placeholder="Mật khẩu" name="password" onChange={this.handleChange} value={this.state.password} type="password"></input>
          </div>
          <div className="form-group">
            {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
            <button className="btn btn-primary px-5" type="submit">Đăng ký</button>
            <p className="line"><span>Hoặc</span></p>
            <button className="btn btn-danger" type="button" onClick={this.googleSignIn}>
              Đăng ký bằng Google
          </button>
          </div>
          <p>Nếu bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
        </form>
      </div>
    )
  }
}
