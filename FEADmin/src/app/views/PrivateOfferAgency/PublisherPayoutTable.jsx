import React, { Component } from "react";
import {
  IconButton,
  Dialog,
  Icon,
  Grid,
  TablePagination,
} from "@material-ui/core";
import moment from "moment";
import {
  getItemById,
  deleteItem,
  searchByPageChildOfOffer
} from "./PrivateOfferAgencyService";

import DialogContent from "@material-ui/core/DialogContent"; 
import Draggable from "react-draggable";
import Paper from "@material-ui/core/Paper";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import ChangeHistoryPrivateOfferAgencyDialog from './ChangeHistoryPrivateOfferAgencyDialog'
import "react-toastify/dist/ReactToastify.css";
import MaterialTable, {
  MTableToolbar
} from 'material-table'

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

class PublisherPayoutTable extends Component {
  state = {
    totalElements: 0,
    rowsPerPage: 5,
    page: 0,
    id: "",
    publicPayout: 0,
    shouldOpenEditorPayoutChildOfferForNetworkDialog: false,
    shouldOpenHistorySpecifixPublisher: false,
    netWork: true,
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

  handleClose = () => {
    this.setState({
      shouldOpenEditorPayoutChildOfferForNetworkDialog: false,
      shouldOpenHistorySpecifixPublisher: false
    })
    this.updatePageData()
  }

  updatePageData() {
    if (this.state.netWork) {
      var searchObject = {};
      searchObject.keyword = this.state.keyword;
      searchObject.locations = this.state.locations;
      searchObject.pageIndex = this.state.page + 1;
      searchObject.pageSize = this.state.rowsPerPage;
      searchObject.agencyId = this.props.agencyId;
      searchByPageChildOfOffer(searchObject, this.props.offerID).then(({ data }) => {
        console.log(data);
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
      console.log(data);
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
        payoutValue: this.addSeparatedNumber(this.state.payoutValue + '')
      })
      this.updatePageData()
    });
  }

  render() {
    let { page, shouldOpenHistorySpecifixPublisher, totalElements, shouldOpenEditorPayoutChildOfferForNetworkDialog,
      rowsPerPage, item} = this.state;
    let { open, t, i18n } = this.props;

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
                .format("YYYY-MM-DD HH:mm:ss")}
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

    return (
      <Dialog
        open={open}
        PaperComponent={PaperComponent}
        maxWidth="lg"
        fullWidth={false}
      >
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
         
          <div
            style={{ cursor: "move" }}
            id="draggable-dialog-title"
            className="flex flex-space-between flex-middle pl-16 pr-8 py-8 bg-primary"
          >
            <h4 className="m-0 text-white">
              {t("Product.publisher_payout")}
            </h4>
            <IconButton onClick={this.props.handleClose}>
              <Icon className="text-white">clear</Icon>
            </IconButton>
          </div>
          <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
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
                        backgroundColor: rowData.isShow == false ? "#838383" : rowData.tableData.id % 2 === 0 ? "#ffffff" : "#eeeeee",
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
          </DialogContent>
      </Dialog>
    );
  }
}

export default PublisherPayoutTable;
