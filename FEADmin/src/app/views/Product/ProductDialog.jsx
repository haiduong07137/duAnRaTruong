import React, { Component } from "react";
import {
  IconButton,
  Dialog,
  Button,
  Icon,
  Grid,
  DialogActions,
  Checkbox,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import UploadImage from "../forms/UploadImage";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import {
  addNewData,
  updateData,
  getAllCategory,
  codeWasUsed,
  uploadImage,
} from "./ProductService";
import LandingPageEditorDialog from "./LandingPage/LandingPageEditorDialog";
import ListAgencyToAddProductDiaglog from "./ListAgencyToAddProductDiaglog";
import MenuItem from "@material-ui/core/MenuItem";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DialogContent from "@material-ui/core/DialogContent";
import Draggable from "react-draggable";
import Paper from "@material-ui/core/Paper";
import { ConfirmationDialog } from "egret";
import MaterialTable, { MTableToolbar } from "material-table";
import Loading from "../../../egret/components/EgretLoadable/Loading";
import shortId from "shortid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import localStorageService from "../../../app/services/localStorageService";
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
function MaterialButton(props) {
  // const { t, i18n } = useTranslation();
  const item = props.item;
  return (
    <div>
      <IconButton onClick={() => props.onSelect(item, 0)}>
        <Icon color="primary">edit</Icon>
      </IconButton>
      <IconButton onClick={() => props.onSelect(item, 1)}>
        <Icon color="error">delete</Icon>
      </IconButton>
    </div>
  );
}
class ProductDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowFalse: <CloseIcon style={{ color: "red" }} />,
      isShowTrue: <DoneIcon style={{ color: "green" }} />,
      name: "",
      code: "",
      categoryList: [],
      categories: [],
      websiteUrl: "",
      description: "",
      totalElements: 0,
      rowsPerPage: 25,
      page: 0,
      landingPages: null,
      shouldShowLandingPageDialog: false,
      shouldOpenListAgencyToAddProduct: false,
      location: "", 
      currencyPayout: "",
      conversionType: "",
      mainImageUrl: "",
      imagePreviewUrl: "",
      price: "",
      currentPayout: "",
      loading: false,
      currency:"VND",
    };

    this.landingPageEditorRef = React.createRef();
  }

  handleChange = (event, source) => { 
    event.persist();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleChangeNumberSeparated = (event, source) => {
    event.persist();
    var number = event.target.value;
    number = this.removeSeparatedNumber(number);
    var numberSeparated = this.addSeparatedNumber(number);
    this.setState({
      [event.target.name]: numberSeparated,
    });
  };

  addSeparatedNumber(number) {
    var x = number.split(".");
    var x1 = x[0];
    var x2 = x.length > 1 ? "." + x[1] : "";
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, "$1" + "," + "$2");
    }
    return x1 + x2;
  }

  removeSeparatedNumber(number) {
    for (var i = 0; i < number.length; i++) {
      if (number[i] == ",") {
        number = number.substring(0, i) + number.substring(i + 1);
      }
    }
    return number;
  }

  handleDialogClose = () => {
    this.setState({
      shouldOpenEditorDialog: false,
      shouldOpenDialog: false,
      shouldOpenConfirmationDialog: false,
      shouldOpenConfirmationDeleteAllDialog: false,
      shouldOpenShowDesDialog: false,
      shouldOpenListAgencyToAddProduct: false,
    });
  };
  handleChangePage = (event, newPage) => {
    this.setPage(newPage);
  };

  handleFormSubmit = () => {
    this.setState({ loading: true });
   
      let { id, code } = this.state;
      let product = { id, code };
      //Nếu trả về false là code chưa sử dụng có thể dùng
      codeWasUsed(product).then((result) => {
        if (result && result.data != null && result.data === false) {
          this.setState({
            price: this.removeSeparatedNumber(this.state.price),
          });
          this.setState({
            currentPayout: this.removeSeparatedNumber(this.state.currentPayout),
          });

          if (!id) {
            console.log(this.state);
            addNewData({
              ...this.state
              
            })
              .then((res) => {
                if (this.state.file !== null) {
                  this.setState(
                    {
                      loading: false,
                      shouldOpenDialog: true,
                      productId: res.data.id,
                    },
                    () => {
                      console.log(this.state.productId);
                    }
                  );
                  uploadImage(this.state.file, res.data.id);
                }
              })
              .then((data) => {
                var { t, i18n } = this.props;
                toast.success(t("general.success"));
                // this.props.handleOKEditClose()
              });
          } else {
            updateData({
              ...this.state,
            })
              .then((res) => {
                if (this.state.file !== null) {
                  uploadImage(this.state.file, res.data.id);
                }
              })
              .then(() => {
                var { t, i18n } = this.props;
                toast.success(t("general.success"));
                this.setState({ loading: false });
                this.props.handleOKEditClose();
              });
          }
        } else {
          this.setState({ loading: false });

          var { t, i18n } = this.props;
          toast.error(t("Product.duplicateCode"));
        }
      });
    
  };
  handleFileSelect = (file) => {
    this.setState({
      file: file,
    });
  };

  selectCategory = (categorySelected) => {
    this.setState({ categories: categorySelected }, function () {});
  };

  componentWillMount() { 
    
    this.setState(
      {
        ...this.props.item,
      },
      () => {
        this.setState({
          price: this.addSeparatedNumber(this.state.price + ""),
          currentPayout: this.addSeparatedNumber(this.state.currentPayout + ""),
        });
      }
    );
    ValidatorForm.removeValidationRule('isWebsite');
  }

  componentDidMount() {
    let user = localStorageService.getItem("auth_user"); 
    this.setState({userId:user.id}) 
    var searchObject = {};
    searchObject.keyword = this.state.keyword;
    searchObject.pageIndex = this.state.page + 1;
    searchObject.pageSize = this.state.rowsPerPage;
    getAllCategory(searchObject).then(({ data }) => {
      this.setState({
        categoryList: [...data.content],
        totalElements: data.totalElements,
      });
    });
    ValidatorForm.addValidationRule('isWebsite', (value) => {
      var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i');
      return !!pattern.test(value);
    })
  }

  /* Handle working with landing pages */
  handleCloseLandingPageDialog = () => {
    this.landingPageEditorRef.current.resetState();
    this.setState({
      shouldShowLandingPageDialog: false,
    });
  };

  handleImageSelect = (file) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  handleOKEditClose = () => {
    this.setState(
      {
        shouldOpenEditorDialog: false,
        shouldOpenConfirmationDialog: false,
        shouldOpenListAgencyToAddProduct: false,
      },
      () => {
        this.props.handleClose();
      }
    );
  };

  handleImageRemove = () => {
    this.setState({
      file: null,
      imagePreviewUrl: "",
    });
  };

  handleOpenLandingPageDialog = () => {
    this.landingPageEditorRef.current.resetState();
    this.setState({ shouldShowLandingPageDialog: true });
  };
  handleOpenUpdateLandingPageDialog = () => {
    this.setState({ shouldShowLandingPageDialog: true });
  };
  onChangeHandler = (event) => {
    console.log(event.target.files[0]);
  };
  handleAddOrEditLandingPage = (item) => {
    const landingPages = this.state.landingPages;

    let found = false;
    for (let landingPage of landingPages) {
      if (landingPage.tempId === item.tempId) {
        landingPage.url = item.url;
        landingPage.type = item.type;
        landingPage.isShow = item.isShow;
        found = true;
        break;
      }
    }

    if (!found) {
      landingPages.push(item);
    }

    this.landingPageEditorRef.current.resetState();

    this.setState({
      landingPages,
      shouldShowLandingPageDialog: false,
    });
  };

  handleUpdateLandingPage = (item) => {
    this.landingPageEditorRef.current.editLandingPage(item);
    this.handleOpenUpdateLandingPageDialog();
  };

  handleDeleteLandingPage = (item) => {
    const landingPages = this.state.landingPages.filter(
      (landingPage) => landingPage.tempId !== item.tempId
    );

    this.setState({
      landingPages,
    });
  };

  render() {
    let {
      name,
      code,
      categoryList,
      mainImageUrl,
      price,
      description,
      landingPages,
      page,
      rowsPerPage,
      currentPayout,
      categories,
      currency,
      currencyPayout,
      location,
      conversionType,
      imagePreviewUrl,
      shouldOpenListAgencyToAddProduct,
      loading,
      orgId,
      websiteUrl
    } = this.state;
    let { open, t, i18n } = this.props;

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    let columns = [
      {
        title: t("general.stt"),
        field: "code",
        width: "150",
        align: "center",
        render: (rowData) => page * rowsPerPage + (rowData.tableData.id + 1),
      },
      {
        title: t("LandingPage.url"),
        field: "url",
        align: "left",
        width: "250",
      },
      {
        title: t("LandingPage.type"),
        field: "type",
        align: "left",
        width: "150",
      },

      // editDataAfterGetData = (item) => {
      //   let isShowFalse = <CloseIcon style={{ color: "red" }} />;
      //   let isShowTrue = <DoneIcon style={{ color: "green" }} />;
      //   for (let i = 0; i < item?.length; i++) {
      //     if (item[i].isShow == true) {
      //       this.setState((item[i].isShow = isShowTrue));
      //     } else {
      //       this.setState((item[i].isShow = isShowFalse));
      //     }
      //   }
      // };
      {
        title: t("LandingPage.isShow"),
        field: "isShow",
        align: "left",
        width: "150",
        render: (rowData) => (
          <p>
            {rowData.isShow ? this.state.isShowTrue : this.state.isShowFalse}
          </p>
        ),
      },
      {
        title: t("general.action"),
        field: "custom",
        align: "left",
        width: "250",
        render: (rowData) => (
          <MaterialButton
            item={rowData}
            onSelect={(rowData, method) => {
              if (method === 0) {
                this.handleUpdateLandingPage(rowData);
              } else if (method === 1) {
                this.handleDeleteLandingPage(rowData);
              }
            }}
          />
        ),
      },
    ];

    const currencies = [
      {
        title: "Vietnam Dong",
        value: "VND",
        label: "₫",
      },
      {
        title: "U.S Dollar",
        value: "USD",
        label: "$",
      },
      {
        title: "Indonesian Rupiah",
        value: "IDR",
        label: "Rp",
      },
      {
        title: "Thai Baht",
        value: "THB",
        label: "Thb",
      },
    ];

    const locations = ["Vietnam", "USA", "Thailand", "Indonesia"];
    const conversionTypes = ["CPA", "CPO", "CPL"];

    return (
      <Dialog
        open={open}
        PaperComponent={PaperComponent}
        maxWidth="md"
        fullWidth={true}
      >
        <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
          <div
            style={{ cursor: "move" }}
            id="draggable-dialog-title"
            className="flex flex-space-between flex-middle pl-16 pr-8 py-8 bg-primary"
          >
            <h4 className="m-0 text-white">
              {this.props.isClone
                ? t("Product.clone")
                : this.state.id
                ? t("Product.update")
                : t("Product.add")}
            </h4>
            <IconButton onClick={this.props.handleClose}>
              <Icon className="text-white">clear</Icon>
            </IconButton>
          </div>
          <DialogContent>
            <Grid className="mb-10" container spacing={3}>
              <Grid item md={12} sm={12} xs={12}>
                <UploadImage
                  className="w-30"
                  handleImageSelect={this.handleImageSelect}
                  handleImageRemove={this.handleImageRemove}
                  mainImageUrl={mainImageUrl}
                  imagePreviewUrl={imagePreviewUrl}
                  t={t}
                />
              </Grid>
            </Grid>
            <Grid className="mb-10" container spacing={3}>
              <Grid item md={6} sm={6} xs={6}>
                <TextValidator
                  className="w-100"
                  label={t("Product.code")}
                  onChange={this.handleChange}
                  type="text"
                  name="code"
                  value={code}
                  validators={["required"]}
                  errorMessages={[t("Validation.this_field_is_required")]}
                />
              </Grid>
              <Grid item md={6} sm={6} xs={6}>
                <TextValidator
                  className="w-100"
                  label={t("Product.name")}
                  onChange={this.handleChange}
                  type="text"
                  name="name"
                  value={name}
                  validators={["required"]}
                  errorMessages={[t("Validation.this_field_is_required")]}
                />
              </Grid>

              {/* <Grid item md={6} sm={6} xs={6}>
                <TextValidator
                  className="w-100"
                  label={t('Product.mainImageUrl')}
                  onChange={this.handleChange}
                  type="text"
                  name="mainImageUrl"
                  value={mainImageUrl}
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </Grid> */}
              <Grid item md={6} sm={6} xs={6}>
                <TextValidator
                  className="w-100"
                  label={t("Product.price")}
                  onChange={this.handleChangeNumberSeparated}
                  type="text"
                  name="price"
                  value={price.toLocaleString("en-US")}
                  validators={[
                    "required",
                    "matchRegexp:(^[0-9,.]*$)",
                    "minNumber:1",
                  ]}
                  errorMessages={[
                    t("Validation.this_field_is_required"),
                    t("Validation.number_cannot_be_characters"),
                    t("Validation.cannot_be_negative"),
                  ]}
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
                  label={t("Product.payout")}
                  onChange={this.handleChangeNumberSeparated}
                  type="text"
                  name="currentPayout"
                  value={currentPayout}
                  validators={[
                    "required",
                    "minNumber:1",
                    "matchRegexp:(^[0-9,.]*$)",
                  ]}
                  errorMessages={[
                    t("Validation.this_field_is_required"),
                    t("Validation.cannot_be_negative"),
                    t("Validation.number_cannot_be_characters"),
                  ]}
                />
              </Grid>
              {/* <Grid item md={6} sm={6} xs={6}>
                <Autocomplete
                  options={currencies}
                  defaultValue={() => {
                    const defaultCurrency = currencies.filter(
                      (item) => item.value === currencyPayout
                    );
                    return defaultCurrency.length > 0
                      ? defaultCurrency[0]
                      : null;
                  }}
                  style={{ width: "100%" }}
                  onChange={(event, value) => {
                    this.setState({
                      currencyPayout: value !== null ? value.value : "",
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
                      value={currencyPayout}
                      label={t("Product.currencyPayout")}
                      validators={["required"]}
                      errorMessages={[t("Validation.this_field_is_required")]}
                    />
                  )}
                />
              </Grid>
        */}
       
              {/* <Grid item md={6} sm={6} xs={6}>
                <TextValidator
                  className="w-100"
                  label={t("Product.conversionType")}
                  onChange={this.handleChange}
                  type="text"
                  name="conversionType"
                  value={conversionType}
                  validators={["required"]}
                  errorMessages={[t("Validation.this_field_is_required")]}
                  select
                >
                  {conversionTypes.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextValidator>
              </Grid> */}
              {/* <Grid item md={6} sm={6} xs={6}>
                <Autocomplete
                  options={locations}
                  defaultValue={location}
                  style={{ width: "100%" }}
                  onChange={(event, value) => {
                    switch (value) {
                      case "Vietnam":
                        this.setState({
                          orgId: 4,
                        });
                        break;
                      case "USA":
                        this.setState({
                          orgId: 69,
                        });
                        break;
                      case "Thailand":
                        this.setState({
                          orgId: 10,
                        });
                        break;
                      case "Indonesia":
                        this.setState({
                          orgId: 9,
                        });
                        break;
                      default:
                        break;
                    }
                    this.setState({ location: value });
                  }}
                  renderInput={(params) => (
                    <TextValidator
                      {...params}
                      value={location}
                      label={t("general.geography")}
                      fullWidth
                      validators={["required"]}
                      errorMessages={[t("Validation.this_field_is_required")]}
                    />
                  )}
                />
              </Grid> */}
              <Grid item md={6} sm={6} xs={6}>
                {categoryList && (
                  <Autocomplete
                    multiple
                    options={categoryList}
                    defaultValue={categories}
                    disableCloseOnSelect
                    getOptionSelected={(option, value) =>
                      option.id === value.id
                    }
                    getOptionLabel={(option) => option.name}
                    onChange={(event, value) => {
                      this.selectCategory(value);
                    }}
                    renderOption={(option, { selected }) => (
                      <React.Fragment>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.name}
                      </React.Fragment>
                    )}
                    style={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextValidator
                        {...params}
                        value={categories}
                        label={t("Category.title")}
                        fullWidth
                        validators={["required"]}
                        errorMessages={[t("Validation.this_field_is_required")]}
                      />
                    )}
                  />
                )}
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <TextValidator
                  className="w-100"
                  label="Website"
                  onChange={this.handleChange}
                  type="text"
                  name="websiteUrl"
                  value={websiteUrl}
                  validators={[
                    "matchRegexp:[(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,256}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)",
                  ]}
                  errorMessages={[
                    "Đây không phải là url hợp lệ"
                  ]}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <TextValidator
                  className="w-100 h-5"
                  label={t("Product.description")}
                  onChange={this.handleChange}
                  type="text"
                  name="description"
                  value={description}
                  variant="outlined"
                  multiline
                  rows={6}
                  rowsMax={6}
                  validators={["required"]}
                  errorMessages={[t("Validation.this_field_is_required")]}
                />
              </Grid>
              
            </Grid>
            {/* <Grid container spacing={2}>
              <Grid className="mt-36" item md={12} sm={12} xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleOpenLandingPageDialog}
                >
                  {t("LandingPage.add")}
                </Button>
              </Grid>
            </Grid> */}

            <Grid container spacing={2}>
              <Grid item xs={12}>
                {/* <MaterialTable
                  data={landingPages??[]}
                  columns={columns}
                  options={{
                    headerStyle: {
                      color: "#ffffff",
                      backgroundColor: "#7467ef",
                    },
                    rowStyle: (rowData) => ({
                      backgroundColor:
                        rowData.tableData.id % 2 === 0 ? "#ffffff" : "#eeeeee",
                    }),
                    toolbar: false,
                    selection: false,
                    actionsColumnIndex: -1,
                    paging: false,
                    search: false,
                  }}
                  components={{
                    Toolbar: (props) => (
                      <div style={{ witdth: "100%" }}>
                        <MTableToolbar {...props} />
                      </div>
                    ),
                  }}
                  onSelectionChange={(rows) => {
                    this.data = rows;
                  }}
                /> */}


                
                {/* <TablePagination
                  align="left"
                  className="px-16"
                  rowsPerPageOptions={[1, 2, 3, 5, 10, 25]}
                  component="div"
                  count={totalElements}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{
                    "aria-label": "Previous Page"
                  }}
                  nextIconButtonProps={{
                    "aria-label": "Next Page"
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.setRowsPerPage}
                /> */}
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
                disabled={this.state.loading}
              >
                {t("general.cancel")}
              </Button>
              {this.state.loading ? (
                <Loading />
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                >
                  {t("general.save")}
                </Button>
              )}
            </div>
          </DialogActions>
        </ValidatorForm>
        <LandingPageEditorDialog
          open={this.state.shouldShowLandingPageDialog}
          handleClose={this.handleCloseLandingPageDialog}
          handleSubmit={this.handleAddOrEditLandingPage}
          t={t}
          i18n={i18n}
          ref={this.landingPageEditorRef}
          handleChangeLandingPage={this.handleChangeLandingPage}
        />

        {this.state.shouldOpenDialog && (
          <ConfirmationDialog
            open={this.state.shouldOpenDialog}
            onConfirmDialogClose={this.props.handleClose}
            onYesClick={this.handleOKEditClose()}
            text={t("Product.add_new_offer_question")}
            agree={t("general.agree")}
            cancel={t("general.cancel")}
          />
        )}

        {shouldOpenListAgencyToAddProduct && (
          <ListAgencyToAddProductDiaglog
            t={t}
            i18n={i18n}
            handleClose={this.props.handleClose}
            open={shouldOpenListAgencyToAddProduct}
            handleOKEditClose={this.handleOKEditClose}
            onChangePage={this.props.handleChangePage}
            productId={this.state.productId}
            handleConfirmationResponse={this.handleConfirmationResponse}
          />
        )}
      </Dialog>
    );
  }
}

export default ProductDialog;
