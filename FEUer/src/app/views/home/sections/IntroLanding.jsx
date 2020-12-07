import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import Fab from '@material-ui/core/Fab'
import ConstantList from "../../../appConfig";
class IntroLanding extends Component {
  state = {}
  render() {
    return (
      <section
        className="section section-intro1"
        id="intro1"
        style={{
          background:
            'url('+ConstantList.ROOT_PATH+'assets/images/home-bg.jpg) center center/cover no-repeat',
        }}
      >
        <div className="container">
          <Grid container spacing={3} justify="center">
            <Grid item md={6}>
              <h1 className="section-intro1__title">
              TOP OFFERS. HIGH PROFIT.
              </h1>
              <div className="section-intro1__subtitle">
                The affiliate program with whitehat offers worldwide.
              </div>

              <div className="section-intro1__list">
                <div className="section-intro1__list__item">
                  <Icon color="secondary">check</Icon> Weekly payment.
                </div>
                <div className="section-intro1__list__item">
                  <Icon color="secondary">check</Icon> Fast optimizations on quality.
                </div>
                <div className="section-intro1__list__item">
                  <Icon color="secondary">check</Icon> Personal relationships.
                </div>
              </div>

              <div>
                <Fab
                  variant="extended"
                  size="large"
                  color="primary"
                  aria-label="Buy"
                  className="btn-action m-8"
                  href={ConstantList.ROOT_PATH + "session/signupregister"}
                >
                  <Icon className="mr-16">person_add</Icon>
                  Registration
                </Fab>

                <Fab
                  variant="extended"
                  size="large"
                  aria-label="Download"
                  className="btn-action btn-white m-8"
                  href={ConstantList.ROOT_PATH + "session/signin"}
                >
                  <Icon className="mr-16">person_pin</Icon>
                  Login
                </Fab>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="section-intro1__product">
                <a
                  href={ConstantList.ROOT_PATH + "session/signupregister"}
                  className="section-intro1__product__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="price">50%</div>
                  <span className="price__text">Hight Profit</span>
                </a>
                <img
                  src="./assets/images/landing/1097.jpg"
                  alt=""
                />
              </div>
            </Grid>
          </Grid>
        </div>
      </section>
    )
  }
}

export default IntroLanding
