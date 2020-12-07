import React, { Component } from "react";
import {
  Dialog,
  Button,
  Grid,
  FormControlLabel,
  DialogActions,
  FormLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Draggable from "react-draggable";
import Paper from "@material-ui/core/Paper";
import shortId from "shortid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
class LandingPageEditorDialog extends Component {
  state = {
    url: "",
    type: "",
    isShow: null,
    tempId: null,
  };

  handleChange = (event) => {
    event.persist();
    if (event.target.value === "true" || event.target.value === "false") {
      this.setState({
        [event.target.name]: event.target.value === "true" ? true : false,
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
  };

  handleFormSubmit = () => {
    this.setState({ disabled: true });
    if (this.state.tempId === null) {
      const tempId = shortId.generate();
      this.setState({ tempId }, () => this.props.handleSubmit(this.state));
    } else {
      this.props.handleSubmit(this.state);
    }

    this.setState({ disabled: false });
  };

  componentDidMount() {}

  resetState = () => {
    this.setState({
      url: "",
      type: "",
      isShow: true,
      tempId: null,
    });
  };

  editLandingPage = ({ url, type, isShow, tempId }) => {
    this.setState({
      url,
      type,
      isShow,
      tempId,
    });
  };

  render() {
    let { open, t, i18n } = this.props;
    let { disabled } = this.state;
    // const urlRegex =
    //   '[(https://)|(http://)]*[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,256}\\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)'

    const urlRegex = "^[0-9]$";
    return (
      <Dialog open={open} PaperComponent={PaperComponent} maxWidth="md">
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          <h4 className="mb-5">{t("general.saveUpdate")}</h4>
        </DialogTitle>
        <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
          <DialogContent>
            <Grid className="mb-5" container spacing={1}>
              <Grid item sm={12} xs={12}>
                <TextValidator
                  className="mb-16 w-100"
                  label={t("LandingPage.url")}
                  onChange={this.handleChange}
                  type="text"
                  name="url"
                  value={this.state.url}
                  validators={[
                    "required",
                    "matchRegexp:[(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,256}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)",
                  ]}
                  errorMessages={[
                    t("Validation.this_field_is_required"),
                    t("Validation.invalid_url"),
                  ]}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextValidator
                  className="mb-16 w-100"
                  label={t("LandingPage.type")}
                  onChange={this.handleChange}
                  type="text"
                  name="type"
                  value={this.state.type}
                  validators={["required"]}
                  errorMessages={[t("Validation.this_field_is_required")]}
                  select
                >
                  <MenuItem value="Landing Page">Landing Page</MenuItem>
                  <MenuItem value="Pre Landing Page">Pre Landing Page</MenuItem>
                </TextValidator>
              </Grid>
              <Grid item sm={12} xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    {t("LandingPage.isShow")}
                  </FormLabel>
                  <RadioGroup
                    style={{ display: "block" }}
                    aria-label="isShow"
                    name="isShow"
                    value={this.state.isShow ? "true" : "false"}
                    onChange={this.handleChange}
                  >
                    <FormControlLabel
                      style={{ float: "left" }}
                      value="true"
                      control={<Radio />}
                      label={t("general.yes")}
                    />
                    <FormControlLabel
                      style={{ float: "left" }}
                      value="false"
                      control={<Radio />}
                      label={t("general.no")}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <div className="flex flex-space-between flex-middle mt-36">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="mr-36"
                disabled={disabled}
              >
                {t("general.save")}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => this.props.handleClose()}
              >
                {t("general.cancel")}
              </Button>
            </div>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    );
  }
}

export default LandingPageEditorDialog;
