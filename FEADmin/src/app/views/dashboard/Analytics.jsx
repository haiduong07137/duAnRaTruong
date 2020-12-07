import React, { Component, Fragment } from "react";
import {
  Grid,
  Card,
  Icon,
  IconButton,
  Button,
  Checkbox,
  Fab,
  Avatar,
  Hidden,
} from "@material-ui/core";
import { ValidatorForm } from "react-material-ui-form-validator";
import AsynchronousAutocomplete from "../utilities/AsynchronousAutocomplete";
import { Breadcrumb, SimpleCard, ConfirmationDialog } from "egret";
import DashboardWelcomeCard from "../cards/DashboardWelcomeCard";
import AreaChart from "../charts/echarts/AreaChart";
import moment from "moment";
import MaterialTable, { MTableToolbar } from "material-table";
import { 
  // getDashboardAnalytics, 
  // getAllProduct, getAllAnaltic, 
  // getCountLink, 
  // getCountOfferPrivate, 
  // getCountOfferPublic, 
  getAnalytics,
  getAllUser,
  getPrivateAgencyOffer,
  resetCountLink,
  getPublicAgencyOffer } from "./DashboardService";
import { format } from "date-fns";
import ModifiedAreaChart from "./ModifiedAreaChart";
import { withStyles } from "@material-ui/styles";
import { Helmet } from 'react-helmet';
import {searchByPageProduct} from "./DashboardService";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import localStorageService from "../../../app/services/localStorageService";
import {roleSystem} from "../../role";


function MaterialButton(props) {
  const { t, i18n } = useTranslation(); 
  const item = props.item;
  return (
    <div>
      <IconButton
        size="small"
        hidden={true}
        title={t("general.edit_my_payout")}
        onClick={() => props.onSelect(item, 0)}
      >
        <Icon hidden={true} fontSize="small" color="secondary">
          delete
        </Icon>
      </IconButton>
    </div>
  );
}

class Dashboard1 extends Component {
  
  state = {
    analytics: {},
    assetCountByDate: [],
    allocationVoucherCountByDate: [],
    transferVoucherCountByDate: [],
    maintainRequestCountByDate: [],
    totalProduct: 0,
    countPublicOffer: 0,
    countPrivateOffer: 0,
    countClick: 0,
    role: "",
    id: "",
    rowsPerPage: 25,
    page: 0,
    keyword: '',
    itemList: [],
    item: {},
    listUser: {},
    agencyId: "",
    listPrivate: [],
    openTable: false,
    countClickTable: 0,
    price: 0,
    countClickPrivate: 0,
    countClickPublic: 0,
    shouldOpenConfirmationDialog: false,
    offerID: 0,
  };

  componentDidMount() {
    this.updatePageData();
    console.log(this.state);
  }
  componentWillMount() {
    let user = localStorageService.getItem("auth_user");
    console.log(user);
    this.setState({
      role: user.role,
      userId: user.id
    })

  }

  updatePageData = () => {
    getAnalytics(this.state.role, this.state.userId).then((analytics) => {
      let data = analytics.data;
        this.setState({ 
          totalProduct: data[0].totalProduct,
          // countPublicOffer: data[0].countOfferPublic,
          // countPrivateOffer: data[0].countOfferPrivate,
          countClick: data[0].countClick,
        })
      
    }).catch((err) => {
      console.log(err);
    })
    var searchObject = {}
    searchObject.keyword = this.state.keyword
    searchObject.pageIndex = this.state.page + 1;
    searchObject.pageSize = this.state.rowsPerPage;
    searchObject.agencyId = this.state.agencyId;
    if (searchObject.agencyId) {
      getPrivateAgencyOffer(searchObject).then(({ data }) => {
        this.setState({
          listPrivate: [...data.content],
          countPrivateOffer: data.totalElements,
          price: data.content.reduce(( total, item) => {
            if(item.countClick === null) {
              item.countClick = 0;
            }
            return total + (item.payoutValue * item.countClick);
          }, 0),
          countClickPrivate: data.content.reduce(( total, item) => {
            if(item.countClick === null) {
              item.countClick = 0;
            }
            return total + item.countClick;
          }, 0)
        })
      }).catch(err => console.log(err));

      getPublicAgencyOffer(searchObject).then(({ data}) => {
        this.setState({
          // listPrivate: [...data.content],
          countPublicOffer: data.totalElements,
          countClickPublic: data.content.reduce(( total, item) => {
            if(item.countClick === null) {
              item.countClick = 0;
            }
            return total + item.countClick;
          }, 0)
        })
      }).catch(err => console.log(err));
    }
    
   
  };

  selectUser = (UserSelected) => {
    if (UserSelected) {
      this.setState({ 
        openTable: true,
        listUser: UserSelected,
        agencyId: UserSelected.id,
      });
      
      
    } else {
      this.setState({ 
        openTable: false,
        listUser: [],
        agencyId: "",
        countPrivateOffer: 0,
        price: 0,
      });
    }
    
    this.search();
  }
  search() {
    this.setState({ page: 0 }, function () {
      this.updatePageData();
    });
  }

  handleDialogClose = () => {
    this.setState({ 
      shouldOpenConfirmationDialog: false
     });
  }
  handleConfirmationResponse = () => {
    resetCountLink(this.state.offerID).then(() => {
      this.updatePageData();
      this.handleDialogClose();
    }).catch(() => {
      console.log("Error");
    })
  }
  handleDeleteItem = () => {
    this.setState({
      shouldOpenConfirmationDialog: true,
    })
  }


  render() {
    const { theme} = this.props;
    const { t, i18n } = this.props;
    console.log(this.state);
    let TitlePage = t("Dashboard.dashboard");
    let searchObject = { pageIndex: 0, pageSize: 1000000 };
    let { shouldOpenConfirmationDialog, offerID ,openTable,countClickPrivate, countClickPublic, price , listPrivate, listUser, totalProduct, countPublicOffer, countPrivateOffer, countClick, countClickTable } = this.state;
    let columns = [
      {
        title: t("Product.name"),
        field: "product.name",
        width: "20%",
        align: "center",
        headerStyle: {
          textAlign: "center",
        },
      },
      {
        title: t("Product.payout"),
        field: "payoutValue",
        width: "20%",
        align: "center",
        headerStyle: {
          textAlign: "center",
        },
        type: "numeric",
        render: (rowData) => (
          <p className="MuiTableCell-alignCenter">
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
        title: t("Product.countClick"),
        field: "countClick",
        width: "20%",
        align: "center",
        headerStyle: {
          textAlign: "center",
        },
        render: (rowData) => (
          <p className="MuiTableCell-alignCenter">
            {rowData.countClick !== null ? rowData.countClick : 0}
          </p>
        ),
      },
      {
        title: t("Giá"),
        field: "price",
        width: "20%",
        align: "center",
        headerStyle: {
          textAlign: "center",
        },
        type: "numeric",
        render: (rowData) => (
          <p className="MuiTableCell-alignCenter">
            {rowData.countClick !== null ? 
            (rowData.payoutValue * rowData.countClick).toLocaleString("en-US") : 
            (rowData.payoutValue * 0).toLocaleString("en-US")}
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
        align: "center",
        headerStyle: {
          textAlign: "center",
        },
        render: (rowData) => (
          <MaterialButton
            item={rowData}
            onSelect={(rowData, method) => {
              console.log(method);
              if (method === 0) {
                this.setState({
                  offerID: rowData.id,
                })
                this.handleDeleteItem();
              }
            }}
          />
        ),
      },
    ]

    console.log(this.state);
    return (

      <div className="analytics m-sm-30">
        <Helmet>
          <title>{t("Dashboard.dashboard")} | {t("web_site")}</title>
        </Helmet>
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: t("Dashboard.dashboard") }
            ]}
          />
        </div>
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DashboardWelcomeCard t={t} 
              totalProduct={totalProduct}
              countPrivateOffer={countPrivateOffer}
              countPublicOffer={countPublicOffer}
              countClick={countClick}
              price={price}
              countClickPublic={countClickPublic}
              countClickPrivate={countClickPrivate}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}
                align="right"
                >
                <AsynchronousAutocomplete
                  label={t("Lọc theo user")}
                  searchFunction={getAllUser}
                  className=" mr-10 mb-10"
                  multiple={false}
                  searchObject={searchObject}
                  displayLable={"name"}
                  value={listUser}
                  onSelect={this.selectUser}
                />
              </ValidatorForm>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            {shouldOpenConfirmationDialog && (
                <ConfirmationDialog
                title={t('general.confirm')}
                open={shouldOpenConfirmationDialog}
                onConfirmDialogClose={this.handleDialogClose}
                onYesClick={this.handleConfirmationResponse}
                text={t('general.deleteConfirm')}
                agree={t('general.agree')}
                cancel={t('general.cancel')}
                />
              )}
            {this.state.openTable == true && this.state.listUser != null? (
              <MaterialTable
              title={t("Offer.my_offer_list_of") + this.state.listUser.name}
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
              data={listPrivate}
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
            ) : ""}
            
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles({}, { withTheme: true })(Dashboard1);
