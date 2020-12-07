import React, { Component } from "react";
import {
  IconButton,
  Grid,
  Icon,
  TablePagination,
  Button,
  TextField,
} from "@material-ui/core";
import MaterialTable, { MTableToolbar } from "material-table";
import {
  searchByPage,
  getItemById,
  setPublicOffer,
  deleteItem,
} from "./PrivateOfferAgencyService";
import { exportToExcelByAgency } from "./PrivateOfferPayoutAgencyService";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import AsynchronousAutocomplete from "../utilities/AsynchronousAutocomplete";
import {
  searchByLocation,
  searchByConversionType,
} from "../Product/ProductService";
import { searchByPage as categoriesSearchByPage } from "../Categories/CategoriesService";
import PayoutDialog from "./EditPrivateOfferAgencyDialog";
import { Breadcrumb, ConfirmationDialog, ShowDialog } from "egret";
import { useTranslation } from "react-i18next";
// import { saveAs } from 'file-saver';
import FileSaver from "file-saver";
import { Helmet } from "react-helmet";
import localStorageService from "../../services/localStorageService"; 
import ChangeHistoryPrivateOfferAgencyDialog from "./ChangeHistoryPrivateOfferAgencyDialog";
import PublisherPayoutTable from "./PublisherPayoutTable";
import { getItemById as getAgency } from "../Agency1/AgencyService";
import ConstantList from "../../appConfig";
import moment from "moment";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import Autocomplete from "@material-ui/lab/Autocomplete";
toast.configure({
  autoClose: 1000,
  draggable: false,
  limit: 3,
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
        onClick={() => props.onSelect(item, 2)}
      >
        <Icon fontSize="small" color="primary">
          article
          </Icon>
      </IconButton>

      <IconButton
        size="small"
        hidden={true}
        title={t("general.edit_my_payout")}
        onClick={() => props.onSelect(item, 0)}
      >
        <Icon hidden={true} fontSize="small" color="primary">
          edit
          </Icon>
      </IconButton>

      <IconButton
        size="small"
        title={t("general.history")}
        onClick={() => props.onSelect(item, 3)}
      >
        <Icon fontSize="small" color="primary">
          history
          </Icon>
      </IconButton>
      <IconButton
        size="small"
        title={t("Product.publisher_payout")}
        onClick={() => props.onSelect(item, 4)}
      >
        <Icon fontSize="small" color="primary">
          list
          </Icon>
      </IconButton>
    </div>
  );
}
class Agency extends Component {
  state = {
    rowsPerPage: 5,
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
    selectAllItem: false,
    shouldOpenListLeadTable:false,
    selectedList: [],
    totalElements: 0,
    shouldOpenConfirmationDeleteAllDialog: false,
    shouldOpenChangeHistoryPrivateOfferAgencyDialog: false,
    keyword: "",
    agencyId: "",
    role: "",
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
      // var { t, i18n } = this.props;
      // toast.info(t("general.load_data"));
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
      shouldOpenChangeHistoryPrivateOfferAgencyDialog: false,
      shouldOpenConfirmationDialog: false,
      shouldOpenConfirmationDeleteAllDialog: false,
      shouldOpenConfirmationDeleteAllDialog1: false,
      shouldOpenListOfferDialog: false,
      shouldOpenShowDesDialog: false,
      shouldOpenPublisherPayoutTable: false,
    });
  };

  handleOKEditClose = () => {
    this.setState({
      shouldOpenEditorDialog: false,
      shouldOpenChangeHistoryPrivateOfferAgencyDialog: false,
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

  handleEditItem = (id) => {
    getItemById(id).then((result) => {
      this.setState({
        item: result.data,
        shouldOpenEditorDialog: true,
      });
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
    deleteItem(this.state.id).then(() => {
      this.updatePageData();
      this.handleDialogClose();
    });
  };

  componentDidMount() {
    if (this.props.history.location.state) {
      let params = this.props.history.location.state.agencyId;
      this.state.agencyId = params;
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

  handleEditItem = (item) => {
    this.setState({
      item: item,
      shouldOpenEditorDialog: true,
    });
  };

  goToPublicOffer() {
    this.props.history.push({
      pathname: ConstantList.ROOT_PATH + "agency/offer",
      state: {
        rowsPerPage: 10,
        page: 0,
        keyword: "",
        agencyId: this.state.agencyId,
      },
    });
  }

  gotoListLead(idOffer){ 
    this.props.history.push({
      pathname: ConstantList.ROOT_PATH + "agency/my-offer/lead/"+idOffer,
      state: {
        rowsPerPage: 10,
        page: 0,
        keyword: "" 
      },
    });
  }

  exportToExcel = () => {
    let { open, handleClose, item } = this.props;
    exportToExcelByAgency(this.state.agencyId)
      .then((res) => {
        let blob = new Blob([res.data], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        FileSaver.saveAs(blob, this.state.name + "_History_Offer_Payout.xlsx");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  openListOfferDiaglog = () => {
    this.setState({
      shouldOpenListOfferDialog: true,
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
    // const role = localStorageService.getLoginUser().role;
    let searchObject = { pageIndex: 0, pageSize: 1000000 };
    let {
      keyword,
      rowsPerPage,
      page,
      categories,
      shouldOpenListLeadTable, 
      totalElements,
      itemList,
      item,
      shouldOpenConfirmationDialog,
      shouldOpenConfirmationDialog1,
      shouldOpenEditorDialog, 
      publicPayout, 
      shouldOpenChangeHistoryPrivateOfferAgencyDialog,
      shouldOpenShowDesDialog, 
    } = this.state;
    let TitlePage = "OfferList";
    let columns = [
      {
        title: t("Product.name"),
        field: "product.name",
        width: "15%",
      },
      {
        title: t("Product.createDate"),
        field: "modifyDate",
        width: "12%",
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
        field: "product.mainImageUrl",
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
        title: t("Product.payout"),
        field: "payoutValue",
        width: "10%",
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
        title: t("general.action"),
        field: "custom",
        align: "left",
        render: (rowData) => (
          <MaterialButton
            isNetWork={this.props.history.location.state.isNetwork}
            item={rowData}
            onSelect={(rowData, method) => {
              if (method === 0) {
                this.setState({
                  shouldOpenEditorDialog: true,
                  offerID: rowData.id,
                  currency: rowData.currency,
                });
              } else if (method === 1) {
                let offer = {
                  id: rowData.id,
                };
                setPublicOffer(offer).then(() => {
                  toast.success(t("general.success"));
                  this.updatePageData();
                });
              } else if (method === 2) {
                this.setState({
                  des: rowData.product?.description,
                  shouldOpenShowDesDialog: true,
                });
              } else if (method === 3) {
                this.setState({
                  offerName: rowData.product?.name,
                  offerID: rowData.id,
                  shouldOpenChangeHistoryPrivateOfferAgencyDialog: true,
                });
              } else if (method === 4) {
                // View publisher's payout table
                this.gotoListLead(rowData.id)
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
          <Breadcrumb routeSegments={[
            { name: t("Agency.title"), path: ConstantList.ROOT_PATH + "/agency" },
            { name: t('Offer.my_offer_list') }]} />
        </div>

        <Grid container spacing={1}>
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

            <TextField
              label={t("Product.search")}
              style={{ width: 350 }}
              className="  mr-10  "
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
              className=" mr-16 align-bottom"
              variant="contained"
              color="primary"
              onClick={() => this.exportToExcel()}
            >
              Export Excel
            </Button>

            <Button
              className=" mr-16 align-bottom"
              variant="contained"
              color="primary"
              onClick={() => this.goToPublicOffer()}
            >
              {t("Offer.offers")}
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
              {shouldOpenConfirmationDialog && (
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
              {shouldOpenChangeHistoryPrivateOfferAgencyDialog && (
                <ChangeHistoryPrivateOfferAgencyDialog
                  t={t}
                  i18n={i18n}
                  handleClose={this.handleDialogClose}
                  open={shouldOpenChangeHistoryPrivateOfferAgencyDialog}
                  handleOKEditClose={this.handleOKEditClose}
                  item={item}
                  name={this.state.name}
                  offerName={this.state.offerName}
                  offerID={this.state.offerID}
                  agencyId={this.state.agencyId}
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
                  offerID={this.state.offerID}
                  agencyId={this.state.agencyId}
                  currency={this.state.currency}
                  publicPayout={publicPayout}
                />
              )}

              {shouldOpenListLeadTable && (
                <PublisherPayoutTable
                  t={t}
                  i18n={i18n}
                  handleClose={this.handleDialogClose}
                  open={shouldOpenListLeadTable}
                  handleOKEditClose={this.handleOKEditClose}
                  offerID={this.state.offerID}
                  agencyId={this.state.agencyId}
                  currency={this.state.currency}
                  publicPayout={publicPayout}
                />
              )}

              {shouldOpenConfirmationDialog && (
                <ConfirmationDialog
                  title={t("general.confirm")}
                  open={shouldOpenConfirmationDialog}
                  onConfirmDialogClose={this.handleDialogClose}
                  onYesClick={this.handleConfirmationResponse}
                  text={t("general.deleteConfirm")}
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
            </div>
            <MaterialTable
              title={t("Offer.my_offer_list_of") + this.state.name}
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
                maxBodyHeight: "450px",
                minBodyHeight: "370px",
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
                selection: false,
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

export default Agency;
