import React, { Component } from "react";
import {
  IconButton,
  Dialog,
  Button,
  Icon,
  Grid,
  FormControlLabel,
  TablePagination,
  Switch,
  DialogActions,
  Checkbox
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { checkCode, addNewData, updateData, getItemById, gotOffer } from "./OfferAgencyService";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Autocomplete from '@material-ui/lab/Autocomplete';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';
import MaterialTable, { MTableToolbar, Chip, MTableBody, MTableHeader } from 'material-table';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}
function MaterialButton(props) {
  const { t, i18n } = useTranslation();
  const item = props.item;
  return <div>
    <IconButton onClick={() => props.onSelect(item, 0)}>
      <Icon color="primary">edit</Icon>
    </IconButton>
    <IconButton onClick={() => props.onSelect(item, 1)}>
      <Icon color="error">delete</Icon>
    </IconButton>
  </div>;
}
class SanPhamDialog extends Component {
  state = {
    name: "",
    code: "",
    listCategory: [],
    category: [],
    payoutValue:0,
    description: "",
    totalElements: 0,
    rowsPerPage: 25,
    page: 0,
    id: "",
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
    if (id) {
      gotOffer({
        ...this.state
      }).then(() => {
        this.props.handleOKEditClose();
        var { t, i18n } = this.props;
        toast.info(t('general.success'))
      });
    }
  };

  handleChangeNumberSeparated = (event, source) => {
    event.persist()
    var number = event.target.value;
    number = this.removeSeparatedNumber(number)
    var numberSeparated = this.addSeparatedNumber(number);
    this.setState({
      [event.target.name]: numberSeparated,
    })
  }

  addSeparatedNumber(number) {
    var x = number.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  }

  removeSeparatedNumber(number) {
    for (var i = 0; i < number.length; i++) {
      if (number[i] == ",") {
        number = number.substring(0, i) + number.substring(i + 1)
      }
    }
    return number;
  }


  componentWillMount() {

    this.setState({
      ...this.props.item
    },()=> {
      this.setState({ payoutValue:this.addSeparatedNumber(this.state.payoutValue+'') })
    });

    this.state.oldPayout = this.props.item.payoutValue;

  }

  componentDidMount() {

    var searchObject = {};
    searchObject.keyword = this.state.keyword;
    searchObject.pageIndex = this.state.page + 1;
    searchObject.pageSize = this.state.rowsPerPage;


  }

  render() {
    let {
      payoutValue,
      oldPayout
    } = this.state;
    let { open, handleClose, handleOKEditClose, t, i18n } = this.props;
    return (
      <Dialog open={open} PaperComponent={PaperComponent} maxWidth="md" fullWidth={false}>
        <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            <h4 className="mb-20">{t('general.saveUpdate')}</h4>
          </DialogTitle>
          <DialogContent>
            <Grid className="mb-10" container spacing={3}>

              <Grid item md={12} sm={12} xs={12}>
                <TextValidator
                  className="w-100"
                  label="Public Payout Value"
                  onChange={this.handleChange}
                  disabled
                  type="number"
                  name="oldPayout"
                  value={oldPayout}
                />
              </Grid>

              <Grid item md={12} sm={12} xs={12}>
                <TextValidator
                  className="w-100"
                  label="Private PayOut Value"
                  onChange={this.handleChangeNumberSeparated}
                  type="text"
                  name="payoutValue"
                  value={payoutValue}
                  validators={["required", 'matchRegexp:(^[0-9,.]*$)',]}
                  errorMessages={[t('Validation.this_field_is_required'), t('Validation.number_cannot_be_characters'),]}
                />
              </Grid>



            </Grid>
          </DialogContent>
          <DialogActions>
            <div className="flex flex-space-between flex-middle mt-36">
              <Button variant="contained" color="secondary" className="mr-36" onClick={() => this.props.handleClose()}>{t('general.cancel')}</Button>
              <Button variant="contained" color="primary" type="submit">
                {t('general.save')}
              </Button>
            </div>
          </DialogActions>
        </ValidatorForm>
      </Dialog >
    )
  }
}

export default SanPhamDialog;