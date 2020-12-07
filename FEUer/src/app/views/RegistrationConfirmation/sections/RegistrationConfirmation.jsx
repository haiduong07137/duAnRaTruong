import React, { Component } from 'react'
import ConstantList from '../../../appConfig'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import Fab from '@material-ui/core/Fab'
import { connect } from 'react-redux'
import { confirmRegistration } from '../../../redux/actions/LoginActions'
import { Button } from '@material-ui/core'

class RegistrationConfirmation extends Component {
  constructor(props) {
    super(props)
  }
  // componentDidMount = () => {
  //   const token = new URLSearchParams(this.props.location.search).get('token')
  //   this.props.confirmRegistration(token)
  // }
  render() {
    const { t } = this.props
    return (
      <section
        className="section section-intro1"
        id="intro1"
        style={{
          background:
            'url(./assets/images/home-bg.jpg) center center/cover no-repeat',
        }}
      >
        <div className="container">
          <Grid container spacing={3} justify="center">
            <Grid item md={6}>
              <h1 className="section-intro1__title">
                {this.props.confirmationResult !== null
                  ? this.props.confirmationResult === 1
                    ? t('Verify.something_went_wrong')
                    : this.props.confirmationResult === 2
                    ? t('Verify.something_went_wrong')
                    : this.props.confirmationResult === 3
                    ? t('Verify.verify_successful_title')
                    : t('Verify.something_went_wrong')
                  : ''}
              </h1>
              <div
                className="section-intro1__subtitle"
                style={{ color: 'white' }}
              >
                {this.props.confirmationResult !== null
                  ? this.props.confirmationResult === 1
                    ? t('Verify.invalid_token')
                    : this.props.confirmationResult === 2
                    ? t('Verify.time_expired')
                    : this.props.confirmationResult === 3
                    ? t('Verify.verify_successful_message')
                    : t('Verify.try_again')
                  : ''}
              </div>

              <div className="section-intro1__list">
                <div className="section-intro1__list__item">
                  <Icon color="secondary">check</Icon>{' '}
                  {t('Verify.make_sure_connection_ok')}
                </div>
                <div className="section-intro1__list__item">
                  <Icon color="secondary">check</Icon>{' '}
                  {t('Verify.make_sure_correct_url')}
                </div>
                <div className="section-intro1__list__item">
                  <Icon color="secondary">check</Icon>{' '}
                  {t('Verify.make_sure_within_time')}
                </div>
              </div>

              <div>
                <Fab
                  variant="extended"
                  size="large"
                  color="primary"
                  aria-label="Buy"
                  className="btn-action m-8"
                  onClick={
                    this.props.confirmationResult === 3
                      ? () => this.props.handleButtonClick(0)
                      : () => this.props.handleButtonClick(1)
                  }
                >
                  <Icon className="mr-16">flight_takeoff</Icon>
                  {this.props.confirmationResult !== null
                    ? this.props.confirmationResult === 3
                      ? t('general.login')
                      : t('general.back_to_dashboard')
                    : ''}
                </Fab>

                {/* <Fab
                  variant="extended"
                  size="large"
                  aria-label="Download"
                  className="btn-action btn-white m-8"
                >
                  <Icon className="mr-16">alarm_on</Icon>
                  {this.props.confirmationResult === 1
                    ? t('general.back_to_dashboard')
                    : this.props.confirmationResult === 2
                    ? t('general.back_to_dashboard')
                    : this.props.confirmationResult === 3
                    ? t('general.login')
                    : t('general.back_to_dashboard')}
                </Fab> */}
              </div>
            </Grid>
            <Grid
              item
              md={6}
              style={{
                textAlign: 'center',
              }}
            >
              {this.props.confirmationResult !== null ? (
                this.props.confirmationResult === 3 ? (
                  <div
                    style={{
                      background:
                        'url(./assets/images/checkmark.svg) no-repeat center center',
                      height: '100%',
                      width: '100%',
                    }}
                  ></div>
                ) : (
                  <div
                    style={{
                      background:
                        'url(./assets/images/cross.svg) no-repeat center center',
                      height: '100%',
                      width: '100%',
                      backgroundSize: '240px 240px',
                    }}
                  ></div>
                )
              ) : (
                ''
              )}
              {/* <div className="section-intro1__product"> */}
              {/* <a
                  href="https://themeforest.net/user/mh_rafi/portfolio"
                  className="section-intro1__product__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="price">$16</div>
                  <span className="price__text">Buy On ThemeForest</span>
                </a> */}
              {/* <img
                src="./assets/images/cross.svg"
                alt=""
                width="250px"
                height="250px"
              /> */}
              {/* </div> */}
            </Grid>
          </Grid>
        </div>
      </section>
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
})(RegistrationConfirmation)
