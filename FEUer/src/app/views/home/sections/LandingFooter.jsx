import React, { Component } from "react";
import { Grid, Button, Icon } from "@material-ui/core";

class LandingFooter extends Component {
  state = {};
  render() {
    return (
      <div className="section-footer1 bg-light-dark" id="footer1">
        <div className="container">
          <Grid container>
            <Grid item lg={6} md={6} sm={12}>
              <div className="footer1__about">
                <h4 className="text-white">About Us</h4>
                <p>
                  Offer Pro

                </p>
              </div>
            </Grid>
            {/* <Grid item lg={3} md={3} sm={12}>
              <div className="footer1__contact">
                <h4 className="text-white">Contact</h4>
                <div className="px-16 my-32">
                  <Icon className="footer1__contact__icon">mail</Icon>
                  <div className="pl-16">
                    <h5 className="m-0 p-0 text-white">Email</h5>
                    <p className="m-0 p-0">infor@kiwieco.com</p>
                  </div>
                </div>
                <div className="px-16 mt-32">
                  <Icon className="footer1__contact__icon">location_on</Icon>
                  <div className="pl-16">
                    <h5 className="m-0 p-0 text-white">Adress</h5>
                    <p className="m-0 p-0"> Ho Chi Minh City, Vietnam</p>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item lg={3} md={3} sm={12}>
              <div className="footer1__disclaimer">
                <h4 className="text-white">Social</h4>

                <div className="mt-32 footer1__disclaimer__link">
                  <a href="#linkedin" className="px-8">
                    <img src="./assets/images/skype-24.png" alt="" /> <span>+84934605742 </span>
                  </a>
                </div>
                <div className="mt-32 footer1__disclaimer__link">
                  <a href="#twitter" className="px-8">
                    <img src="./assets/images/whatsapp-24.png" alt="" /><span>+84934605742 </span>
                  </a>
                </div>
                <div className="mt-32 footer1__disclaimer__link">
                  <a href="#facebook" className="px-8">
                    <img src="./assets/images/social-facebook.png" alt="" />
                  </a>
                </div>
              </div>
            </Grid> */}
          </Grid>
        </div>
      </div>
    );
  }
}

export default LandingFooter;
