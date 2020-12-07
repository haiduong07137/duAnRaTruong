import React, { Component } from "react";
import ConstantList from "../../appConfig";
import {
  Card,
  FormControlLabel,
  Grid,
  Button,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  RadioGroup,
  Radio,
  CircularProgress,
  withStyles,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { saveUser, checkEmail, checkUsername } from "./SignUpService";
import { FLAGS, PHONE } from "./Country";
import Autocomplete from "@material-ui/lab/Autocomplete";
import RegisterSuccessDialog from "./RegisterSuccessDialog";

const styles = (theme) => ({
  wrapper: {
    position: "relative",
  },

  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
});

class SignUp extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    username: "",
    email: "",
    password: "",
    re_password: "",
    agreement: "",
    eqaRound: null,
    name: "",
    socialContact: "",
    isAddNew: false,
    roles: [],
    isNetwork: null,
    checkComboBox: 1,
    person: {},
    checkNullContact: false,
    socialContactFake: "",
    nameSocial: "Zalo: ",
    id: "",
    loading: false,
    showRegisterSuccessDialog: false,
    hostSite: "",
    phoneCode: "",
    showTextBox: false,
  };

  handleChange = (event, source) => {
    event.persist();
    this.setState(
      {
        [event.target.name]: event.target.value,
        dupEmail : false,
        dupUsername : false

      },
      console.log(this.state.description)
    );
  };

  handleshowTextBox = (event) => {
    this.setState({
      showTextBox: event.target.value === "true",
    });
  };

  handleChangeCombo = (event, source) => {
    this.setState({ nameSocial: event.target.value + ": " });
  };

  handleFormSubmit = (event) => {
    this.setState({ loading: true });
    if (this.state.isNetwork === null) {
      this.setState({ checkNetwork: true, loading: false });
      return;
    } else {
      this.setState({ checkNetwork: false });
      checkEmail(this.state).then((result) => {
        if (result && result.data != null && result.data == false) {
          this.setState({ dupEmail: false });
          checkUsername(this.state).then((result) => {
            if (result && result.data != null && result.data == false) {
              this.setState({ dupUsername: false });
              this.setState({ dupUsername: false, dupEmail: false });
              var socicalContact =
                this.state.nameSocial + this.state.socialContactFake;
              var phoneNumber =
                "(" + this.state.phoneCode + ") " + this.state.phoneFake;
              this.setState({
                socialContact: socicalContact,
                phone: phoneNumber,
              });
              saveUser(this.state).then((user) => {
                this.setState({ loading: false });
                this.setState({ showRegisterSuccessDialog: true });
              });
            } else {
              this.setState({ dupUsername: true, loading: false });
            }
          });
        } else {
          this.setState({ dupEmail: true, loading: false });
        }
      });
    }
  };

  componentDidMount() {
    // this.setState({
    //   description: '\n Which categories do you interested in?: \n \n \n What suggestions do you have for us? :'
    // })
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
    this.setState({
      hostSite: window.location.origin + ConstantList.ROOT_PATH,
    });
  }
  componentWillUnmount() {
    // remove rule when it is not needed
    ValidatorForm.removeValidationRule("isPasswordMatch");
  }

  toSignInPage = () => {
    // this.props.history.push(ConstantList.ROOT_PATH + "session/signin");
    window.open("http://gmail.com", "_self")
  };

  handleDialogClose = () => {
    this.setState(
      {
        showRegisterSuccessDialog: false,
      },
      function () {
        this.toSignInPage();
      }
    );
  };

  render() {
    const { t, i18n } = this.props;

    const countryList = FLAGS;
    const phoneList = PHONE;
    let {
      name,
      confirmPassword,
      email,
      phone,
      phoneFake,
      country,
      description,
      password,
      username,
      isNetwork,
      website,
      trafficSource,
      comPany,
      socialContactFake,
      phoneCode,
      showRegisterSuccessDialog,
      showTextBox,
    } = this.state;
    let title;
    if (this.state.checkNetwork === true) {
      title = (
        <span style={{ color: "red" }}>
          {t("Validation.this_field_is_required")}
        </span>
      );
    } else {
      title = "";
    }

    let { classes } = this.props;
    let dupEmail;
    let dupUsername;
    if (this.state.dupEmail === true) {
      dupEmail = (
        <span className="w-100 mb-16 mr-16 ml-16" style={{ color: "red" }}>
          {" "}
          {t("Validation.check_email")}{" "}
        </span>
      );
    } else {
      dupEmail = "";
    }

    if (this.state.dupUsername === true) {
      dupUsername = (
        <span className="w-100 mb-16 mr-16 ml-16" style={{ color: "red" }}>
          {" "}
          {t("Validation.check_username")}{" "}
        </span>
      );
    } else {
      dupUsername = "";
    }
    return (
    
      <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
     
        <div className="signup flex flex-center w-100 h-100vh" style = {{ overflow: "auto"}}>
          <div className="p-8"  >
            <Card className="signup-card-customs position-relative y-center">
              <Grid container>
                <Grid item lg={2} md={2} sm={2} xs={12}>
                  <div className=" flex flex-center bg-light-gray flex-middle h-100">
                    <img
                      src={
                        ConstantList.ROOT_PATH +
                        "assets/images/logos/natureorigin.jpg"
                      }
                      alt=""
                    />
                  </div>
                </Grid>
                <Grid
                  item
                  lg={10}
                  md={10}
                  sm={10}
                  xs={12}
                  container
                  spacing={2}
                >
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <div className="pt-36">
                      <h4 className="text-center">{t("sign_up.title_form")}</h4>
                    </div>
                  </Grid>
                  <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    container
                    spacing={2}
                  >
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <TextValidator
                        className="w-100 mb-16 mr-16 ml-16"
                        variant="outlined"
                        label={
                          <span>
                            {t("sign_up.name")}{" "}
                            <span style={{ color: "red" }}> * </span>
                          </span>
                        }
                        onChange={this.handleChange}
                        type="text"
                        name="name"
                        value={name}
                        validators={["required"]}
                        errorMessages={t("Validation.this_field_is_required")}
                      />
                    </Grid>

                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <TextValidator
                        className="w-100 mb-16 mr-16 ml-16 "
                        variant="outlined"
                        label={
                          <span>
                            Email
                            <span style={{ color: "red" }}> * </span>
                          </span>
                        }
                        onChange={this.handleChange}
                        type="email"
                        name="email"
                        value={email}
                        validators={["required", "isEmail"]}
                        errorMessages={[
                          t("Validation.this_field_is_required"),
                          t("Validation.invalid_email"),
                        ]}
                      />
                      {dupEmail}
                    </Grid>

                    {/* <Grid item md={2} sm={2} xs={2}>
                      <Autocomplete
                        className="w-80 mb-16 mr-16 ml-16"
                        options={phoneList}
                        defaultValue={() => {
                          const defaultPhone = phoneList.filter(
                            (item) => item.name === phone
                          );
                          return defaultPhone.length > 0
                            ? defaultPhone[0]
                            : null;
                        }}
                        style={{ width: "100%" }}
                        onChange={(event, value) => {
                          this.setState({
                            phoneCode: value !== null ? value.dial_code : "",
                          });
                        }}
                        getOptionLabel={(option) =>
                          `${option.dial_code} ${option.name} `
                        }
                        getOptionSelected={(option, value) =>
                          option.value === value.value
                        }
                        renderInput={(params) => (
                          <TextValidator
                            {...params}
                            value={phoneCode}
                            label={
                              <span>
                                {t("sign_up.area_code")}{" "}
                                <span style={{ color: "red" }}> * </span>
                              </span>
                            }
                            validators={["required"]}
                            errorMessages={t(
                              "Validation.this_field_is_required"
                            )}
                          />
                        )}
                      />
                    </Grid> */}
                    <Grid item lg={4} md={4} sm={4} xs={8}>
                      <TextValidator
                        variant="outlined"
                        className="w-100 mb-16 mr-16 ml-16"
                        label={
                          <span>
                            {t("sign_up.phone")}{" "}
                            <span style={{ color: "red" }}> * </span>
                          </span>
                        }
                        onChange={this.handleChange}
                        type="text"
                        name="phoneFake"
                        value={phoneFake}
                        validators={["required"]}
                        errorMessages={t("Validation.this_field_is_required")}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <TextValidator
                        className="w-100 mb-16 mr-16 ml-16"
                        variant="outlined"
                        label={
                          <span>
                            {t("sign_up.username")}{" "}
                            <span style={{ color: "red" }}> * </span>
                          </span>
                        }
                        onChange={this.handleChange}
                        type="text"
                        name="username"
                        value={username}
                        validators={["required"]}
                        errorMessages={t("Validation.this_field_is_required")}
                      />
                      {dupUsername}
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <TextValidator
                        className="w-100 mb-16 mr-16 ml-16"
                        label={
                          <span>
                            {t("sign_up.password")}{" "}
                            <span style={{ color: "red" }}> * </span>
                          </span>
                        }
                        variant="outlined"
                        onChange={this.handleChange}
                        name="password"
                        type="password"
                        value={password}
                        validators={[
                          "required",
                          
                        ]}
                        errorMessages={[
                          t("Validation.this_field_is_required"),
                          
                        ]}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <TextValidator
                        className="w-100 mb-16 mr-16 ml-16"
                        label={
                          <span>
                            {t("sign_up.re_password")}{" "}
                            <span style={{ color: "red" }}> * </span>
                          </span>
                        }
                        variant="outlined"
                        onChange={this.handleChange}
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        validators={["required", "isPasswordMatch"]}
                        errorMessages={[
                          t("Validation.this_field_is_required"),
                          t("Validation.invalid_password"),
                        ]}
                      />
                    </Grid>

                    <Grid item md={6} sm={6} xs={6}>
                      <Autocomplete
                        className="w-100 mb-16 mr-16 ml-16"
                        options={countryList}
                        defaultValue={() => {
                          const defaultCountry = countryList.filter(
                            (item) => item.name === country
                          );
                          return defaultCountry.length > 0
                            ? defaultCountry[0]
                            : null;
                        }}
                        style={{ width: "100%" }}
                        onChange={(event, value) => {
                          this.setState({
                            country: value !== null ? value.name : "",
                          });
                        }}
                        getOptionLabel={(option) => ` ${option.name}`}
                        getOptionSelected={(option, value) =>
                          option.value === value.value
                        }
                        renderInput={(params) => (
                          <TextValidator
                            {...params}
                            value={country}
                            label={
                              <span>
                                {t("sign_up.country")}{" "}
                                <span style={{ color: "red" }}> * </span>
                              </span>
                            }
                            validators={["required"]}
                            errorMessages={t(
                              "Validation.this_field_is_required"
                            )}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <TextValidator
                        variant="outlined"
                        className="w-100 mb-16 mr-16 ml-16"
                        label={<span>{t("sign_up.website")}</span>}
                        onChange={this.handleChange}
                        type="text"
                        name="website"
                        validators={[
                          "required",
                          "matchRegexp:[(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,256}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)",
                        ]}
                        errorMessages={[
                          t("Validation.this_field_is_required"),
                          t("Validation.invalid_url"),
                        ]}
                        value={website}
                      />
                    </Grid>

                    {/* <Grid item lg={2} md={2} sm={2} xs={4}>
                      <FormControl className="w-100 mb-16 mr-16 ml-16">
                        <InputLabel id="demo-simple-select-label">
                          {" "}
                          {t("sign_up.contact")}
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          onChange={this.handleChangeCombo}
                          defaultValue="Zalo"
                        >
                          <MenuItem value="Zalo">Zalo</MenuItem>
                          <MenuItem value="Skype">Skype</MenuItem>
                          <MenuItem value="Telegram">Telegram</MenuItem>
                          <MenuItem value="Facebook">Facebook</MenuItem>
                          <MenuItem value=" ">{t("sign_up.other")}</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid> */}

                    {/* <Grid item lg={4} md={4} sm={4} xs={12}>
                      <TextValidator
                        className="w-100 mb-16 mr-16 ml-16"
                        variant="outlined"
                        label={<span>{t("sign_up.contact")}</span>}
                        onChange={this.handleChange}
                        type="text"
                        name="socialContactFake"
                        value={socialContactFake}
                        validators={["required"]}
                        errorMessages={t("Validation.this_field_is_required")}
                      />
                    </Grid> */}

                    {/* <Grid item lg={6} md={6} sm={6} xs={12}>
                      <TextValidator
                        variant="outlined"
                        className="w-100 mb-16 mr-16 ml-16"
                        label={<span>{t("sign_up.traffic_Source")}</span>}
                        onChange={this.handleChange}
                        type="text"
                        name="trafficSource"
                        value={trafficSource}
                      />
                    </Grid> */}

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <TextValidator
                        variant="outlined"
                        className="w-100 mb-16 mr-16 ml-16"
                        label={
                          <span>
                            {" "}
                            {`${t("sign_up.description")} (${t(
                              "general.maximum_255_characters"
                            )})`}
                          </span>
                        }
                        placeholder="Describe somthing about youself.	&#10;What categories are you interested in? 		&#10;What suggestions do you have for us?"
                        variant="outlined"
                        multiline
                        rows={6}
                        rowsMax={6}
                        onChange={this.handleChange}
                        type="text"
                        name="description"
                        value={description}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <FormControl
                        className="w-100 mb-16  ml-16"
                        component="fieldset"
                      >
                        <RadioGroup
                          style={{ height: 40, paddingTop: 10 }}
                          aria-label="isNetwork"
                          name="isNetwork"
                          value={isNetwork}
                          onChange={this.handleChange}
                        >
                          <FormControlLabel
                            style={{ width: 150 }}
                            value="true"
                            control={<Radio />} 
                            label="Is Agency"
                          />
                          <FormControlLabel
                            style={{ width: 150 }}
                            value="false"
                            control={<Radio />} 
                            label="Is Product"
                          />
                        </RadioGroup>
                        {title}
                      </FormControl>
                    </Grid>

                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      {showTextBox && (
                        <TextValidator
                          variant="outlined"
                          className="w-100 mb-16 mr-16 ml-16"
                          label={
                            <span>
                              {t("sign_up.company")}{" "}
                              <span style={{ color: "red" }}> * </span>
                            </span>
                          }
                          onChange={this.handleChange}
                          type="text"
                          name="comPany"
                          value={comPany}
                          validators={["required"]}
                          errorMessages={t("Validation.this_field_is_required")}
                        />
                      )}
                    </Grid>
                    {/* cristiandvh99@gmail.com */}
                  </Grid>

                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <div className="pl-36 pr-36 pb-36 h-100">
                      <div className="flex flex-middle">
                        <div className={classes.wrapper}>
                          <Button
                            className="capitalize"
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={this.state.loading}
                          >
                            {t("sign_up.title")}
                          </Button>

                          {this.state.loading && <CircularProgress size={24} />}
                        </div>

                        <span className="ml-16 mr-8">{t("general.or")}</span>
                        <Button
                          className="capitalize"
                          disabled={this.state.loading}
                          onClick={() =>
                            this.props.history.push(
                              ConstantList.ROOT_PATH + "session/signin"
                            )
                          }
                        >
                          {t("sign_in.title")}
                        </Button>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Card>

            {showRegisterSuccessDialog && (
              <RegisterSuccessDialog
                handleClose={this.handleDialogClose}
                open={showRegisterSuccessDialog}
              />
            )}
          </div>
        </div>

      </ValidatorForm>
      
    );
  }
}

const mapStateToProps = (state) => ({
  // setUser: PropTypes.func.isRequired
});

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, {})(SignUp)
);
