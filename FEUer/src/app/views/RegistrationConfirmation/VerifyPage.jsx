import React, { Component } from 'react'
import { scrollTo } from 'utils'
import ConstantList from '../../appConfig'
import RegistrationConfirmation from './sections/RegistrationConfirmation'
import { connect } from 'react-redux'
import { confirmRegistration } from '../../redux/actions/LoginActions'
import TopBar from './sections/TopBar'

class VerifyPage extends Component {
  state = {}
  componentDidMount = () => {
    const token = new URLSearchParams(this.props.location.search).get('token')
    this.props.confirmRegistration(token)
  }
  componentWillUnmount() {
    scrollTo('root')
  }
  handleButtonClick = (number) => {
    if (number === 0) {
      this.props.history.push(ConstantList.ROOT_PATH + 'session/signin')
    } else {
      this.props.history.push(ConstantList.ROOT_PATH)
    }
  }
  render() {
    const { t } = this.props
    return (
      <div className="landing">
        <TopBar />
        <RegistrationConfirmation
          t={t}
          confirmationResult={this.props.confirmationResult}
          handleButtonClick={this.handleButtonClick}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    confirmationResult: state.login.confirmationResult,
  }
}

export default connect(mapStateToProps, {
  confirmRegistration,
})(VerifyPage)
