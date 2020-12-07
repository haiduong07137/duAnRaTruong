import React, { Component, Fragment } from "react";
import {
  Grid,
  // Card,
  Icon,
  IconButton,
  // Button,
  // Checkbox,
  // Fab,
  // Avatar,
  // Hidden,
  // TextField,
  // TablePagination,
  // Table,
  // TableHead,
  // TableBody,
  // TableRow,
  // TableCell,
  // TableFooter,
  // TableContainer,
} from "@material-ui/core";
import { ValidatorForm } from "react-material-ui-form-validator";
import AsynchronousAutocomplete from "../utilities/AsynchronousAutocomplete";
import { Breadcrumb, SimpleCard, EgretProgressBar } from "egret";
import DashboardWelcomeCard from "../cards/DashboardWelcomeCard";
import AreaChart from "../charts/echarts/AreaChart";

import { getCurrentUser } from "../../views/page-layouts/UserProfileService";
import {
  // getAnalytics,
  getAllUser,
  getPrivateAgencyOffer,
  resetCountLink,
  getPublicAgencyOffer 
} from "./DashboardService";
import { format } from "date-fns";
import ModifiedAreaChart from "./ModifiedAreaChart";
import { withStyles } from "@material-ui/styles";
import { Helmet } from "react-helmet";
import { useTranslation, withTranslation, Trans } from "react-i18next";
import moment from "moment";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardTimePicker, KeyboardDatePicker } from "@material-ui/pickers";
import { TIMEZONE } from "./Timezone";
import localStorageService from "../../services/localStorageService";
import Loading from "../../../egret/components/EgretLoadable/Loading";
import Autocomplete from "@material-ui/lab/Autocomplete";
import MaterialTable, { MTableToolbar } from "material-table";
import shortid from "shortid";


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
            arrow_forward
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
    name: "",
  };

  componentDidMount() {
    this.updatePageData();
  }

  componentWillMount() {
    let user = localStorageService.getItem("auth_user");
    console.log(user);
    this.setState({
      role: user.role,
      userId: user.id,
      agencyId: user.id,
      name: user.name,
    })
    
  }

  gotoMyOffer = (id) => {
    window.location.href = `http://localhost:3001/offers/my-list/${id}`
  }

  updatePageData() {
    var searchObject = {}
    searchObject.pageIndex = this.state.page + 1;
    searchObject.pageSize = this.state.rowsPerPage;
    searchObject.keyword = this.state.keyword;
    searchObject.agencyId = this.state.agencyId;
    getPrivateAgencyOffer(searchObject).then(({ data }) => {
      console.log(data);
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
              if (method === 0) {
                this.gotoMyOffer(rowData.id);
              }
            }}
          />
        ),
      },
      
    ]
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
          <Grid item lg={12} md={12} sm={12} xs={12}>
              <MaterialTable
              title={t("Danh sách private offer của: ") + this.state.name}
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
          </Grid>
        </Grid>
      </div>
    )
  }
  
}

export default withStyles({}, { withTheme: true })(Dashboard1);

