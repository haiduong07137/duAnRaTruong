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
  Checkbox,
  InputAdornment,
  createMuiTheme
} from "@material-ui/core";
import moment from "moment";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  checkCode,
  addNewData,
  updateData,
  getItemById,
  saveOfferPrivate,
  deleteItem,
  searchByPageChildOfOffer
} from "./PrivateOfferAgencyService";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Draggable from "react-draggable";
import Paper from "@material-ui/core/Paper";
import { useTranslation, withTranslation, Trans } from "react-i18next";
import { getItemById as getItemByIdProduct } from "../Product/ProductService";
import { toast } from "react-toastify";
import ChangeHistoryPrivateOfferAgencyDialog from './ChangeHistoryPrivateOfferAgencyDialog'
import "react-toastify/dist/ReactToastify.css";
import {
  DatePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import MaterialTable, {
  MTableToolbar,
  Chip,
  MTableBody,
  MTableHeader,
} from 'material-table'
import DateFnsUtils from "@date-io/date-fns";
import { LineWeight } from "@material-ui/icons";
import { de } from "date-fns/locale";
import { deleteById } from "../User/UserService";
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3
  //etc you get the idea
});
var today = new Date();
var currentdate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
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

function MaterialButton(props) {
  const { t, i18n } = useTranslation()
  const item = props.item
  return (
    <div>
      <IconButton size="small" onClick={() => props.onSelect(item, 0)}>
        <Icon fontSize="small" color="primary">edit</Icon>
      </IconButton>
      <IconButton size="small" onClick={() => props.onSelect(item, 1)}>
        <Icon fontSize="small" color="error">delete</Icon>
      </IconButton>
      <IconButton size="small"
        title={t("general.history")}
        onClick={() => props.onSelect(item, 2)}
      >
        <Icon fontSize="small" color="primary">history</Icon>
      </IconButton>
    </div>
  )
}

const defaultMaterialTheme = createMuiTheme({
  spacing: 2,
});

class EditPayoutPrivateOffer extends Component {
  state = {
    name: "",
    code: "",
    listCategory: [],
    category: [],
    description: "",
    totalElements: 0,
    rowsPerPage: 5,
    relatedOffer: [],
    page: 0,
    id: "",
    currencyPayout: "",
    publicPayout: 0,
    applyDate: new Date(),
    endDate: new Date(),
    shouldOpenEditorPayoutChildOfferForNetworkDialog: false,
    shouldOpenHistorySpecifixPublisher: false,
    netWork: false,
    loading: false,
    checkEdit: false,
    note: '',
    // websiteUrl: "template/"
  };



  setPage = (page) => {
    this.setState({ page }, function () {
      this.updatePageData();
    });
  };

  setRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value, page: 0 }, function () {
      this.updatePageData();
    });
  };

  handleChangePage = (event, newPage) => {
    this.setPage(newPage);
  };



  handleChange = (event, source) => {
    this.setState({ checkEdit: true })
    event.persist();
    if (source === "switch") {
      this.setState({ isActive: event.target.checked });
      return;
    }
    this.setState({
      [event.target.name]: event.target.value.toLocaleString("en-US"),
    });
  };


  handleChangeNumberSeparated = (event, source) => {
    this.setState({ checkEdit: true })
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

  handleOpenAddOfferForNetwork = () => {
  }
  handleClose = () => {
    this.setState({
      shouldOpenEditorPayoutChildOfferForNetworkDialog: false,
      shouldOpenHistorySpecifixPublisher: false
    },
    )
    this.updatePageData()
  }



  handleChangeApplyDate = (date) => {
    this.setState({
      checkEdit: true,
      applyDate: moment(date).hours(0).minutes(0).seconds(0),
      dupApplyDate: false,
      // dupEndDate: false
    });
  };



  handleChangeEndDate = (date) => {
    this.setState({
      checkEdit: true,
      endDate: moment(date).hours(23).minutes(59).seconds(59),
      // dupApplyDate: false,
      // dupEndDate: false
    });
  };

  handleFormSubmit = () => {
    this.setState({ loading: true })
    let check = true;
    if (this.state.applyDate == null) {
      this.setState({
        dupApplyDate: true
      })
      check = false;
    }

  
    // if (this.state.endDate == null) {
    //   this.setState({
    //     dupEndDate: true
    //   })
    //   check = false;
    // }
    if (this.state.applyDate > this.state.endDate && this.state.endDate != null && this.state.applyDate != null) {
      var { t, i18n } = this.props;
      toast.error(t("Validation.invalid_date_start_end"));
      check = false;
    }
    if (check) {
      this.setState({
        dupApplyDate: false,
        // dupEndDate: false
      })
      let { id } = this.state;

      if (id) {
        this.setState({ payoutValue: this.removeSeparatedNumber(this.state.payoutValue) })
        if (this.state.checkEdit === false) {
          var { t, i18n } = this.props;
          toast.success(t("general.success"));
          this.props.handleOKEditClose();
          return;
        } 
        saveOfferPrivate({
          ...this.state,
        }).then(() => {
          this.setState({ loading: false })
          var { t, i18n } = this.props;
          toast.success(t("general.success"));
          this.props.handleOKEditClose();
        });
      }
    } else {
      this.setState({ loading: false })
    }
  };

  updatePageData() {
    if (this.state.netWork) {
      var searchObject = {};
      searchObject.keyword = this.state.keyword;
      searchObject.locations = this.state.locations;
      searchObject.pageIndex = this.state.page + 1;
      searchObject.pageSize = this.state.rowsPerPage;
      searchObject.agencyId = this.props.agencyId;
      searchByPageChildOfOffer(searchObject, this.props.offerID).then(({ data }) => {
        this.setState({
          itemList: [...data.content],
          totalElements: data.totalElements,
        });
      });
    }


  }

  search() {
    if (this.state.netWork) {
      this.setState({ page: 0 }, function () {
        var searchObject = {};
        searchObject.keyword = this.state.keyword;
        searchObject.locations = this.state.locations;
        searchObject.pageIndex = this.state.page + 1;
        searchObject.pageSize = this.state.rowsPerPage;
        searchObject.agencyId = this.props.agencyId;
        searchByPageChildOfOffer(searchObject, this.props.offerID).then(({ data }) => {
          this.setState({
            itemList: [...data.content],
            totalElements: data.totalElements,
          });
        });
      });
    }
  }

  componentWillMount() {
    getItemById(this.props.offerID).then(({ data }) => {
      for (var i = 0; i < data.product.productPayouts.length; i++) {
        if (data.product.productPayouts[i].isCurrent === true) {
          this.setState({
            ...data,
            publicPayout:
              data.product.productPayouts[i].payoutValue
          });
          break;
        }
      }
      this.setState({
        publicPayout: this.addSeparatedNumber(this.state.publicPayout + ''),
        payoutValue: this.addSeparatedNumber(this.state.payoutValue + ''),
        netWork: data.agency.isNetwork
      })
      this.updatePageData()
    });



  }

  componentDidMount() {
    
  }

  render() {
    const currencies = [
      {
        title: 'Vietnam Dong',
        value: 'VND',
        label: '₫',
      },
      {
        title: 'U.S Dollar',
        value: 'USD',
        label: '$',
      },
      {
        title: 'Indonesian Rupiah',
        value: 'IDR',
        label: 'Rp',
      },
      {
        title: 'Thai Baht',
        value: 'THB',
        label: 'Thb',
      },
    ]
    let { payoutValue, publicPayout, product, applyDate, endDate, currencyPayout,
      currency, page, relatedOffer, shouldOpenHistorySpecifixPublisher, totalElements, itemList, netWork, shouldOpenEditorPayoutChildOfferForNetworkDialog,
      rowsPerPage, loading, item, note, websiteUrl } = this.state;
    let { open, handleClose, handleOKEditClose, t, i18n } = this.props;

    let columns = [
      {
        title: t("Agency.pub_name"),
        field: "pubName",
        width: 200,
        align: "left",
      },
      { title: t("Product.name"), field: "product.name", width: 130 },
      {
        title: t("Product.createDate"),
        field: "modifyDate",
        width: 160,
        align: "left",
        render: (rowData) =>
          rowData.modifyDate ? (
            <span>
              {moment(rowData.modifyDate)
                .subtract(1, "months")
                .format("DD-MM-YYYY HH:mm:ss")}
            </span>
          ) : (
              ""
            ),
      },
      {
        title: t("Product.mainImageUrl"),
        field: "product.mainImageUrl",
        width: 200,
        render: (rowData) => {
          return (
            <img
              src={rowData.product?.mainImageUrl}
              alt="Product"
              width="100"
              height="50"
            ></img>
          );
        },
      },
      {
        title: t("Product.price"),
        field: "product.price",
        width: 110,
        headerStyle: {
          textAlign: "right",
        },
        type: "numeric",
        render: (rowData) => (
          <p className="MuiTableCell-alignRight">
            {rowData.product?.price.toLocaleString("en-US")}
            {rowData.product?.currency === "THB"
              ? " Thb"
              : rowData.product?.currency === "VND"
                ? "₫"
                : rowData.product?.currency === "USD"
                  ? "$"
                  : " Rp"}
          </p>
        ),
      },
      {
        title: t('Product.conversionType'),
        field: "rowdata.product?.conversionType",
        align: "left",
        width: "120",
        render: (rowData) => (
          <p className="MuiTableCell-alignLeft">
            {rowData.product?.conversionType}
          </p>
        ),
      },
      {
        title: t('Product.location'),
        field: "createDate",
        align: "left",
        width: "140",
        render: (rowData) => (
          <p className="MuiTableCell-alignleft">
            {rowData.product?.location}
          </p>
        ),

      },

      {
        title: t("Product.payout"),
        field: "payoutValue",
        width: 200,
        headerStyle: {
          textAlign: "right",
        },
        type: "numeric",
        render: (rowData) => (
          <p className="MuiTableCell-alignRight">
            {rowData.payoutValue.toLocaleString("en-US")}
            {rowData.currency === "THB"
              ? " Thb"
              : rowData.currency === "VND"
                ? "₫"
                : rowData.currency === "USD"
                  ? "$"
                  : " Rp"}
          </p>
        ),
      },
      {
        title: t('general.action'),
        field: 'custom',
        align: 'left',
        width: 250,
        render: (rowData) => (
          <MaterialButton
            item={rowData}
            onSelect={(rowData, method) => {
              if (method === 0) {
                this.setState({ offerId: rowData.id, shouldOpenEditorPayoutChildOfferForNetworkDialog: true })
              } else if (method === 1) {
                deleteItem(rowData.id).then(() => {
                  var { t, i18n } = this.props;
                  toast.success(t("general.success"));
                  this.updatePageData()
                });
              } else if (method === 2) {
                this.setState({
                  item: rowData.id,
                  shouldOpenHistorySpecifixPublisher: true,
                });
              }
            }}
          />
        ),
      },
    ]

    let dupApplyDate, dupEndDate
    if (this.state.dupApplyDate === true) {
      dupApplyDate = (
        <span className="w-100 mb-16 mr-16 ml-16" style={{ color: 'red' }}>
          {' '}
          {t('Offer.required')}{' '}
        </span>
      )
    } else {
      dupApplyDate = ''
    }
    // if (this.state.dupEndDate === true) {
    //   dupEndDate = (
    //     <span className="w-100 mb-16 mr-16 ml-16" style={{ color: 'red' }}>
    //       {' '}
    //       {t('Offer.required')}{' '}
    //     </span>
    //   )
    // } else {
    //   dupEndDate = ''
    // }
    return (
      <Dialog
        open={open}
        PaperComponent={PaperComponent}
        maxWidth="lg"
        fullWidth={false}
      >
        {/* {alert(`${this.props.agencyId} ${this.props.offerID}`)} */}


        {shouldOpenHistorySpecifixPublisher && (
          <ChangeHistoryPrivateOfferAgencyDialog
            t={t}
            i18n={i18n}
            open={shouldOpenHistorySpecifixPublisher}
            handleClose={this.handleClose}
            item={item}
            cancel={"OK"}
          />
        )}

        <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
          <div
            style={{ cursor: "move" }}
            id="draggable-dialog-title"
            className="flex flex-space-between flex-middle pl-16 pr-8 py-8 bg-primary"
          >
            <h4 className="m-0 text-white">
              {this.state.id ? t("Offer.update") : t("Offer.add")}
            </h4>
            <IconButton onClick={this.props.handleClose}>
              <Icon className="text-white">clear</Icon>
            </IconButton>
          </div>
          <DialogContent>
            <Grid className="mb-10" container spacing={3}>
            <Grid item md={6} sm={6} xs={6}>
                <Autocomplete
                  options={currencies}
                  disabled
                  defaultValue={currencies[0]}
                  style={{ width: "100%" }}
                  onChange={(event, value) => {
                    this.setState({
                      currency: value !== null ? value.value : "",
                    });
                  }}
                  getOptionLabel={(option) =>
                    `${option.title} (${option.value}) - ${option.label}`
                  }
                  getOptionSelected={(option, value) =>
                    option.value === value.value
                  }
                  renderInput={(params) => (
                    <TextValidator
                      {...params}
                      value={currency}
                      label={t("Product.currency")}
                      validators={["required"]}
                      errorMessages={[t("Validation.this_field_is_required")]}
                    />
                  )}
                />
              </Grid>
              <Grid item md={6} sm={6} xs={6}>
                <TextValidator
                  className="w-100"
                  disabled={true}
                  label="Website Url" 
                  type="text"
                  name="websiteUrl" 
                  value={websiteUrl}  
                  InputLabelProps={{ shrink: true }}
                  onChange={this.handleChange}
                   validators={['required']}
                  errorMessages={['this field is required']}
                /> 
              </Grid>
              <Grid item md={6} sm={6} xs={6}>
                <TextValidator
                  className="w-100"
                  label={t('Offer.my_payout_value')}
                  onChange={this.handleChangeNumberSeparated}
                  type="text"
                  name="payoutValue"
                  InputLabelProps={{ shrink: true }}
                  value={payoutValue}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {this.state.currency === "THB"
                          ? "THB"
                          : this.state.currency === "VND"
                            ? "VND"
                            : this.state.currency === "USD"
                              ? "USD"
                              : "IDR"}
                      </InputAdornment>
                    ),
                  }}
                  validators={["required", 'matchRegexp:(^[0-9,.]*$)',]}
                  errorMessages={[t('Validation.this_field_is_required'), t('Validation.number_cannot_be_characters')]}
                />
              </Grid>
              <Grid item md={6} sm={6} xs={6}>
                <Autocomplete
                  options={currencies}
                  disabled
                  defaultValue={currencies[0]}
                  style={{ width: "100%" }}
                  onChange={(event, value) => {
                    this.setState({
                      currency: value !== null ? value.value : "",
                    });
                  }}
                  getOptionLabel={(option) =>
                    `${option.title} (${option.value}) - ${option.label}`
                    
                  }
                  getOptionSelected={(option, value) =>
                    option.value === value.value
                  }
                  renderInput={(params) => (
                    <TextValidator
                      {...params}
                      value={currency}
                      label={t("Product.currencyPayout")}
                      validators={["required"]}
                      errorMessages={[t("Validation.this_field_is_required")]}
                    />
                  )}
                />
              </Grid>
              {/* <Grid item md={3} sm={3} xs={3} style={{ marginTop: '15px', fontWeight: 'lighter' }}>
                <span>{t('Offer.appyDate')}</span>
              </Grid> */}

              <Grid item md={6} sm={6} xs={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className="w-100"
                    defaultValue={applyDate}
                    label={t('Offer.from')}
                    value={applyDate}
                    InputAdornmentProps={{ position: "start" }}
                    onChange={this.handleChangeApplyDate}
                    format="yyyy/MM/dd"

                  />
                  {dupApplyDate}
                </MuiPickersUtilsProvider>
              </Grid>

              <Grid item md={6} sm={6} xs={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className="w-100"
                    defaultValue={endDate}
                    value={endDate}
                    InputAdornmentProps={{ position: "start" }}
                    onChange={this.handleChangeEndDate}
                    label={t('Offer.to')}
                    format="yyyy/MM/dd"
                    // helperText={''}
                    invalidDateMessage=""
                  />
                  {/* {dupEndDate} */}
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextValidator
                variant="outlined"
                className="w-100"
                label={
                  <span>
                    {" "}
                    {`${t("Offer.note")} (${t(
                      "general.maximum_255_characters"
                    )})`}
                  </span>
                }
                placeholder="Describe somthing about offer ?"
                multiline
                rows={6}
                rowsMax={6}
                onChange={this.handleChange}
                type="text"
                name="note"
                value={note}
              />
            </Grid>
            <Grid hidden={!this.state.netWork}>
              <Grid container spacing={2}>
                <Grid className="mt-36" item md={12} sm={12} xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleOpenAddOfferForNetwork}
                  >
                    {t('Offer.set_payout_specific_pub')}
                  </Button>
                </Grid>
              </Grid>
            </Grid>

          </DialogContent>
          <DialogActions>
            <div className="flex flex-space-between flex-middle mt-36">
              <Button
                variant="contained"
                color="secondary"
                className="mr-36"
                onClick={() => this.props.handleClose()}
              >
                {t("general.cancel")}
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"

              // disabled={loading}
              >
                {t("general.save")}
              </Button>

            </div>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    );
  }
}

export default EditPayoutPrivateOffer;
