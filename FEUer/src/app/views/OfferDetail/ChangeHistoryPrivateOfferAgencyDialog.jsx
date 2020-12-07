import React, { Component } from "react";
import {
  IconButton,
  Dialog,
  Button,
  Icon,
  Grid,
  TablePagination,
  DialogActions,
} from "@material-ui/core";

import { historyOfPrivateOfferPayout } from "../Offer/OfferService";
import DialogContent from "@material-ui/core/DialogContent";
import Draggable from "react-draggable";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import MaterialTable, { MTableToolbar } from "material-table";

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

class ChangeHistoryPrivateOfferAgencyDialog extends Component {

  state = {
    rowsPerPage: 10,
    page: 0,
    item: {},
    itemList: [],
    totalElements: 0,

  };
  numSelected = 0;
  rowCount = 0;

  setPage = (page) => {
    this.setState({ page }, function () {
      this.updatePageData();
    });
  };

  handleChangePage = (event, newPage) => {
    this.setPage(newPage);
  };

  setRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value, page: 0 }, function () {
      this.updatePageData();
    });
  };

  componentDidMount() {
    this.updatePageData();
  }

  updatePageData = () => {
    let { open, handleClose, item } = this.props;
    let searchofferId = {}
    searchofferId.id = this.props.offerId
    console.log(this.props.offerId);
    searchofferId.pageIndex = this.state.page + 1
    searchofferId.pageSize = this.state.rowsPerPage
    historyOfPrivateOfferPayout(searchofferId).then(({ data }) => { 
      this.setState({
        itemlist: [...data.content],
        totalElements: data.totalElements,
      })
    });
  };

  render() {
    let { rowsPerPage, page, totalElements, itemlist, item } = this.state;
    let { open, handleClose, handleOKEditClose, t, i18n } = this.props;


    let columns = [
      {
        title: t("general.stt"),
        field: "stt",
        width: 30,
        cellStyle: {
          textAlign: "left", 
        },
        render: (rowData) => page * rowsPerPage + (rowData.tableData.id + 1),
      },
      {
        title: t('Private_payout.created_date'),
        field: 'createDate',
        width: 150,
        render: rowData =>
          (rowData.createDate) ?
            <span>{moment(rowData.createDate).subtract(1, 'months').format('DD-MM-YYYY HH:mm:ss')}
            </span> : ''
      },
      {
        title: t('Private_payout.modified_date'),
        field: 'modifyDate',
        width: 150,
        render: rowData =>
          (rowData.modifyDate) ?
            <span>{moment(rowData.modifyDate).subtract(1, 'months').format('DD-MM-YYYY HH:mm:ss')}
            </span> : ''
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
        title: t('Offer.changed_payout'),
        field: 'payoutValue',
        width: 100,
        cellStyle: {
          paddingRight: 20
        },
        type: "numeric",
        cellStyle: {
          textAlign: "right"
        },
        render: (rowData) => (
          <p className="MuiTableCell-alignLeft">
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
        title: t('Private_payout.apply_date'),
        field: 'applyDate',
        width: 150,
        headerStyle: {
          paddingLeft: 30
        },
        cellStyle: {
          paddingLeft: 30
        },
        render: rowData =>
          (rowData.applyDate) ?
            <span>{moment(rowData.applyDate).format('DD-MM-YYYY HH:mm:ss')}
            </span> : ''
      },
      {
        title: t('Private_payout.end_date'),
        field: 'endDate',
        width: 150,
        headerStyle: {
          paddingLeft: 30
        },
        cellStyle: {
          paddingLeft: 30
        },
        render: rowData =>
          (rowData.endDate) ?
            <span>{moment(rowData.endDate).format('DD-MM-YYYY HH:mm:ss')}
            </span> : ''
      },
      {
        title: t('Offer.default_payout'),
        field: 'offer.product.currentPayout',
        width: 100,
        cellStyle: {
          textAlign: "right",
          paddingRight: 20
        }, render: (rowData) => (
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
      }
    ]

    return (
      <Dialog
        open={open}
        PaperComponent={PaperComponent}
        maxWidth="md"
        fullWidth={true}
      >
        <div
          style={{ cursor: 'move' }}
          id="draggable-dialog-title"
          className="flex flex-space-between flex-middle pl-16 pr-8 py-8 bg-primary"
        >
          <h4 className="m-0 text-white">
            {t('general.history')}
          </h4>
          <IconButton onClick={this.props.handleClose}>
            <Icon className="text-white">clear</Icon>
          </IconButton>
        </div>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <MaterialTable
                title={t("general.list")}
                localization={{
                  body: {
                    emptyDataSourceMessage: `${t('general.emptyDataMessageTable')}`
                  },
                  toolbar: {
                    nRowsSelected: `${t('general.selects')}`
                  }
                }}
                data={itemlist}
                columns={columns}
                parentChildData={(row, rows) =>
                  rows.find((a) => a.id === row.parentId)
                }
                parentChildData={(row, rows) => {
                  var list = rows.find((a) => a.id === row.parentId);
                  return list;
                }}
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
                  toolbar:false
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
        <DialogActions>
          <div className="flex flex-space-between flex-middle mt-36">

            <Button
              variant="contained"
              color="secondary"

              onClick={() => this.props.handleClose()}
              disabled={this.state.loading}
            >
              {t('general.close')}
            </Button>


          </div>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ChangeHistoryPrivateOfferAgencyDialog;
