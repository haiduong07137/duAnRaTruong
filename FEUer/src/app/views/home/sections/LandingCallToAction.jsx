import React, { Component } from "react";
import { Grid, Button, Icon } from "@material-ui/core";

class LandingCallToAction extends Component {
  state = {};
  render() {
    let { bg } = this.props;
    return (
      <div
        className="section section-cta1"
        id="cta1"
        style={{
          background: `url(${bg ||
            "./assets/images/home-bg.jpg"}) center center/cover no-repeat`
        }}
      >
        <div className="container">
          <Grid
            container
            spacing={3}
            direction="row"
            alignItems="center"
            justify="flex-start"
          >
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <h2>Dont miss the best management tool of the world</h2>
              <p>
                Register now to use and experience the best features.
              </p>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12} className="text-center">
              <div className="text-center mb-16">
                <Icon className="card__icon-64">trending_up</Icon>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default LandingCallToAction;
