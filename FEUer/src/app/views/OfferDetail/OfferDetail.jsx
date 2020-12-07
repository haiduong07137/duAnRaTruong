import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import {
  Card,
  MenuItem,
  Divider,
  IconButton,
  Icon,
  TablePagination,
  Hidden,
  Grid,
  Button,
} from "@material-ui/core";
import {
  EgretSidenavContainer,
  EgretSidenav,
  EgretSidenavContent,
} from "egret";
import ConstantList from "../../appConfig";
import { getOffer, updateOffer } from "../../redux/actions/EcommerceActions";
import { Check, Clear } from "@material-ui/icons";
import { useTranslation, withTranslation, Trans } from "react-i18next";
import {
  searchByPageChildOfOffer,
  historyOfPrivateOfferPayout,
} from "../Offer/OfferService";
import MaterialTable, {
  MTableToolbar,
  Chip,
  MTableBody,
  MTableHeader,
} from "material-table";
import localStorageService from "../../services/localStorageService";
import axios from "axios";
import ScrollableTabsButtonForce from "./ScrollableTabsButtonForce";
import ChangeHistoryPrivateOfferAgencyDialog from "./ChangeHistoryPrivateOfferAgencyDialog";

const USER_REQUESTED = "USER_REQUESTED";
const NEW = "NEW";
const APPROVED = "APPROVED";

function MaterialButton(props) {
  const { t, i18n } = useTranslation();
  const item = props.item;
  return (
    <div>
      <IconButton
        size="small"
        title={t("general.history")}
        onClick={() => props.onSelect(item, 2)}
      >
        <Icon fontSize="small" color="primary">
          history
        </Icon>
      </IconButton>
    </div>
  );
}

class LeftSidebarCard extends Component {
  state = {
    open: true,
    totalElements: 0,
    rowsPerPage: 5,
    page: 0,
    totalElementsHistory: 0,
    rowsPerPageHistory: 5,
    pageHistory: 0,
    url1: "awdaw",
    shouldOpenHistorySpecifixPublisher: false,
    itemListHistory: [],
  };

  toggleSidenav = () => {
    this.setState({
      open: !this.state.open,
    });
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

  setPageHistory = (pageHistory) => {
    this.setState({ pageHistory }, function () {
      this.updatePageDataHistory();
    });
  };

  setRowsPerPageHistory = (event) => {
    this.setState(
      { rowsPerPageHistory: event.target.value, pageHistory: 0 },
      function () {
        this.updatePageDataHistory();
      }
    );
  };

  handleChangePageHistory = (event, newPage) => {
    this.setPageHistory(newPage);
  };

  handleClose = () => {
    this.setState({
      shouldOpenHistorySpecifixPublisher: false,
    });
  };

  componentDidMount = () => {
    const offerId = this.props.match.params.offerId;
    this.props.getOffer(offerId);
    // axios.get(ConstantList.API_ENPOINT + "/api/offer/" + offerId).then(res => {
    //   this.setState({ isPublicPayout: res.data.isPublicPayout })
    // const s = document.createElement('script');
    // s.type = 'text/javascript';
    // s.async = true;
    // if (this.state.isPublicPayout) {
    //   s.innerHTML = '    var a = document.getElementsByTagName("a") \n for(var i = 0; i < a.length;i++) \n { if(a[i].href.includes("offers/list")){ \n a[i].classList.add("active")} \n } ';
    // } else if (this.state.isPublicPayout === false) {
    //   s.innerHTML = '    var a = document.getElementsByTagName("a") \n for(var i = 0; i < a.length;i++) \n { if(a[i].href.includes("offers/my-list")){ \n a[i].classList.add("active")} \n } ';
    // }
    // if (s != null) {
    //   this.instance.appendChild(s);
    // }
    // });
  };

  updatePageDataHistory() {
    var searchObject = {};
    searchObject.keyword = this.state.keyword;
    searchObject.pageIndex = this.state.pageHistory + 1;
    searchObject.pageSize = this.state.rowsPerPageHistory;
    searchObject.id = this.props.match.params.offerId;
    historyOfPrivateOfferPayout(searchObject).then(({ data }) => {
      this.setState({
        itemListHistory: [...data.content],
        totalElementsHistory: data.totalElements,
      });
    });
  }

  updatePageData() {
    const user = localStorageService.getLoginUser();
    if (user.netWork) {
      var searchObject = {};
      searchObject.keyword = this.state.keyword;
      searchObject.locations = this.state.locations;
      searchObject.pageIndex = this.state.page + 1;
      searchObject.pageSize = this.state.rowsPerPage;
      searchObject.agencyId = user.id;
      searchByPageChildOfOffer(
        searchObject,
        this.props.match.params.offerId
      ).then(({ data }) => {
        this.setState({
          itemList: [...data.content],
          totalElements: data.totalElements,
        });
      });
    }
  }

  componentWillMount() {
    this.updatePageData();
    this.updatePageDataHistory();
  }

  componentWillUnmount() {
    // const s = document.createElement('script');
    // s.type = 'text/javascript';
    // s.async = true;
    // if (this.state.isPublicPayout) {
    //   s.innerHTML = '    var a = document.getElementsByTagName("a") \n for(var i = 0; i < a.length;i++) \n { if(a[i].href.includes("offers/list")){ \n a[i].classList.remove("active")} \n } ';
    // } else {
    //   s.innerHTML = '    var a = document.getElementsByTagName("a") \n for(var i = 0; i < a.length;i++) \n { if(a[i].href.includes("offers/my-list")){ \n a[i].classList.remove("active")} \n } ';
    // }
    // this.instance.appendChild(s);
  }

  renderLandingPages = (landingPage) => {
    return (
      <p className="w-100 p-12 m-0">
        <a href={landingPage.url} target="_blank" rel="noopener noreferrer">
          {landingPage.url}
        </a>{" "}
        <a href={landingPage.url} target="_blank" rel="noopener noreferrer">
          <IconButton>
            <Icon className="inline-block verticle-bottom text-green">
              open_in_new
            </Icon>
          </IconButton>
        </a>
      </p>
    );
  };

  selectOffer = () => {
    const offerId = this.props.match.params.offerId;
    let updatedOffer = this.props.offer;
    updatedOffer.status = USER_REQUESTED;
    this.props.updateOffer(offerId, updatedOffer);
  };

  deselectOffer = () => {
    const offerId = this.props.match.params.offerId;
    let updatedOffer = this.props.offer;
    updatedOffer.status = NEW;
    this.props.updateOffer(offerId, updatedOffer);
  };

  render() {
    const { offer, t } = this.props;
    const landingPages = offer.product?.landingPages;
    let {
      page,
      totalElements,
      shouldOpenHistorySpecifixPublisher,
      totalElementsHistory,
      rowsPerPage,
      rowsPerPageHistory,
      pageHistory,
    } = this.state;
    const user = localStorageService.getLoginUser();

    let columnsHistory = [
      {
        title: t("Private_payout.modified_date"),
        field: "createDate",
        width: 150,
        render: (rowData) =>
          rowData.createDate ? (
            <span>
              {moment(rowData.createDate)
                .subtract(1, "months")
                .format("DD-MM-YYYY HH:mm:ss")}
            </span>
          ) : (
            ""
          ),
      },

      {
        title: t("Private_payout.modified_by"),
        field: "modifiedBy",
        width: 120,
        cellStyle: {
          paddingLeft: 20,
        },
      },
      {
        title: t("Offer.changed_payout"),
        field: "payoutValue",
        width: 120,
        cellStyle: {
          paddingLeft: 20,
        },
        render: (rowData) => (
          <p>
            {rowData.payoutValue.toLocaleString("en-US")}
            {rowData.currencyPayout === "THB"
              ? " Thb"
              : rowData.currencyPayout === "VND"
              ? "₫"
              : rowData.currencyPayout === "USD"
              ? "$"
              : " Rp"}
          </p>
        ),
      },
      {
        title: t("Private_payout.apply_date"),
        field: "applyDate",
        width: 150,
        headerStyle: {
          paddingLeft: 30,
        },
        cellStyle: {
          paddingLeft: 30,
        },
        render: (rowData) =>
          rowData.applyDate ? (
            <span>
              {moment(rowData.applyDate).format("DD-MM-YYYY HH:mm:ss")}
            </span>
          ) : (
            ""
          ),
      },
      {
        title: t("Private_payout.end_date"),
        field: "endDate",
        width: 150,
        headerStyle: {
          paddingLeft: 30,
        },
        cellStyle: {
          paddingLeft: 30,
        },
        render: (rowData) =>
          rowData.endDate ? (
            <span>{moment(rowData.endDate).format("DD-MM-YYYY HH:mm:ss")}</span>
          ) : (
            ""
          ),
      },
      {
        title: t("Offer.default_payout"),
        field: "offer.product.currentPayout",
        width: 100,
        cellStyle: {
          textAlign: "right",
          paddingRight: 20,
        },
        render: (rowData) => (
          <p className="MuiTableCell-alignRight">
            {rowData.offer.product?.currentPayout?.toLocaleString("en-US")}
            {rowData.offer.product?.currencyPayout === "THB"
              ? " Thb"
              : rowData.offer.product?.currencyPayout === "VND"
              ? "₫"
              : rowData.offer.product?.currencyPayout === "USD"
              ? "$"
              : " Rp"}
          </p>
        ),
      },
    ];

    let columns = [
      {
        title: t("Agency.pub_name"),
        field: "pubName",
        width: 150,
        align: "left",
      },
      {
        title: t("Product.createDate"),
        field: "modifyDate",
        width: 150,
        align: "left",
        render: (rowData) =>
          rowData.createDate ? (
            <span>
              {moment(rowData.createDate)
                .subtract(1, "months")
                .format("DD-MM-YYYY HH:mm:ss")}
            </span>
          ) : (
            ""
          ),
      },
      {
        title: t("Product.conversionType"),
        field: "rowdata.product?.conversionType",
        align: "left",
        width: 120,
        render: (rowData) => (
          <p className="MuiTableCell-alignLeft">
            {rowData.product?.conversionType}
          </p>
        ),
      },
      {
        title: t("Private_payout.apply_date"),
        field: "applyDate",
        width: 100,
        align: "left",
        render: (rowData) =>
          rowData.applyDate ? (
            <span>
              {moment(rowData.applyDate).format("DD-MM-YYYY HH:mm:ss")}
            </span>
          ) : (
            ""
          ),
      },
      {
        title: t("Private_payout.end_date"),
        field: "endDate",
        width: 150,
        align: "left",
        render: (rowData) =>
          rowData.endDate ? (
            <span>{moment(rowData.endDate).format("DD-MM-YYYY HH:mm:ss")}</span>
          ) : (
            ""
          ),
      },
      {
        title: t("Product.payout"),
        field: "payoutValue",
        width: 150,
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
        width: 100,
        render: (rowData) => (
          <MaterialButton
            item={rowData}
            onSelect={(rowData, method) => {
              if (method === 0) {
                this.setState({
                  offerId: rowData.id,
                  shouldOpenEditorPayoutChildOfferForNetworkDialog: true,
                });
              } else if (method === 1) {
                this.setState({
                  offerId: rowData.id,
                  shouldOpenEditorPayoutChildOfferForNetworkDialog: true,
                });
              } else if (method === 2) {
                this.setState({
                  offerId: rowData.id,
                  shouldOpenHistorySpecifixPublisher: true,
                });
              }
            }}
          />
        ),
      },
    ];

    let currencyIcon = null;
    let currencyPayoutIcon = null;
    let currencyProductPayoutIcon = null;

    switch (offer.product?.currency) {
      case "VND":
        currencyIcon = "₫";
        break;
      case "THB":
        currencyIcon = " Thb";
        break;
      case "USD":
        currencyIcon = "$";
        break;
      case "IDR":
        currencyIcon = " Rp";
        break;
      default:
        currencyIcon = "";
    }

    switch (offer.product?.currencyPayout) {
      case "VND":
        currencyProductPayoutIcon = "₫";
        break;
      case "THB":
        currencyProductPayoutIcon = " Thb";
        break;
      case "USD":
        currencyProductPayoutIcon = "$";
        break;
      case "IDR":
        currencyProductPayoutIcon = " Rp";
        break;
      default:
        currencyProductPayoutIcon = "";
    }

    switch (offer.currency) {
      case "VND":
        currencyPayoutIcon = "₫";
        break;
      case "THB":
        currencyPayoutIcon = " Thb";
        break;
      case "USD":
        currencyPayoutIcon = "$";
        break;
      case "IDR":
        currencyPayoutIcon = " Rp";
        break;
      default:
        currencyPayoutIcon = "";
    }

    return (
      <div className="left-sidenav-card">
        <div className="header-bg" />
        <div className="left-sidenav-card__content">
          <div ref={(el) => (this.instance = el)} />
          <EgretSidenavContainer>
            <EgretSidenav
              width="370px"
              bgClass="bg-transperant"
              open={this.state.open}
              toggleSidenav={this.toggleSidenav}
            >
              {shouldOpenHistorySpecifixPublisher && (
                <ChangeHistoryPrivateOfferAgencyDialog
                  t={t}
                  open={shouldOpenHistorySpecifixPublisher}
                  handleClose={this.handleClose}
                  cancel={"OK"}
                  offerId={this.state.offerId}
                />
              )}
              <div className="left-sidenav-card__sidenav">
                {/* <Hidden smUp>
                  <div className="flex flex-end">
                    <IconButton onClick={this.toggleSidenav}>
                      <Icon>clear</Icon>
                    </IconButton>
                  </div>
                </Hidden> */}
                <h6 className="sidenav__header pl-36 pt-24">Sidebar header</h6>
                <div className="pt-80" style={{ position: "relative" }}></div>
                <div className="bg-default">
                  <Grid item lg={12} md={12} sm={12} xs={12} className="p-12">
                    <div class="movie-card">
                      <div
                        class="movie-header"
                        style={{
                          backgroundImage:
                            'url("' + offer.product?.mainImageUrl + '")',
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      >
                        <div class="header-icon-container"></div>
                      </div>

                      <div class="movie-content">
                        <div class="movie-content-header">
                          <a href="#">
                            <h3 class="movie-title">{offer.product?.name}</h3>
                          </a>
                          {/* <div class="imax-logo"></div> */}
                        </div>
                        <div class="movie-info">
                          <div class="info-section">
                            <span> {t("Offer.price")}: </span>
                          </div>
                          <div class="info-section">
                            <label>
                              {" "}
                              {offer.product?.price.toLocaleString("en-US")}
                              {currencyIcon}
                            </label>
                          </div>
                        </div>
                      </div>

                      {offer?.status === NEW ? (
                        <span></span>
                      ) : (
                        <div class="movie-content">
                          <div class="movie-info">
                            <div class="info-section">
                              <span> {t("Offer.Origin_Payout")}: </span>
                            </div>
                            <div class="info-section">
                              <label>
                                {" "}
                                {offer?.status === NEW ? (
                                  <span className="text-muted">
                                    {offer.product.payoutValue?.toLocaleString(
                                      "en-US"
                                    )}
                                  </span>
                                ) : (
                                  offer.product?.currentPayout?.toLocaleString(
                                    "en-US"
                                  )
                                )}
                                {currencyProductPayoutIcon}
                              </label>
                            </div>
                          </div>
                        </div>
                      )}

                      <div class="movie-content">
                        <div class="movie-info">
                          <div class="info-section">
                            <span> {t("Offer.payout")}: </span>
                          </div>
                          <div class="info-section">
                            {offer.status === NEW ? (
                              <label>
                                {offer.product.currentPayout?.toLocaleString(
                                  "en-US"
                                )}
                                &nbsp; {currencyProductPayoutIcon}
                              </label>
                            ) : (
                              <label>
                                {offer.payoutValue?.toLocaleString("en-US")}
                                &nbsp; {currencyPayoutIcon}
                              </label>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* <div class="movie-content">
                        <div class="movie-info">
                          <div class="info-section">
                            <span> {t("Offer.conversion_type")}: </span>
                          </div>
                          <div class="info-section">
                            <label> {offer.product?.conversionType}</label>
                          </div>
                        </div>
                      </div> */}

                      {/* <div class="movie-content">
                        <div class="movie-info">
                          <div class="info-section">
                            <span> {t("Offer.geography")}:</span>
                          </div>
                          <div class="info-section">
                            <label> {offer.product?.location}</label>
                          </div>
                        </div>
                      </div> */}

                      <div class="movie-content">
                        <div class="movie-info">
                          <div class="info-section">
                            <span> {t("Offer.category")}: </span>
                          </div>
                          <div class="info-section">
                            <label>
                              {" "}
                              {offer.product?.categories
                                .map((category) => category.name)
                                .join()}
                            </label>
                          </div>
                        </div>
                      </div>

                      <div class="movie-content">
                        <div class="movie-info">
                          <div class="info-section">
                            <span> {t("Offer.description")}:</span>
                          </div>
                          <div class="info-section">
                            <label> {offer.product?.description}</label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {user.userManage?.id !== null ? (
                      offer?.status === USER_REQUESTED ? (
                        <Button
                          variant="contained"
                          color="secondary"
                          className="mt-10"
                          onClick={this.deselectOffer}
                        >
                          {t("Offer.deselect_this_offer")}
                          <Clear className="ml-10 mb-4" />
                        </Button>
                      ) : offer?.status !== APPROVED ? (
                        <Button
                          variant="contained"
                          color="primary"
                          className="mt-10"
                          onClick={this.selectOffer}
                        >
                          <span>{t("Offer.select_this_offer")}</span>
                          <Check className="ml-10 mb-4" />
                        </Button>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </Grid>
                </div>
              </div>
            </EgretSidenav>
            <div style={{ marginLeft: "10px" }}>
              <EgretSidenavContent>
                <h5 className="text-white pl-24 pt-24">Left sidebar card</h5>
                <div className="py-40" />
                <div className="pb-2" />
                {/* <Grid
                  className="content-card m-4"
                  elevation={2}
                  container
                  width={100}
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                >
                  <div className="card-header flex flex-wrap flex-middle ml-8">
                    <div className="show-on-mobile">
                      <IconButton onClick={this.toggleSidenav}>
                        <Icon>short_text</Icon>
                      </IconButton>
                    </div>
                    <div className="hide-on-mobile">
                      <div className="pl-16"></div>
                    </div>
                    {/* <div>Target URL</div>
                  </div>
                  <Divider /> */}
                  {/* <Grid container spacing={1}>
                    <Grid
                      container
                      item
                      lg={6}
                      md={6}
                      sm={6}
                      xs={12}
                      className="p-12"
                    >
                      <p style={{ fontWeight: "bold", margin: "10px" }}>
                        Landing Pages
                      </p>
                      {typeof landingPages !== "undefined" &&
                      landingPages !== null
                        ? landingPages
                            .filter(
                              (landingPage) =>
                                landingPage.type === "Landing Page"
                            )
                            .filter((landingPage) => landingPage.isShow)
                            .map((landingPage) =>
                              this.renderLandingPages(landingPage)
                            )
                        : ""}
                    </Grid>
                    <Grid
                      container
                      item
                      lg={6}
                      md={6}
                      sm={6}
                      xs={6}
                      className="p-12"
                    >
                      <p style={{ fontWeight: "bold", margin: "10px" }}>
                        Pre Landing Pages
                      </p>
                      {typeof landingPages !== "undefined" &&
                      landingPages !== null
                        ? landingPages
                            .filter(
                              (landingPage) =>
                                landingPage.type === "Pre Landing Page"
                            )
                            .filter((landingPage) => landingPage.isShow)
                            .map((landingPage) =>
                              this.renderLandingPages(landingPage)
                            )
                        : ""}
                    </Grid>
                  </Grid> */}
                {/* </Grid> */}

                {/* {offer.isPublicPayout === false ? ( */}
                  <ScrollableTabsButtonForce
                    t={t}
                    columnsHistory={columnsHistory}
                    itemListHistory={this.state.itemListHistory}
                    totalElementsHistory={totalElementsHistory}
                    rowsPerPageHistory={rowsPerPageHistory}
                    pageHistory={pageHistory}
                    handleChangePageHistory={this.handleChangePageHistory}
                    setRowsPerPageHistory={this.setRowsPerPageHistory}
                    columns={columns}
                    itemList={this.state.itemList}
                    totalElements={totalElements}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    handleChangePage={this.handleChangePage}
                    setRowsPerPage={this.setRowsPerPage}
                    offer={offer}
                    user={user}
                  />
                {/* ) : (
                  ""
                )} */}

                {/* {offer.isPublicPayout === false ? (
                  <Card className="content-card m-4" elevation={2}>
                    <div className="card-header flex flex-wrap flex-middle ml-8">
                      <div className="show-on-mobile">
                        <IconButton onClick={this.toggleSidenav}>
                          <Icon>short_text</Icon>
                        </IconButton>
                      </div>
                      <div className="hide-on-mobile">
                        <div className="pl-16"></div>
                      </div>
                      <h5>History Change Payout Offer</h5>
                    </div>
                    <Divider />

                    <MaterialTable
                      title={t("Offer.private_offer_list")}
                      localization={{
                        body: {
                          emptyDataSourceMessage: `${t('general.emptyDataMessageTable')}`
                        },
                        toolbar: {
                          nRowsSelected: `${t('general.selects')}`
                        }
                      }}
                      data={this.state.itemListHistory ? this.state.itemListHistory : []}
                      columns={columnsHistory}

                      options={{
                        headerStyle: {
                          color: "#ffffff",
                          backgroundColor: "#000099"
                        },
                        rowStyle: rowData => ({
                          backgroundColor: (rowData.tableData.id % 2 == 1) ? '#EEE' : '#FFF',
                        }),
                        maxBodyHeight: '450px',
                        minBodyHeight: '370px',
                        selection: false,
                        padding: "dense",
                        actionsColumnIndex: -1,
                        paging: false,
                        search: false,
                        toolbar: false
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
                      rowsPerPageOptions={[1, 5, 10, 25, 50]}
                      component="div"
                      count={totalElementsHistory}
                      rowsPerPage={rowsPerPageHistory}
                      page={pageHistory}
                      backIconButtonProps={{
                        "aria-label": "Previous Page",
                      }}
                      nextIconButtonProps={{
                        "aria-label": "Next Page",
                      }}
                      onChangePage={this.handleChangePageHistory}
                      onChangeRowsPerPage={this.setRowsPerPageHistory}
                    />

                  </Card>
                ) : ""}


                {user?.netWork === true && offer.isPublicPayout === false ? (
                  <Card className="content-card m-4" elevation={2}>
                    <div className="card-header flex flex-wrap flex-middle ml-8">
                      <div className="show-on-mobile">
                        <IconButton onClick={this.toggleSidenav}>
                          <Icon>short_text</Icon>
                        </IconButton>
                      </div>
                      <div className="hide-on-mobile">
                        <div className="pl-16"></div>
                      </div>
                      <h5>Offer Payout for specific Publisher</h5>
                    </div>
                    <Divider />
                    <MaterialTable
                      title={t("Offer.private_offer_list")}
                      localization={{
                        body: {
                          emptyDataSourceMessage: `${t('general.emptyDataMessageTable')}`
                        },
                        toolbar: {
                          nRowsSelected: `${t('general.selects')}`
                        }
                      }}
                      data={this.state.itemList ? this.state.itemList : []}
                      columns={columns}

                      options={{
                        headerStyle: {
                          color: "#ffffff",
                          backgroundColor: "#7467ef"
                        },
                        rowStyle: rowData => ({
                          backgroundColor: (rowData.tableData.id % 2 == 1) ? '#EEE' : '#FFF',
                        }),
                        maxBodyHeight: '450px',
                        minBodyHeight: '370px',
                        selection: false,
                        padding: "dense",
                        actionsColumnIndex: -1,
                        paging: false,
                        search: false,
                        toolbar: false
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
                      rowsPerPageOptions={[1, 5, 10, 25, 50]}
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
                  </Card>
                ) : ""} */}
              </EgretSidenavContent>
            </div>
          </EgretSidenavContainer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    offer: state.ecommerce.offer,
  };
};

export default connect(mapStateToProps, {
  getOffer,
  updateOffer,
})(LeftSidebarCard);
