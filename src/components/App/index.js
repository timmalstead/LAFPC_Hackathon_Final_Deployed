import React, { Component } from "react"
import { Route, Switch, Redirect, withRouter } from "react-router-dom"
import Homepage from "../Homepage"
import AddAdmin from "../addAdmin"
import Affordable from "../Affordable"
import Healthy from "../Healthy"
import Fair from "../Fair"
import Sustainable from "../Sustainable"
import Navbar from "../Navbar"
import AdminHome from "../AdminHome"
import SignIn from "../SignIn"
import AdminButton from "../AdminButton"
import Container from "@material-ui/core/Container"
import Footer from "../Footer"

const My404 = () => {
  return (
    <div>
      <Redirect to="/home" />
    </div>
  )
}

class App extends Component {
  state = {
    user: null,
    laoding: true,
    isLogged: false,
    data: [],
    affordable: []
  }

  componentDidMount() {
    // const user = JSON.parse(localStorage.getItem('admin'))
    // if(user) {
    //   this.setState({
    //     user: user
    //   })
    // }
    const admin = localStorage.getItem("admin")
    if (admin) {
      const currentAdmin = admin
      this.setState({
        isLogged: true,
        user: admin
      })
    }
  }

  register = async data => {
    try {
      const registerResponse = await fetch(`/admin/register-admin`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const parsedResponse = await registerResponse.json()
      localStorage.setItem("admin", parsedResponse.data.username)
      localStorage.setItem("loggedIn", true)
      this.setState({
        user: parsedResponse.data,
        loading: false,
        isLogged: true
      })
    } catch (err) {
      console.log(err, "this is error from register")
    }
  }

  login = async loginInfo => {
    try {
      const loginResponse = await fetch(`/admin/login-admin`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(loginInfo),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const parsedResponse = await loginResponse.json()
      localStorage.setItem(
        "admin",
        JSON.stringify(parsedResponse.foundAdmin.username)
      )
      localStorage.setItem("loggedIn", true)
      this.setState(() => {
        return {
          isLogged: true,
          user: parsedResponse.foundUser,
          loading: false
        }
      })

      return parsedResponse
    } catch (err) {
      alert("sorry, wrong info")
      console.log(err)
    }
  }

  logout = async () => {
    try {
      fetch(`/admin/logout-admin`).then(res => {
        this.setState({
          isLogged: false
        })
      })
      localStorage.removeItem("admin")
      localStorage.removeItem("loggedIn")
      this.props.history.push(`/`)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { login } = this.login
    return (
      <div>
        <AdminButton logout={this.logout} user={this.state} />
        {/* <Navbar /> */}
        {<Route path="/sustainable" /> === window.location.pathname ? (
          <Navbar />
        ) : (
          ""
        )}
        <Switch>
          {this.state.isLogged ? (
            <Route exact path="/admin-home" render={() => <AdminHome />} />
          ) : (
            <Route exact path="/" render={props => <Homepage {...props} />} />
          )}
          <Route
            exact
            path="/addadmin"
            render={props => <AddAdmin register={this.register} {...props} />}
          />
          <Route exact path="/" render={props => <Homepage {...props} />} />
          <Route exact path="/home" render={props => <Homepage {...props} />} />
          <Route
            exact
            path="/affordable"
            render={() => <Affordable isLogged={this.state.isLogged} />}
          />
          <Route
            exact
            path="/healthy"
            render={() => <Healthy isLogged={this.state.isLogged} />}
          />
          <Route
            exact
            path="/fair"
            render={() => <Fair isLogged={this.state.isLogged} />}
          />
          <Route
            exact
            path="/sustainable"
            render={() => <Sustainable isLogged={this.state.isLogged} />}
          />
          <Route
            exact
            path="/signin"
            render={() => <SignIn login={this.login} />}
          />
          <Route component={My404} />
        </Switch>
        <Footer user={this.state} />
      </div>
    )
  }
}

export default withRouter(App)
