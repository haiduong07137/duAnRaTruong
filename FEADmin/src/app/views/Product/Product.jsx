import React, { Component } from "react";
import {
  IconButton,
  Grid,
  Icon,
  TablePagination,
  Button,
  TextField
} from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import MaterialTable, {
  MTableToolbar
} from "material-table";
import ConstantList from "../../appConfig";
import { ValidatorForm } from "react-material-ui-form-validator";
import { searchByPage as categoriesSearchByPage } from "../Categories/CategoriesService";
import AsynchronousAutocomplete from "../utilities/AsynchronousAutocomplete";
import {
  searchByPage,
  getItemById,
  changeIsShowOffer,
  addProductToListAgency,
  searchByLocation,
  searchByConversionType,
} from "./ProductService";
import ProductDialog from "./ProductDialog";
import ListAgencyToAddProductDiaglog from "./ListAgencyToAddProductDiaglog";
import { Breadcrumb, ConfirmationDialog, ShowDialog } from "egret";
import { useTranslation} from "react-i18next";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { withRouter } from "react-router";
import Autocomplete from "@material-ui/lab/Autocomplete";
import localStorageService from "../../../app/services/localStorageService";
import {roleSystem} from "../../role";
import moment from "moment";
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 1,
  //etc you get the idea
});



function MaterialButton(props) {
  const { t, i18n } = useTranslation();
  const item = props.item;

  return (
    <div>
      <IconButton
        size="small"
        title={t("general.edit")}
        onClick={() => props.onSelect(item, 0)}
      >
        <Icon fontSize="small" color="primary">
          edit
        </Icon>
      </IconButton>
      {/* <IconButton
        size="small"
        title={t("Product.add_offer_for_agency")}
        onClick={() => props.onSelect(item, 3)}
      >
        <Icon fontSize="small" color="primary">
          add
        </Icon>
      </IconButton> */}
      {/* <IconButton
        title={t("general.delete")}
        onClick={() => props.onSelect(item, 1)}
      >
        <Icon color="error">delete</Icon>
      </IconButton> */}
      <IconButton
        size="small"
        title={item?.isShow ? t("general.hide") : t("general.show")}
        onClick={() => props.onSelect(item, 1)}
      >
        {item?.isShow ? (
          <Icon fontSize="small" color="error">
            visibility_off
          </Icon>
        ) : (
          <Icon fontSize="small" style={{ color: "#28a745" }}>
            visibility
          </Icon>
        )}
      </IconButton>
      <IconButton
        size="small"
        color="primary"
        component="span"
        title={t("general.show_description")}
        onClick={() => props.onSelect(item, 2)}
      >
        <Icon fontSize="small" color="primary">
          article
        </Icon>
      </IconButton>
      {/* <IconButton
        size="small"
        color="primary"
        component="span"
        title={t("general.clone")}
        onClick={() => props.onSelect(item, 4)}
      >
        <FileCopyIcon fontSize="small" color="primary" />
      </IconButton> */}
    </div>
  );
}

class Product extends Component {
  
  state = {
    rowsPerPage: 25,
    page: 0,
    categories: [],
    locations: [],
    conversionTypes: [],
    item: {},
    shouldOpenEditorDialog: false,
    shouldOpenConfirmationDialog: false,
    selectAllItem: false,
    selectedList: [],
    totalElements: 0,
    shouldOpenConfirmationDeleteAllDialog: false,
    shouldOpenShowDesDialog: false,
    shouldOpenListAgencyToAddProduct: false,
    keyword: "",
    location: [],
    conversionType: [],
    itemList: [],
  };
  numSelected = 0;
  rowCount = 0;

  setPage = (page) => {
    this.setState({ page }, function () {
      this.updatePageData();
    });
  };

  handleTextChange = (event) => {
    this.setState({ keyword: event.target.value }, function () {});
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.search();
    }
  };

  setRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value, page: 0 }, function () {
      this.updatePageData();
    });
  };

  handleChangePage = (event, newPage) => {
    this.setPage(newPage);
  };

  selectCategories = (categoriesSelected) => {
    this.setState({ categories: categoriesSelected }, function () {
      this.search();
    });
  };

  selectLocations = (locationsSelected) => {
    this.setState({ locations: locationsSelected }, function () {
      this.search();
    });
  };

  selectConversionTypes = (conversionTypeSelected) => {
    this.setState({ conversionTypes: conversionTypeSelected }, function () {
      this.search();
    });
  };

  search() {
    this.setState({ page: 0 }, function () {
      this.updatePageData();
    });
  }

  handleConfirmationResponse = () => {
    const idList = this.state.selectedItems.map((item) => item.id);
    addProductToListAgency(idList).then(() => {
      this.handleDialogClose();
      this.updatePageData();
    });
  };

  updatePageData = () => {
    var searchObject = {};

    let user = localStorageService.getItem("auth_user");  
    if(user.role === roleSystem.ROLE_PRODUCT){
      searchObject.userId = user.id;
    }
    
    searchObject.keyword = this.state.keyword;
    searchObject.categories = this.state.categories.map(
      (category) => category.name
    );
    searchObject.locations = this.state.locations;
    searchObject.conversionTypes = this.state.conversionTypes;
    searchObject.pageIndex = this.state.page + 1;
    searchObject.pageSize = this.state.rowsPerPage;
    searchByPage(searchObject).then(({ data }) => {
      this.setState({
        itemList: [...data.content],
        totalElements: data.totalElements,
      });
    });
    
  };

  componentDidMount() {
    if (
      this.props.history.location.state &&
      this.props.history.conversionType.state
    ) {
      this.updatePageData();
    }
    
  }

  componentWillMount() {
    
    this.getListLocation();
    this.getListConversionType();
    
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.location.pathname !== prevProps.location.pathname &&
      this.props.conversionType.pathname !== prevProps.conversionType.pathname
    ) {
      this.updatePageData();
    }
  }

  getListLocation() {
    searchByLocation().then(({ data }) => {
      this.setState(
        {
          location: [...data],
        },
        () => {}
      );
    });
  }

  getListConversionType() {
    searchByConversionType().then(({ data }) => {
      this.setState(
        {
          conversionType: [...data],
        },
        () => {}
      );
    });
  }

  // handleDownload = () => {
  //   var blob = new Blob(["Hello, world!"], { type: "text/plain;charset=utf-8" });
  //   saveAs(blob, "hello world.txt");
  // }

  handleDialogClose = () => {
    this.setState({
      shouldOpenEditorDialog: false,
      shouldOpenConfirmationDialog: false,
      shouldOpenConfirmationDeleteAllDialog: false,
      shouldOpenShowDesDialog: false,
      shouldOpenListAgencyToAddProduct: false,
      shouldOpenCloneProduct: false,
    });
    this.updatePageData();
  };

  handleOKEditClose = () => {
    this.setState({
      shouldOpenEditorDialog: false,
      shouldOpenConfirmationDialog: false,
      shouldOpenListAgencyToAddProduct: false,
      shouldOpenCloneProduct: false,
    });
    this.updatePageData();
  };

  handleDeleteItem = (id) => {
    this.setState({
      id,
      shouldOpenConfirmationDialog: true,
    });
  };

  handleEditItem = (item) => {
    getItemById(item.id).then((result) => {
      this.setState({
        item: result.data,
        shouldOpenEditorDialog: true,
      });
    });
  };

  // handleConfirmationResponse = () => {
  //   if (this.state.itemList.length === 1) {
  //     let count = this.state.page - 1;
  //     this.setState({
  //       page: count,
  //     });
  //   } else if (this.state.itemList.length === 1 && this.state.page === 1) {
  //     this.setState({
  //       page: 1,
  //     });
  //   }
  //   deleteItem(this.state.id).then(() => {
  //     this.updatePageData();
  //     this.handleDialogClose();
  //   });
  // };

  handleConfirmationShowResponse = () => {
    this.setState({ loading: true });
    if (this.state.itemList.length === 1) {
      let count = this.state.page - 1;
      this.setState({
        page: count,
      });
    } else if (this.state.itemList.length === 1 && this.state.page === 1) {
      this.setState({
        page: 1,
      });
    }

    changeIsShowOffer(this.state.id).then(() => {
      this.setState({ loading: false });
      this.updatePageData();
      this.handleDialogClose();
    });
  };



  handleHide = (isShow, id) => {
    this.setState({
      id,
      isShow,
      shouldOpenConfirmationDialog: true,
    });
  };

  componentDidMount() {
    this.updatePageData();
  }

  handleEditItem = (item) => {
    this.setState({
      item: item,
      shouldOpenEditorDialog: true,
    });
  };

  handleDelete = (id) => {
    this.setState({
      id,
      shouldOpenConfirmationDialog: true,
    });
  };

  render() {
    const { t, i18n } = this.props;
    let searchObject = { pageIndex: 0, pageSize: 1000000 };
    
    let {
      categories,
      // locations,
      conversionType,
      // conversionTypes,
      location,
      keyword,
      rowsPerPage,
      page,
      totalElements,
      itemList,
      item,
      loading,
      shouldOpenConfirmationDialog,
      shouldOpenEditorDialog,
      shouldOpenConfirmationDeleteAllDialog,
      shouldOpenShowDesDialog,
      shouldOpenListAgencyToAddProduct,
      shouldOpenCloneProduct,
    } = this.state;
    console.log(this.state);
    let TitlePage = t("Product.title");
    let columns = [
      {
        title: t("general.action"),
        field: "custom",
        align: "left",
        headerStyle: {
          paddingLeft: "3px",
        },
        cellStyle: {
          paddingLeft: "3px",
        },
        render: (rowData) => (
          <MaterialButton
            item={rowData}
            onSelect={(rowData, method) => {
              if (method === 0) {
                getItemById(rowData.id).then(({ data }) => {
                  this.setState({
                    item: data,
                    shouldOpenEditorDialog: true,
                  });
                });
              } else if (method === 1) {
                this.handleHide(rowData.isShow, rowData.id);
              } else if (method === 2) {
                this.setState({
                  detail: (
                    <>
                      <h4>{t("Product.createdBy")}</h4>
                      <p>{rowData.createdBy}</p>
                      <h4>{t("Agency.description")}</h4>
                      <p>{rowData.description}</p>
                      <h4>Website URL</h4>
                      <p>{rowData.websiteUrl}</p>
                    </>
                  ),
                  shouldOpenShowDesDialog: true,
                });
              } else if (method === 3) {
                this.setState({
                  productId: rowData.id,
                  shouldOpenListAgencyToAddProduct: true,
                });
              } else if (method === 4) {
                getItemById(rowData.id).then(({ data }) => {
                  let productInfo = data;

                  // Remove unused property
                  delete productInfo.createDate;
                  delete productInfo.createdBy;
                  delete productInfo.id;
                  delete productInfo.isCheck;
                  delete productInfo.isShow;
                  delete productInfo.productPayouts;
                  delete productInfo.landingPages;

                  this.setState({
                    item: productInfo,
                    shouldOpenCloneProduct: true,
                  });
                });
              } else {
                alert("Call Selected Here:" + rowData.id);
              }
            }}
          />
        ),
      },
      {
        title: t("Product.code"),
        field: "code",
        width: "15%",
      },
      {
        title: t("Product.name"),
        field: "name",
        align: "left",
        width: "15%",
      },
      {
        title: t("Product.createDate"),
        field: "createDate",
        width: "15%",
        align: "left",
        render: (rowData) =>
          rowData.createDate ? (
            <span>
              {moment(rowData.createDate)
                .subtract(1, "months")
                .format("YYYY-MM-DD HH:mm:ss")}
            </span>
          ) : (
            ""
          ),
      },
      {
        title: t("Product.mainImageUrl"),
        field: "mainImageUrl",
        align: "left",
        width: "15%",
        render: (rowData) => (
          <img
            src={rowData.mainImageUrl}
            alt="Product"
            width="100"
            height="50"
          ></img>
        ),
      },
      {
        title: t("Product.price"),
        field: "price",
        width: "15%",
        headerStyle: {
          textAlign: "center",
        },
        cellStyle: {
          textAlign: "center",
        },
        render: (rowData) => (
          <p className="MuiTableCell-alignCenter">
            {rowData.price.toLocaleString("en-US")}
            {rowData.currency === "THB"
              ? " Thb"
              : rowData.currency === "USD"
              ? "$"
              : rowData.currency === "IDR"
              ? " Rp"
              : ""}
            {rowData.currency === "VND" ? "₫" : ""}
          </p>
        ),
      },
      {
        title: t("Product.payout"),
        field: "currentPayout",
        width: "15%",
        headerStyle: {
          textAlign: "center",
        },
        cellStyle: {
          textAlign: "center",
        },
        render: (rowData) => (
          <p className="MuiTableCell-alignCenter">
            {rowData?.currentPayout?.toLocaleString("en-US")}
            {rowData?.currencyPayout === "THB"
              ? " Thb"
              : rowData.currencyPayout === "USD"
              ? "$"
              : rowData.currencyPayout === "IDR"
              ? " Rp"
              : ""}
            {rowData?.currencyPayout === "VND" ? "₫" : ""}
          </p>
        ),
      },
    
    ];

    return (
      <div className="m-sm-30">
        <Helmet>
          <title>Offer Pro | {TitlePage}</title>
        </Helmet>
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: t("Product.title") }]} />
        </div>

        <Grid container spacing={1} xs={12}>
          <Grid item md={8} sm={6} xs={12}>
            <Button
              className=" mr-16 align-bottom mb-10"
              variant="contained"
              color="primary"
              onClick={() => {
                this.handleEditItem({
                  startDate: new Date(),
                  endDate: new Date(),
                });
              }}
            >
              {t("general.add")}
            </Button>
            <TextField
              label={t("Product.search_products")}
              className=" mr-10 mb-10"
              style={{ width: 250 }}
              fontSize="small"
              type="text"
              name="keyword"
              value={keyword}
              onChange={this.handleTextChange}
              onKeyPress={this.handleKeyPress}
            />
            <Button
              className=" align-bottom mb-10"
              variant="contained"
              color="primary"
              onClick={() => this.search(keyword)}
              type="submit"
            >
              <Icon fontSize="default">search</Icon>
            </Button>
            </Grid>
            <Grid item md={4} sm={4} xs={4}>
              <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}
                align="right"
                >
                <AsynchronousAutocomplete
                  label={t("general.filter_category")}
                  searchFunction={categoriesSearchByPage}
                  className=" mr-10 mb-10"
                  multiple={true}
                  searchObject={searchObject}
                  defaultValue={categories}
                  displayLable={"name"}
                  value={categories}
                  onSelect={this.selectCategories}
                />
              </ValidatorForm>
          </Grid>

          
          {/* <Grid item md={4} sm={4} xs={4}>
            <Autocomplete
              multiple
              id="Locations"
              className=" mr-10 mb-10"
              options={location}
              getOptionLabel={(option) => option}
              onChange={(event, value) => {
                this.selectLocations(value);
              }}
              getOptionSelected={(option, value) => option === value}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label={t("general.filter_location")}
                />
              )}
            />
          </Grid>
          <Grid item md={4} sm={4} xs={4}>
            <Autocomplete
              multiple
              id="ConversionTypes"
              className=" mr-10 mb-10"
              options={conversionType}
              getOptionLabel={(option) => option}
              onChange={(event, value) => {
                this.selectConversionTypes(value);
              }}
              getOptionSelected={(option, value) => option === value}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label={t("general.filter_conversionType")}
                />
              )}
            />
          </Grid> */}

          <Grid item xs={12}>
            <div>
              {shouldOpenConfirmationDeleteAllDialog && (
                <ConfirmationDialog
                  open={shouldOpenConfirmationDeleteAllDialog}
                  onConfirmDialogClose={this.handleDialogClose}
                  onYesClick={this.handleDeleteAll}
                  text={t("general.deleteAllConfirm")}
                />
              )}
              {shouldOpenEditorDialog && (
                <ProductDialog
                  t={t}
                  i18n={i18n}
                  handleClose={this.handleDialogClose}
                  open={shouldOpenEditorDialog}
                  handleOKEditClose={this.handleOKEditClose}
                  item={item}
                />
              )}
              {shouldOpenCloneProduct && (
                <ProductDialog
                  isClone={true}
                  t={t}
                  i18n={i18n}
                  handleClose={this.handleDialogClose}
                  open={shouldOpenCloneProduct}
                  handleOKEditClose={this.handleOKEditClose}
                  item={item}
                />
              )}
              {/* {shouldOpenConfirmationDialog && (
                <ConfirmationDialog
                  title={t("general.confirm")}
                  open={shouldOpenConfirmationDialog}
                  onConfirmDialogClose={this.handleDialogClose}
                  onYesClick={this.handleConfirmationResponse}
                  text={t("general.deleteConfirm")}
                  agree={t("general.agree")}
                  cancel={t("general.cancel")}
                />
              )} */}

              {shouldOpenConfirmationDialog && (
                <ConfirmationDialog
                  title={t("general.confirm")}
                  open={shouldOpenConfirmationDialog}
                  disabled={loading}
                  onConfirmDialogClose={this.handleDialogClose}
                  onYesClick={this.handleConfirmationShowResponse}
                  text={
                    this.state.isShow
                      ? t("general.hide_product_confirm")
                      : t("general.show_product_confirm")
                  }
                  agree={t("general.agree")}
                  cancel={t("general.cancel")}
                />
              )}

              {shouldOpenShowDesDialog && (
                <ShowDialog
                  title={""}
                  open={shouldOpenShowDesDialog}
                  onConfirmDialogClose={this.handleDialogClose}
                  text={this.state.detail}
                  cancel={"Cancel"}
                />
                
              )}
              {shouldOpenListAgencyToAddProduct && (
                <ListAgencyToAddProductDiaglog
                  t={t}
                  i18n={i18n}
                  handleClose={this.handleDialogClose}
                  open={shouldOpenListAgencyToAddProduct}
                  handleOKEditClose={this.handleOKEditClose}
                  onChangePage={this.handleChangePage}
                  productId={this.state.productId}
                  handleConfirmationResponse={this.handleConfirmationResponse}
                />
              )}
            </div>
            <MaterialTable
              data={itemList}
              columns={columns}
              localization={{
                body: {
                  emptyDataSourceMessage: `${t(
                    "general.emptyDataMessageTable"
                  )}`,
                },
                toolbar: {
                  nRowsSelected: `${t("general.selects")}`,
                },
              }}
              options={{
                selection: false,
                actionsColumnIndex: -1,
                paging: false,
                search: false,
                rowStyle: (rowData) => ({
                  backgroundColor:
                    rowData.tableData.id % 2 == 1 ? "#EEE" : "#FFF",
                  backgroundColor:
                    rowData.isShow == false
                      ? "#b59edb"
                      : rowData.tableData.id % 2 === 0
                      ? "#ffffff"
                      : "#eeeeee",
                }),
                maxBodyHeight: "450px",
                minBodyHeight: "370px",
                headerStyle: {
                  color: "#ffffff",
                  backgroundColor: "#7467ef",

                  whiteSpace: "normal",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  overflowWrap: "break-word",
                },
                cellStyle: {
                  whiteSpace: "normal",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  overflowWrap: "break-word",
                },
                padding: "dense",
                toolbar: false,
              }}
              components={{
                Toolbar: (props) => <MTableToolbar {...props} />,
              }}
              onSelectionChange={(rows) => {
                this.data = rows;
              }}
            />
            <TablePagination
              align="left"
              className="px-16"
              labelRowsPerPage={t("general.rowperpage")}
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={totalElements}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                "aria-label": "Previous Page",
              }}
              nextIconButtonProps={{
                "aria-label": "Next Page",
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.setRowsPerPage}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Product;
