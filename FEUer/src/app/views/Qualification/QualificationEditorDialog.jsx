import React, { Component } from "react";
import {
  Dialog,
  Button,
  Grid
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { checkCode, addNewQualification, updateQualification } from "./QualificationService";

class QualificationEditorDialog extends Component {
  state = {
    name: "",
    code: "",
    description:"",
    isActive: false
  };

  handleChange = (event, source) => {
    event.persist();
    if (source === "switch") {
      this.setState({ isActive: event.target.checked });
      return;
    }
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleFormSubmit = () => {
    let { id } = this.state;
    let { code } = this.state;

    checkCode(id, code).then((result) => {
      //Nếu trả về true là code đã được sử dụng
      if (result.data) {
        console.log("Code đã được sử dụng");
        alert("Code đã được sử dụng");
      } else {
        //Nếu trả về false là code chưa sử dụng có thể dùng
        if (id) {
            updateQualification({
            ...this.state
          }).then(() => {
            this.props.handleOKEditClose();
          });
        } else {
            addNewQualification({
            ...this.state
          }).then(() => {
            this.props.handleOKEditClose();
          });
        }
      }
    });
  };

  componentWillMount() {
    //getUserById(this.props.uid).then(data => this.setState({ ...data.data }));
    let { open, handleClose,item } = this.props;
    this.setState(item);
  }

  render() {
    let {
      id,
      name,
      code,
      description
    } = this.state;
    let { open, handleClose, handleOKEditClose, t, i18n } = this.props;
    return (
      <Dialog    open={open}>
        <div className="p-24">
          <h4 className="mb-20">{t("SaveUpdate")}</h4>
          <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
            <Grid className="mb-16" container spacing={4}>
              <Grid item sm={12} xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label={t("Code")}
                  onChange={this.handleChange}
                  type="text"
                  name="code"
                  value={code}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label={t("Name")}
                  onChange={this.handleChange}
                  type="text"
                  name="name"
                  value={name}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label={t("Description")}
                  onChange={this.handleChange}
                  type="text"
                  name="description"
                  value={description}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
              </Grid>
            </Grid>

            <div className="flex flex-space-between flex-middle">
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
              <Button variant="contained" color="secondary" onClick={() => this.props.handleClose()}>Cancel</Button>
            </div>
          </ValidatorForm>
        </div>
      </Dialog>
    );
  }
}

export default QualificationEditorDialog;
