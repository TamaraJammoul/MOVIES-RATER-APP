import React, { Component } from "react";
import { withCookies } from "react-cookie";
class Login extends Component {
  state = {
    credentials: {
      username: "",
      password: "",
    },
    isLogin: true,
  };
  inputChanged = (event) => {
    let cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({ credentials: cred });
  };
  login = () => {
    if (this.state.isLogin) {
      fetch(`${process.env.REACT_APP_API_URL}/auth/`, {
        method: "POST",
        headers: {
          content_type: "application/json",
        },
        body: JSON.stringify(this.state.credentials),
      })
        .then((res) => res.json())
        .then((res) => {
          this.props.cookies.set("mr_token", res.token);
          window.location.href = "/movies";
        })
        .catch((error) => console.log(error));
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/api/users/`, {
        method: "POST",
        headers: {
          content_type: "application/json",
        },
        body: JSON.stringify(this.state.credentials),
      })
        .then((resp) => resp.json())
        .then((resp) => {
          this.setState({ isLogin: true });
        })
        .catch((error) => console.log(error));
    }
  };
  changeView = () => {
    this.setState({ isLogin: !this.state.isLogin });
  };
  render() {
    return (
      <div className="login-container">
        <h1>{this.state.isLogin ? "Login" : "Sign up"}</h1>
        <span>Username</span>
        <br />
        <input
          type="text"
          name="username"
          value={this.state.credentials.usarname}
          onChange={this.inputChanged}
        />
        <br />
        <span>Password</span>
        <br />
        <input
          type="password"
          name="password"
          value={this.state.credentials.password}
          onChange={this.inputChanged}
        />
        <button onClick={this.login}>
          {this.state.isLogin ? "Login" : "Sign up"}
        </button>
        <p onClick={this.changeView}>
          {this.state.isLogin ? "Create Account" : "back to login"}
        </p>
      </div>
    );
  }
}
export default withCookies(Login);
