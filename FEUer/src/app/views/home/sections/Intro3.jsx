import React, { Component } from "react"; import {
  Icon,
  Grid,
  Fab
} from "@material-ui/core";
import ConstantList from "../../../appConfig";
import { getCurrentEQARound } from "./../HomeService";
import Moment from 'moment';
import { connect } from "react-redux";
import { logoutUser } from "app/redux/actions/UserActions";
import { PropTypes } from "prop-types";

class Intro3 extends Component {
  handleSignOut = () => { this.props.logoutUser(); };
  constructor(props) {
    super(props);

    getCurrentEQARound().then((result) => {
      let currentEQARound = result.data;
      this.setState({ currentEQARound: currentEQARound });
    });
  }

  state = {
    currentEQARound: null
  };
  render() {
    const { t, i18n } = this.props;
    let {
      currentEQARound
    } = this.state;
    return (
      <section className="section section-intro1 section-intro3" id="intro3">
        <div className="container">
          <Grid container spacing={3} justify="center">
            <Grid item md={12}>
              <h1 className="section-intro1__title" dangerouslySetInnerHTML={{ __html: t("landing_page.noti") }} >
                
              </h1>
            </Grid>
            <Grid item md={6}>
              <div className="intro3__product">
                <img src="./assets/images/illustrations/2.svg" alt="" />
              </div>
            </Grid>
          </Grid>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  logoutUser: PropTypes.func.isRequired,
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Intro3);