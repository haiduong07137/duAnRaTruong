import React, { Component } from "react";
import {
  IconButton, Grid, Icon, TablePagination, Button, TextField,
} from "@material-ui/core";
import MaterialTable, { MTableToolbar, Chip, MTableBody, MTableHeader, } from "material-table";
import { deleteItem, getItemById, gotOffer, setPrivateOffer, searchByPage, changeIsShowOffer, approveToShowOffer, } from "./OfferAgencyService";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import AsynchronousAutocomplete from "../utilities/AsynchronousAutocomplete";
import {
  searchByLocation, searchByConversionType,
} from "../Product/ProductService";
import { searchByPage as categoriesSearchByPage } from "../Categories/CategoriesService";
import PayoutDialog from "./EditPayoutOfferDialog";
import ListOfferDiaglog from "./ListOfferDiaglog";
import { Breadcrumb, ConfirmationDialog, ShowDialog } from "egret";
import { useTranslation, withTranslation, Trans } from "react-i18next";
// import { saveAs } from 'file-saver';
import { Helmet } from "react-helmet";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import { id } from "date-fns/locale";
import ConstantList from "../../appConfig";
import { getItemById as getAgency } from "../Agency1/AgencyService"; 
import moment from "moment";
import localStorageService from "../../services/localStorageService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Autocomplete from "@material-ui/lab/Autocomplete";
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
        title={t("general.show_description")}
        onClick={() => props.onSelect(item, 3)}
      >
        <Icon fontSize="small" color={item?.isShow ? "primary" : "#838383"}>
          article
          </Icon>
      </IconButton>
      <IconButton
        size="small"
        title={t("general.set_to_my_offers")}
        onClick={() => props.onSelect(item, 2)}
      >
        <Icon fontSize="small" color={item?.isShow ? "primary" : "#838383"}>
          close_fullscreen
          </Icon>
      </IconButton>
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
    </div>
  );

}

class OfferAgency extends Component {
  state = {
    rowsPerPage: 25,
    page: 0,
    categories: [],
    locations: [],
    conversionTypes: [],
    // qualificationList: [],
    item: {},
    shouldOpenEditorDialog: false,
    shouldOpenListOfferDialog: false,
    shouldOpenConfirmationDialog: false,
    shouldOpenConfirmationDialog1: false,
    shouldOpenShowDesDialog: false,
    shouldOpenApproveComfirmationDialog: false,
    selectAllItem: false,
    selectedList: [],
    totalElements: 0,
    shouldOpenConfirmationDeleteAllDialog: false,
    keyword: "",
    agencyId: "", 
    name: "",
    location: [],
    conversionType: [],
  };
  numSelected = 0;
  rowCount = 0;

  setPage = (page) => {
    this.setState({ page }, function () {
      this.updatePageData();
    });
  };

  handleTextChange = (event) => {
    console.log(this.state.agencyId);
    this.setState({ keyword: event.target.value }, function () { });
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.search();
    }
  }

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
      var searchObject = {};
      searchObject.keyword = this.state.keyword;
      searchObject.categories = this.state.categories.map(
        (category) => category.name
      );
      searchObject.locations = this.state.locations;
      searchObject.conversionTypes = this.state.conversionTypes;
      searchObject.pageIndex = this.state.page + 1;
      searchObject.pageSize = this.state.rowsPerPage;

      searchObject.agencyId = this.state.agencyId;
      searchByPage(searchObject).then(({ data }) => {
        this.setState({
          itemList: [...data.content],
          totalElements: data.totalElements,
        });
        this.setState({
          itemList: this.editDataAfterGetData(this.state.itemList),
        });
      });
    });
  }

  editDataAfterGetData = (itemList) => {
    for (let i = 0; i < itemList?.length; i++) {
      let date = itemList[i].product.createDate;
      let dateEdit =
        date[2] +
        "-" +
        date[1] +
        "-" +
        date[0] +
        " " +
        date[3] +
        ":" +
        date[4] +
        ":" +
        date[5];
      itemList[i].product.createDate = dateEdit;

      for (var j = 0; j < itemList[i].product.productPayouts.length; j++) {
        if (itemList[i].product.productPayouts[j].isCurrent === true) {
          itemList[i].payoutValue =
            itemList[i].product.productPayouts[j].payoutValue;
          break;
        }
      }
    }
    return itemList;
  };

  updatePageData = () => {
    var searchObject = {};
    searchObject.keyword = this.state.keyword;
    searchObject.categories = this.state.categories.map(
      (category) => category.name
    );
    searchObject.locations = this.state.locations;
    searchObject.conversionTypes = this.state.conversionTypes;
    searchObject.pageIndex = this.state.page + 1;
    searchObject.pageSize = this.state.rowsPerPage;
    searchObject.agencyId = this.state.agencyId;

    searchByPage(searchObject).then(({ data }) => {
      this.setState({
        itemList: [...data.content],
        totalElements: data.totalElements,
      });
      this.setState({
        itemList: this.editDataAfterGetData(this.state.itemList),
      });
      getAgency(this.state.agencyId).then((res) => {
        this.setState({ name: res.data.name });
      });
    });
  };

  getListLocation() {
    searchByLocation().then(({ data }) => {
      this.setState(
        {
          location: [...data],
        },
        () => { }
      );
    });
  }

  getListConversionType() {
    searchByConversionType().then(({ data }) => {
      this.setState(
        {
          conversionType: [...data],
        },
        () => { }
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
      shouldOpenConfirmationDeleteAllDialog1: false,
      shouldOpenListOfferDialog: false,
      shouldOpenShowDesDialog: false,
      shouldOpenApproveComfirmationDialog: false,
    });
  };

  handleOKEditClose = () => {
    this.setState({
      shouldOpenEditorDialog: false,
      shouldOpenConfirmationDialog: false,
      shouldOpenConfirmationDialog1: false,
      shouldOpenListOfferDialog: false,
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

  handleEditItem = (item) => {
    this.setState({
      shouldOpenListOfferDialog: true,
    });
  };

  handleConfirmationResponse = () => {
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
      this.updatePageData();
      this.handleDialogClose();
    });
  };
  handleFormSubmit = () => { };

  componentDidMount() {
    if (this.props.history.location.state) {
      let agencyId = this.props.history.location.state.agencyId;
      this.state.agencyId = agencyId;
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
      const param = this.props.match.params.agencyId;
      this.state.agencyId = param;
      this.updatePageData();
    }
  }

  goToPrivateOffer() {
    this.props.history.push({
      pathname: ConstantList.ROOT_PATH + "agency/my-offer",
      state: {
        rowsPerPage: 25,
        page: 0,
        keyword: "",
        agencyId: this.state.agencyId
      },
    });
  }

  handleEditItem = (item) => {
    this.setState({
      item: item,
      shouldOpenEditorDialog: true,
    });
  };

  openListOfferDiaglog = () => {
    this.setState({
      shouldOpenListOfferDialog: true,
    });
  };

  handleHide = (isShow, id) => {
    this.setState({
      id,
      isShow,
      shouldOpenConfirmationDialog: true,
    });
  };

  approveOffer = () => {
    this.setState({
      shouldOpenApproveComfirmationDialog: true,
    });
  };

  handleApproveConfirmationResponse = () => {
    approveToShowOffer(this.state.agencyId).then(() => {
      this.updatePageData();
      this.setState({
        shouldOpenApproveComfirmationDialog: false,
      });
      alert("Done!");
    });
  };

  render() {
    const { t, i18n } = this.props;
    let searchObject = { pageIndex: 0, pageSize: 1000000 };
    let abc = [{ dasda: "Asdsa" }, { asdsa: "asdsa" }, { asdsa: "sadsad" }];
    let {
      keyword,
      rowsPerPage,
      page,
      totalElements,
      itemList,
      item,
      categories,
      locations,
      conversionTypes,
      shouldOpenConfirmationDialog,
      shouldOpenConfirmationDialog1,
      shouldOpenEditorDialog,
      shouldOpenListOfferDialog,
      shouldOpenConfirmationDeleteAllDialog,
      shouldOpenShowDesDialog,
      shouldOpenApproveComfirmationDialog,
      name,
      location,
      conversionType,
    } = this.state;

    const isApproveButtonDisabled =
      itemList?.filter((item) => !item.isApprovedToShow).length > 0
        ? false
        : true;
    let TitlePage = "OfferList";
    let columns = [
      {
        title: t("Product.name"),
        field: "product.name",
        width: "15%",
        // render: (rowData) => {
        //   return (
        //     <div className="flex" style={{ alignItems: "center" }}>
        //       <span>{rowData.product?.name}</span>
        //       {rowData.status === offerStatus.USER_REQUESTED ? (
        //         <Icon style={{ color: "#FFFF33", marginLeft: "2px" }}>
        //           notifications
        //         </Icon>
        //       ) : (
        //           ""
        //         )}
        //     </div>
        //   );
        // },
      },
      {
        title: t("Product.createDate"),
        field: "createDate",
        align: "left",
        width: "12%",
        render: (rowData) =>
          rowData.createDate ? (
            <span>
              {moment(rowData.createDate).format("YYYY-MM-DD HH:mm:ss")}
            </span>
          ) : (
              ""
            ),
      },
      {
        title: t("Product.mainImageUrl"),
        field: "mainImageUrl",
        width: "15%",
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
        width: "10%",
        headerStyle: {
          textAlign: "right",
        },
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
      // {
      //   title: t("Product.payout"),
      //   field: "payoutValue",
      //   width: "10%",
      //   headerStyle: {
      //     textAlign: "right",
      //   },
      //   render: (rowData) => (
      //     <p className="MuiTableCell-alignRight">
      //       {rowData.payoutValue.toLocaleString("en-US")}
      //       {rowData.product?.currencyPayout === "THB"
      //         ? " Thb"
      //         : rowData.product?.currencyPayout === "VND"
      //           ? "₫"
      //           : rowData.product?.currencyPayout === "USD"
      //             ? "$"
      //             : " Rp"}
      //     </p>
      //   ),
      // }, 
      {
        title: t("general.action"),
        field: "custom",
        align: "left",
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
                let object = {
                  id: rowData.id,
                };
                setPrivateOffer(object).then(() => {
                  toast.success(t("general.success"));
                  this.updatePageData();
                });
              } else if (method === 3) {
                this.setState({
                  des: rowData.product?.description,
                  shouldOpenShowDesDialog: true,
                });
              } else {
                alert("Call Selected Here:" + rowData.id);
              }
            }}
          />
        ),
      },
    ];

    return (
      <div className="m-sm-30">
        <Helmet>
          <title>OfferPro | {TitlePage}</title>
        </Helmet>
        <div className="mb-sm-15">
          <Breadcrumb
            routeSegments={[
              {
                name: t("Agency.title"),
                path: ConstantList.ROOT_PATH + "/agency",
              },
              { name: t("Offer.offer_list") },
            ]}
          />
        </div>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              className="mr-16 align-bottom"
              variant="contained"
              color="secondary"
              onClick={() =>
                this.props.history.push(ConstantList.ROOT_PATH + "agency")
              }
            >
              <Icon color="inherit">arrow_back</Icon>
              {t("general.back")}
            </Button>

            <Button
              className="mr-16 align-bottom"
              variant="contained"
              color="primary"
              onClick={() => {
                this.openListOfferDiaglog();
              }}
            >
              {t("general.add")}
            </Button>


            <TextField
              label={t("Product.search")}
              style={{ width: 350 }}
              className="  mr-10"
              type="text"
              name="keyword"
              value={keyword}
              onChange={this.handleTextChange}
              onKeyPress={this.handleKeyPress}
            />
            <Button
              className=" mr-16 align-bottom"
              variant="contained"
              color="primary"
              onClick={() => this.search(keyword)}
            >
              <Icon fontSize="default">
                search
                  </Icon>
            </Button>
            <Button
              className="mr-16 align-bottom"
              variant="contained"
              color="primary"
              onClick={() => this.goToPrivateOffer()}
            >
              {t("Offer.my_offers")}
            </Button>
          </Grid>
          <Grid item md={4} sm={4} xs={4}>
            <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
              <AsynchronousAutocomplete
                label={t("general.filter_category")}
                searchFunction={categoriesSearchByPage}
                className=" mr-10 "
                multiple={true}
                searchObject={searchObject}
                defaultValue={categories}
                displayLable={"name"}
                value={categories}
                onSelect={this.selectCategories}
              />
            </ValidatorForm>
          </Grid>
           
          <Grid item xs={12}>
            <div>
              {shouldOpenListOfferDialog && (
                <ListOfferDiaglog
                  t={t}
                  i18n={i18n}
                  handleClose={this.handleDialogClose}
                  open={shouldOpenListOfferDialog}
                  handleOKEditClose={this.handleOKEditClose}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.setRowsPerPage}
                  agencyId={this.state.agencyId}
                />
              )}

              {shouldOpenConfirmationDialog1 && (
                <ConfirmationDialog
                  title={t("general.confirm")}
                  open={shouldOpenConfirmationDialog1}
                  onConfirmDialogClose={this.handleDialogClose1}
                  onYesClick={this.handleConfirmationResponse1}
                  text={t("general.deleteConfirm")}
                  agree={t("general.agree")}
                  cancel={t("general.cancel")}
                />
              )}
            </div>

            <div>
              {shouldOpenEditorDialog && (
                <PayoutDialog
                  t={t}
                  i18n={i18n}
                  handleClose={this.handleDialogClose}
                  open={shouldOpenEditorDialog}
                  handleOKEditClose={this.handleOKEditClose}
                  item={item}
                />
              )}

              {shouldOpenConfirmationDialog && (
                <ConfirmationDialog
                  title={t("general.confirm")}
                  open={shouldOpenConfirmationDialog}
                  onConfirmDialogClose={this.handleDialogClose}
                  onYesClick={this.handleConfirmationResponse}
                  text={
                    this.state.isShow
                      ? t("general.hide_offer_confirm")
                      : t("general.show_offer_confirm")
                  }
                  agree={t("general.agree")}
                  cancel={t("general.cancel")}
                />
              )}

              {shouldOpenShowDesDialog && (
                <ShowDialog
                  title={t("Product.description")}
                  open={shouldOpenShowDesDialog}
                  onConfirmDialogClose={this.handleDialogClose}
                  text={this.state.des}
                  cancel={"OK"}
                />
              )}

              <ConfirmationDialog
                title={t("general.confirm")}
                open={shouldOpenApproveComfirmationDialog}
                onConfirmDialogClose={this.handleDialogClose}
                onYesClick={this.handleApproveConfirmationResponse}
                text={t("general.approveConfirm")}
                agree={t("general.agree")}
                cancel={t("general.cancel")}
              />
            </div>
            <MaterialTable
              title={t("Offer.offer_list_of") + this.state.name}
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
              data={itemList}
              columns={columns}
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

export default OfferAgency;
