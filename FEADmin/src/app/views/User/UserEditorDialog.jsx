import React, { Component } from "react";
import {
  Dialog,
  Button,
  Grid,
  IconButton,
  Icon,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  Checkbox,
  FormControlLabel,
  DialogActions,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  getUserByUsername,
  saveUser,
  getAllRoles,
  sendMailToCreatedUser,
} from "./UserService";
import { toast } from "react-toastify";
import localStorageService from "../../services/localStorageService";
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 1,
  //etc you get the idea
});

class UserEditorDialog extends Component {
  // constructor(props) {
  //   super(props)
  // }
  state = {
    userDepartmentId: "",
    department: {},
    isAddNew: false,
    listRole: [],
    roles: [],
    active: true,
    email: "",
    person: {},
    username: "",
    changePass: true,
    password: "",
    confirmPassword: "",
    userDepartments: [],
    id: "",
    name: "",
  };

  listGender = [
    { id: "M", name: this.props.t("general.male") },
    { id: "F", name: this.props.t("general.female") },
  ];

  handleChange = (event, source) => {
    event.persist();
    if (source === "switch") {
      this.setState({ isActive: event.target.checked });
      return;
    }
    if (source === "changePass") {
      this.setState({ changePass: event.target.checked });
      return;
    }
    if (source === "active") {
      this.setState({ active: event.target.checked });
      return;
    }
    if (source === "gender") {
      let { person } = this.state;
      person = person ? person : {};
      person.gender = event.target.value;
      this.setState({ person: person });
      return;
    }
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleFormSubmit = () => {
    this.setState({ disabled: true });
    let { id } = this.state;
    console.log(id);
    if (!id) {
      console.log(this.state);
      saveUser({
        ...this.state,
        shouldOpenEditorDialog: true,
      }).then ((result) => {
        console.log(result);
      })
    }
    // getUserByUsername(this.state.username).then(({ data }) => {
    //   if (data && data.id) {
    //     if (!id || (id && data.id !== id)) {
    //       this.setState({ disabled: false });
    //       return;
    //     }
    //   }

    //   saveUser({
    //     ...this.state,
    //   }).then((user) => {
    //     var { t } = this.props; 
    //     toast.success(t("general.success"));
    //     this.setState({ disabled: false });
    //     this.props.handleOKEditClose();
    //   });
    // });
  };

  selectRoles = (roleSelected) => {
    let roles = [];
    roles.push(roleSelected);
    this.setState({ roles });
  };

  componentWillMount() {
    let { item } = this.props;
    if (item) {
      this.setState(item);
      console.log(item);
    } else {
      console.log(123);
    }
    
  }

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });

    getAllRoles().then(({ data }) => {
      this.setState({
        listRole: data,
      });
    });
  }

  render() {
    let { open, handleClose, t } = this.props;
    let {
      isAddNew,
      listRole,
      roles,
      active,
      email,
      person,
      username,
      changePass,
      password,
      confirmPassword,
      disabled,
      name
    } = this.state;

    return (
      <Dialog
        onClose={handleClose}
        open={open}
        maxWidth={"md"}
        fullWidth={true}
      >
        <div
          style={{ cursor: "move" }}
          id="draggable-dialog-title"
          className="flex flex-space-between flex-middle pl-16 pr-8 py-8 bg-primary"
        >
          <h4 className="m-0 text-white">
            {this.state.id ? t("user.update") : t("user.add")}
          </h4>
          <IconButton onClick={this.props.handleClose}>
            <Icon className="text-white">clear</Icon>
          </IconButton>
        </div>
        <div className="p-24">
          <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
            <Grid className="mb-16" container spacing={2}>
              <Grid item sm={6} xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label={
                    <span>
                      {t("user.displayName")}{" "}
                      <span style={{ color: "red" }}> * </span>
                    </span>
                  }
                  onChange={
                    this.handleChange
                  }
                  type="text"
                  name="name"
                  value={name}
                  validators={["required"]}
                  errorMessages={[t("Validation.this_field_is_required")]}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <FormControl fullWidth={true}>
                  <InputLabel htmlFor="gender-simple">
                    {t("user.gender")}
                  </InputLabel>
                  <Select
                    value={person ? person.gender : ""}
                    onChange={(gender) => this.handleChange(gender, "gender")}
                    inputProps={{
                      name: "gender",
                      id: "gender-simple",
                    }}
                  >
                    {this.listGender.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextValidator
                  // InputProps={{
                  //   readOnly: !isAddNew,
                  // }}
                  className="w-100 mb-16"
                  label={
                    <span>
                      {t("user.username")}{" "}
                      <span style={{ color: "red" }}> * </span>
                    </span>
                  }
                  onChange={this.handleChange}
                  type="text"
                  name="username"
                  value={username}
                  validators={[
                    "required",
                    "matchRegexp:(^[A-Za-z0-9_.]{0,999}$)",
                  ]}
                  errorMessages={[
                    t("Validation.this_field_is_required"),
                    t("Validation.invalid_username"),
                  ]}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label={
                    <span>
                      Email <span style={{ color: "red" }}> * </span>
                    </span>
                  }
                  onChange={this.handleChange}
                  type="email"
                  name="email"
                  value={email}
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    t("Validation.this_field_is_required"),
                    t("Validation.check_email"),
                  ]}
                />
              </Grid> 
              {!isAddNew && (
                <Grid item sm={6} xs={12}>
                  <FormControlLabel
                    value={changePass}
                    className="mb-16"
                    name="changePass"
                    onChange={(changePass) =>
                      this.handleChange(changePass, "changePass")
                    }
                    control={<Checkbox checked={changePass} />}
                    label={t("user.changePass")}
                  />
                </Grid>
              )}
              <Grid item sm={6} xs={12}>
                <FormControlLabel
                  value={active}
                  className="mb-16"
                  name="active"
                  onChange={(active) => this.handleChange(active, "active")}
                  control={<Checkbox checked={active} />}
                  label={t("user.active")}
                />
              </Grid>
              {changePass !== null && changePass === true ? (
                <Grid container spacing={2}>
                  <Grid item sm={6} xs={12}>
                    <TextValidator
                      className="mb-16 w-100"
                      label={t("user.password")}
                      variant="outlined"
                      onChange={this.handleChange}
                      name="password"
                      type="password"
                      value={password}
                      validators={[
                        "required",
                        // "matchRegexp:((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8,20})",
                      ]}
                      errorMessages={[
                        t("Validation.this_field_is_required"),
                        // t("Validation.invalid_pattern_password"),
                      ]}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextValidator
                      className="mb-16 w-100"
                      label={t("user.confirmPassword")}
                      variant="outlined"
                      onChange={this.handleChange}
                      name="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      validators={["required", "isPasswordMatch"]}
                      errorMessages={[
                        t("Validation.this_field_is_required"),
                        "Password mismatch",
                      ]}
                    />
                  </Grid>
                </Grid>
              ) : (
                <div></div>
              )}
            </Grid>

            <DialogActions>
              <div className="flex flex-space-between flex-middle">
                <Button
                  variant="contained"
                  color="secondary"
                  className="mr-36"
                  disabled={disabled}
                  onClick={() => this.props.handleClose()}
                >
                  {t("general.cancel")}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={disabled}
                >
                  {t("general.save")}
                </Button>
              </div>
            </DialogActions>
          </ValidatorForm>
        </div>
      </Dialog>
    );
  }
}

export default UserEditorDialog;
