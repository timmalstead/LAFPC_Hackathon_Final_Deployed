import React, { Component } from "react"
import ReactModalLogin from "react-modal-login"
import { withRouter } from "react-router-dom"

class LoginModal extends Component {
  state = {
    showModal: false,
    loading: false,
    error: null
  }

  openModal() {
    this.setState({
      showModal: true
    })
  }
  closeModal() {
    this.setState({
      showModal: false,
      error: null
    })
  }
  onLoginSuccess(method, response) {}

  onLoginFail(method, response) {
    this.setState({
      error: response
    })
  }
  startLoading() {
    this.setState({
      loading: true
    })
  }

  finishLoading() {
    this.setState({
      loading: false
    })
  }

  afterTabsChange() {
    this.setState({
      error: null
    })
  }
  render() {
    return (
      <div>
        <button onClick={() => this.openModal()}>Open Modal</button>

        <ReactModalLogin
          visible={this.state.showModal}
          onCloseModal={this.closeModal.bind(this)}
          loading={this.state.loading}
          error={this.state.error}
          tabs={{
            afterChange: this.afterTabsChange.bind(this)
          }}
          loginError={{
            label: "Please try again"
          }}
          registerError={{
            label: "Please try again"
          }}
          startLoading={this.startLoading.bind(this)}
          finishLoading={this.finishLoading.bind(this)}
        />
      </div>
    )
  }
}

export default withRouter(LoginModal)
