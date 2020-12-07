import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { setUserData } from "../redux/actions/UserActions";
import jwtAuthService from "../services/jwtAuthService";
import localStorageService from "../services/localStorageService";
import firebaseAuthService from "../services/firebase/firebaseAuthService";
import history from "history.js";
import ConstantList from "../appConfig";
class Auth extends Component {
  state = {};
  
  constructor(props) {
    super(props);
    let user = localStorageService.getItem("auth_user");
    //alert(user);
    if(user!=null){
      jwtAuthService.setSession(user.token);
      this.props.setUserData(user);
      if (window.location.pathname == ConstantList.ROOT_PATH ) {
        history.push(ConstantList.DASHBOARD_PAGE)
      } 
    }else {
      let url = window.location.pathname.split("/");
      console.log(window.location.pathname);

      if (window.location.pathname == ConstantList.ROOT_PATH || (url.length >0 && (url.indexOf("session") >=0) || url.indexOf("landing"))) {
          console.log(url.indexOf("session"));
      }  else {
        console.log(url);
          history.push(ConstantList.LOGIN_PAGE)
      }
    }
    
    //this.checkJwtAuth();
    // this.checkFirebaseAuth();
  }

  checkJwtAuth = () => {
    jwtAuthService.loginWithToken().then(user => {
      this.props.setUserData(user);
    });
  };

  checkFirebaseAuth = () => {
    firebaseAuthService.checkAuthStatus(user => {
      if (user) {
        console.log(user.uid);
        console.log(user.email);
        console.log(user.emailVerified);
      } else {
        console.log("not logged in");
      }
    });
  };

  render() {
    const { children } = this.props;
    return <Fragment>{children}</Fragment>;
  }
}

const mapStateToProps = state => ({
  setUserData: PropTypes.func.isRequired,
  login: state.login
});

export default connect(
  mapStateToProps,
  { setUserData }
)(Auth);
