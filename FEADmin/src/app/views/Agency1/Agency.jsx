import React, { Component } from "react";
import {
  IconButton,
  Grid,
  TablePagination,
  Button,
  TextField,
  Icon
} from "@material-ui/core";
import MaterialTable, { MTableToolbar } from "material-table";
import {
  searchByPage,
  getItemById,
  unSetManager,
  getRole,
  searchByPageAgencyOfBDS,
  getExcel,
} from "./AgencyService";

import BDSListDiaglog from "./BDSListDiaglog";
import AgencyDetailDialog from "./AgencyDetailDialog";
import { roleSystem } from "../../role";
import { Breadcrumb, ConfirmationDialog } from "egret";

import { useTranslation } from "react-i18next";
import localStorageService from "../../services/localStorageService";
import ConstantList from "../../appConfig"; 
// import { saveAs } from 'file-saver';
import { Helmet } from "react-helmet";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import Loading from "../../../egret/components/EgretLoadable/Loading";
import SearchIcon from '@material-ui/icons/Search';
import ListIcon from "@material-ui/icons/List";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import { ValidatorForm } from "react-material-ui-form-validator";
import {
  PersonAdd,
  PersonAddDisabled,
  Visibility,
  Lock,
  AssignmentInd,
} from "@material-ui/icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        <React.Fragment>
          <IconButton
            size="small"
            color="primary"
            component="span"
            title="Offers"
            onClick={() => props.onSelect(item, 0)}
          >
            <Visibility fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="primary"
            component="span"
            title="My offers"
            onClick={() => props.onSelect(item, 3)}
          >
            <Lock fontSize="small" />
          </IconButton> 
        </React.Fragment>
      ); 
  }
  
  function ShowDescription(props) {
    const { t, i18n } = useTranslation();
    const item = props.item;
    return (
      <IconButton
        color="primary"
        component="span"
        title={t("general.show_details")}
        onClick={() => props.onSelect(item, 0)}
      >
        <AssignmentInd />
      </IconButton>
    );
  }
  
  class Agency extends Component {
    state = {
      rowsPerPage: 25,
      page: 0,
      // qualificationList: [],
      item: {},
      shouldOpenEditorDialog: false,
      shouldOpenEditorDialog1: false,
      shouldOpenConfirmationDialog: false,
      shouldOpenConfirmationDialog1: false,
      shouldOpenConfirmationDeleteAllDialog: false,
      shouldOpenShowDetailDialog: false,
      selectAllItem: false,
      selectedList: [],
      totalElements: 0,
      keyword: "",
      agencyId: "",
      unAssignId: "",
      role: "",
      showNetwork: "",
      loading: false,
    };
    numSelected = 0;
    rowCount = 0;
    tA = this.props;
    setPage = (page) => {
      this.setState({ page }, function () {
        this.updatePageData();
      });
    };
  
    handleTextChange = (event) => {
      this.setState({ keyword: event.target.value }, function () { });
    };
  
    
  
    setRowsPerPage = (event) => {
      this.setState({ rowsPerPage: event.target.value, page: 0 }, function () {
        this.updatePageData();
      });
    };
  
    handleChangePage = (event, newPage) => {
      this.setPage(newPage);
    };
  
    search() {
      this.setState({ page: 0 }, function () {
        this.updatePageData();
      });
    }
  
    handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        this.search();
      }
    }
  
    editDataAfterGetData = (itemList) => {
      let netWorkFalse = <CloseIcon style={{ color: "red" }} />;
      let netWorkTrue = <DoneIcon style={{ color: "green" }} />;
      for (let i = 0; i < this.state.itemList?.length; i++) {
        if (this.state.itemList[i].isNetwork == true) {
          this.setState((this.state.itemList[i].showNetwork = netWorkTrue));
        } else {
          this.setState((this.state.itemList[i].showNetwork = netWorkFalse));
        }
      }
    };
  
    updatePageData = () => {
      var searchObject = {};
      searchObject.keyword = this.state.keyword;
      searchObject.pageIndex = this.state.page + 1;
      searchObject.pageSize = this.state.rowsPerPage; 
        this.setState({ loading: true });
        searchByPage(searchObject).then(({ data }) => {
          this.setState({
            itemList: [...data.content],
            totalElements: data.totalElements,
            loading: false,
          });
          this.editDataAfterGetData(this.state.itemList);
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
        shouldOpenShowDetailDialog: false,
        shouldOpenAssignDialog: false
      });
    };
  
    handleOKEditClose = () => {
      this.setState({
        shouldOpenEditorDialog: false,
        shouldOpenAssignDialog: false,
        shouldOpenConfirmationDialog: false
      });
      this.updatePageData();
    };
  
    handleDeleteItem = (id) => {
      this.setState({
        id,
        shouldOpenConfirmationDialog: true,
      });
    };
  
    getFileExcel = () => {
      var searchObject = {};
      searchObject.keyword = this.state.keyword;
      getExcel(searchObject).then((result) => {
        const url = window.URL.createObjectURL(
          new Blob([result.data], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "List_Publisher_Network.xlsx");
        document.body.appendChild(link);
        link.click();
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
  
    handleConfirmationResponse = () => {
      let agency = {
        id: this.state.unAssignId,
      };
      unSetManager(agency).then(() => {
        this.updatePageData();
        this.handleDialogClose();
        var { t, i18n } = this.props;
        toast.success(t("general.success"));
      });
    };
  
    componentDidMount() {
      this.setState({
        loading: true,
      });
    }
  
    componentWillMount() {
      this.updatePageData()
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
    let abc = [{ dasda: "Asdsa" }, { asdsa: "asdsa" }, { asdsa: "sadsad" }];
    let {
      event,
      keyword,
      rowsPerPage,
      page,
      totalElements,
      itemList,
      item,
      shouldOpenConfirmationDialog,
      shouldOpenEditorDialog,
      shouldOpenConfirmationDeleteAllDialog,
      shouldOpenAssignDialog,
      shouldOpenConfirmationDialog1,
      shouldOpenShowDetailDialog,
      
    } = this.state;
    let TitlePage = t("Agency.title");
    let columns = [];
 
      columns = [
        {
          title: t("general.action"),
          field: "custom",
          align: "left",
          headerStyle: {
            paddingLeft: '3px'
          },
          cellStyle: {
            paddingLeft: '3px'
          },
          render: (rowData) => (
            <div style={{ marginLeft: 0 }}>
              <MaterialButton
                item={rowData}
                onSelect={(rowData, method) => {
                  if (method === 0) {
                    this.props.history.push({
                      pathname: ConstantList.ROOT_PATH + "agency/offer",
                      state: {
                        rowsPerPage: 25,
                        page: 0,
                        keyword: "",
                        agencyId: rowData.id,
                        isNetwork:rowData.isNetwork
                      },
                    });
                  } else if (method === 1) {
                    this.setState({
                      agencyId: rowData.id,
                      agencyName: rowData.name,
                      shouldOpenAssignDialog: true,
                    });
                  } else if (method === 2) {
                    this.setState({
                      unAssignId: rowData.id,
                      shouldOpenConfirmationDialog: true,
                    });
                  } else if (method === 3) {
                    this.props.history.push({
                      pathname: ConstantList.ROOT_PATH + "agency/my-offer",
                      state: {
                        rowsPerPage: 25,
                        page: 0,
                        keyword: "",
                        agencyId: rowData.id,
                        isNetwork:rowData.isNetwork
                      },
                    });
                  } else {
                    alert("Call Selected Here:" + rowData.id);
                  }
                }}
              />
              <ShowDescription
                item={rowData}
                onSelect={(rowData, method) => {
                  if (method === 0) {
                    this.setState({
                      detail: (
                        <>
                          <h4>{t("Agency.traffic_Source")}</h4>
                          <p>{rowData.trafficSource}</p>

                          <h4>{t("Agency.website")}</h4>
                          <p>{rowData.website}</p>

                          <h4>{t("Agency.email")}</h4>
                          <p>{rowData.email}</p>

                          <h4>{t("Agency.description")}</h4>
                          <p>{rowData.description}</p>
                        </>
                      ),
                      shouldOpenShowDetailDialog: true,
                    });
                  } else if (method === 1) {
                    this.setState({
                      agencyId: rowData.id,
                      shouldOpenEditorDialog1: true,
                    });
                  } else if (method === 2) {
                    this.setState({
                      unAssignId: rowData.id,
                      shouldOpenConfirmationDialog: true,
                    });
                  } else {
                    alert("Call Selected Here:" + rowData.id);
                  }
                }}
              />
            </div>
          ),
        },
        {
          title: t("general.stt"),
          field: "code",
          align: "left",
          width: "5%",
          cellStyle: {
            textAlign: "left",
          },
          render: (rowData) => page * rowsPerPage + (rowData.tableData.id + 1),
        },
        {
          title: t("Agency.name"),
          field: "name",
          align: "left",
          width: "17%"
        }, 
        {
          title: "Username account",
          field: "agencyUsers[0].userDto.username",
          align: "left",
          width: "17%"
        }, 
        {
          title: t("Agency.country"),
          field: "country",
          align: "left",
          width: "17%"
        },
        {
          title: t("Agency.phone"),
          field: "phone",
          align: "left",
          width: "17%"
        },
        {
          title: t("Agency.contact"),
          field: "socialContact",
          align: "left",
          width: "17%"
        }
      ];
  

    return (
      <div className="m-sm-30">
        <Helmet>
          <title>Offer Pro | {TitlePage}</title>
        </Helmet>
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: t("Agency.title") }]} />
        </div>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Button
              style={{ marginRight: "30px" }}
              className="mb-16 mr-36 align-bottom"
              variant="contained"
              color="primary"
              onClick={() => this.getFileExcel()}
            >
              {t("general.exportToExcel")}
            </Button>

            {shouldOpenConfirmationDeleteAllDialog && (
              <ConfirmationDialog
                open={shouldOpenConfirmationDeleteAllDialog}
                onConfirmDialogClose={this.handleDialogClose}
                onYesClick={this.handleDeleteAll}
                text={t("general.deleteAllConfirm")}
              />
            )}

            {shouldOpenShowDetailDialog && (
              <AgencyDetailDialog
                open={shouldOpenShowDetailDialog}
                onConfirmDialogClose={this.handleDialogClose}
                detail={this.state.detail}
                cancel={"OK"}
              />
            )}
            <TextField
              label={t("Agency.search")}
              style={{ width: 350 }}
              className=" mb-16 mr-10"
              type="text"
              name="keyword"
              value={keyword} 
              onChange={this.handleTextChange}
              onKeyPress={this.handleKeyPress}
            />
          
            <Button
              className="mb-16 mr-16 align-bottom"
              variant="contained"
              color="primary"
              onClick={() => this.search(keyword)}
              type="submit"
            >
              <SearchIcon className=""/>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <div>
              

              {shouldOpenAssignDialog && (
                <BDSListDiaglog
                  t={t}
                  i18n={i18n}
                  handleClose={this.handleDialogClose}
                  open={shouldOpenAssignDialog}
                  handleOKEditClose={this.handleOKEditClose}
                  onChangePage={this.handleChangePage}
                  agencyId={this.state.agencyId}
                  agencyName={this.state.agencyName}
                />
              )}

              {shouldOpenConfirmationDialog && (
                <ConfirmationDialog
                  title={t("general.confirm")}
                  open={shouldOpenConfirmationDialog}
                  onConfirmDialogClose={this.handleDialogClose}
                  onYesClick={this.handleConfirmationResponse}
                  text={t("Agency.unassignQA")}
                  agree={t("general.agree")}
                  cancel={t("general.cancel")}
                />
              )}
            </div>
      
                <React.Fragment>
                  <MaterialTable
                    title={t("general.listAgency")}
                    data={itemList}
                    columns={columns}
                    localization={{
                      body: {
                        emptyDataSourceMessage: `${t('general.emptyDataMessageTable')}`
                      },
                      toolbar: {
                        nRowsSelected: `${t('general.selects')}`
                      }
                    }}
                    options={{
                      selection: false,
                      actionsColumnIndex: -1,
                      paging: false,
                      search: false,
                      rowStyle: rowData => ({
                        backgroundColor: (rowData.tableData.id % 2 == 1) ? '#EEE' : '#FFF',
                      }),
                      maxBodyHeight: '450px',
                      minBodyHeight: '370px',
                      headerStyle: {
                        color: "#ffffff",
                        backgroundColor: "#7467ef",

                        whiteSpace: "normal",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        overflowWrap: "break-word"
                      },
                      cellStyle: {
                        whiteSpace: "normal",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        overflowWrap: "break-word"
                      },
                      padding: 'dense',
                      toolbar: false,
                    }}
                    components={{
                      Toolbar: props => (
                        <MTableToolbar {...props} />
                      ),
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
                </React.Fragment>
         
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Agency;