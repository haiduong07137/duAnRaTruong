import React, { Component } from "react";
import {
  IconButton, Grid, Icon, TablePagination, Button, TextField,
} from "@material-ui/core";
import MaterialTable, { MTableToolbar, Chip, MTableBody, MTableHeader, } from "material-table";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Breadcrumb, ConfirmationDialog, ShowDialog } from "egret";
import { useTranslation, withTranslation, Trans } from "react-i18next";
// import { saveAs } from 'file-saver';
import { Helmet } from "react-helmet"; 
import ConstantList from "../../appConfig"; 
import { searchByPage } from "./LeadService";
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
      this.updatePageData()
    });
  }



  updatePageData = () => {
    var searchObject = {};
    searchObject.keyword = this.state.keyword;
    searchObject.pageIndex = this.state.page + 1;
    searchObject.pageSize = this.state.rowsPerPage;
    searchObject.id = this.props.match.params.id;
    searchByPage(searchObject).then(({ data }) => {
      this.setState({
        itemList: [...data.content],
        totalElements: data.totalElements,
      });
    });
  };



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
    this.setState({
      shouldOpenListOfferDialog: true,
    });
  };


  handleFormSubmit = () => { };

  componentDidMount() {
    this.updatePageData();
  }

  componentWillMount() {
    this.updatePageData();
  }
  componentDidUpdate(prevProps) {

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
        title:"STT", field: "code", width: "5",  
        headerStyle: {
          paddingLeft: '3px'
        },
        cellStyle: {
          paddingLeft: '3px'
        },
        render: rowData => ((page) * rowsPerPage) + (rowData.tableData.id + 1)
      },
      {
        title: "Name",
        field: "name",
        width: "15%",
      },
      {
        title: "Phone",
        field: "phone",
        align: "left",
        width: "15%",
      },
      {
        title: "Message",
        field: "message",
        width: "60%",
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
          </Grid>


          <Grid item xs={12}>
            <div>

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
              title={"Danh sách lead " + this.state.name}
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
