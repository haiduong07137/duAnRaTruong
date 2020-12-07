import React, { Component } from "react";
import {
  IconButton,
  Dialog,
  Button,
  Icon,
  Grid,
  TablePagination,
  DialogActions,
  TextField,
  Checkbox,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  checkCode,
  addNewData,
  updateData,
  getItemById,
} from "./OfferAgencyService";

import { getPageProductAddAgency } from "../Product/ProductService";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Draggable from "react-draggable";
import Paper from "@material-ui/core/Paper";
import MaterialTable, {
  MTableToolbar,
  Chip,
  MTableBody,
  MTableHeader,
} from "material-table";
import { useTranslation, withTranslation, Trans } from "react-i18next";

import { Breadcrumb, ConfirmationDialog } from "egret";
import { deleteItem, searchByPage } from "../Product/ProductService";
import { toast } from 'react-toastify';
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
class ListOfferDialog extends Component {
  state = {
    name: "",
    code: "",
    category: [],
    description: "",
    totalElements: 0,
    rowsPerPage: 25,
    page: 0,
    id: "",
    keyword: "",
    listOfferOld: [],
    productList: [],
    itemLists: [],
    shouldOpenConfirmationAddSelectionDialog: false,
    loading: false,
  };

  handleChange = (event, source) => {
    event.persist();
    if (source === "switch") {
      this.setState({ isActive: event.target.checked });
      return;
    }
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  search() {
    this.setState({ page: 0 }, function () {
      var searchObject = {}
      searchObject.keyword = this.state.keyword
      searchObject.pageIndex = this.state.page + 1
      searchObject.pageSize = this.state.rowsPerPage
      getPageProductAddAgency(searchObject, this.state.agencyId).then(({ data }) => {
        let itemListClone = [...data.content]
        itemListClone.map(item => {
          if (this.state.productList) {
            this.state.productList.forEach(assetVoucher => {
              if (assetVoucher.id === item.id) {
                item.isCheck = true;
              }
            })
          }
        })
        this.setState({ itemList: [...itemListClone], totalElements: data.totalElements }, () => {

        })
      })
    })
  }

  handleTextChange = (event) => {
    this.setState({ keyword: event.target.value }, function () { });
  };


  setPage = (page) => {
    this.setState({ page }, function () {
      this.updatePageData();
    });
  };

  handleChangePage = (event, newPage) => {
    this.setPage(newPage);
  };

  handleFormSubmit = () => {

    // let { id } = this.state;
    // if (id) {
    //   updateData({
    //     ...this.state
    //   }).then(() => {
    //     this.props.handleOKEditClose();
    //   });
    // } else {
    //   addNewData({
    //     ...this.state
    //   }).then(() => {
    //     this.props.handleOKEditClose();
    //   });
    // }
  };


  handleClick = (event, item) => {
    item.isCheck = event.target.checked;
    if (this.state.productList == null) {
      this.state.productList = [];
    }
    if (this.state.productList != null && this.state.productList.length == 0 && item.isCheck == true) {
      let p = {};
      p = item;

      this.state.productList.push(p);
    }
    else {
      let itemInList = false;
      this.state.productList.forEach((el) => {
        if (el.id == item.id) {
          itemInList = true;
        }
      });
      if (!itemInList && item.isCheck == true) {
        let p = {};
        p = item;

        this.state.productList.push(p);
      }
      else {
        if (item.isCheck === false) {
          this.state.productList = this.state.productList.filter(assetVoucher =>
            assetVoucher.id !== item.id
          )
        }



      }
    }
    this.setState({ productList: this.state.productList }, function () {
    });
    // else {
    //   this.setState({ selectedValue: null, selectedItem: null });
    // }
  }

  setRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value, page: 0 }, function () {
      this.updatePageData();
    });
  };

  updatePageData = () => {
    var searchObject = {};
    searchObject.keyword = this.state.keyword;
    searchObject.pageIndex = this.state.page + 1;
    searchObject.pageSize = this.state.rowsPerPage;
    getPageProductAddAgency(searchObject, this.state.agencyId).then(({ data }) => {
      let itemListClone = [...data.content]
      itemListClone.map(item => {
        if (this.state.productList) {
          this.state.productList.forEach(assetVoucher => {
            if (assetVoucher.id === item.id) {
              item.isCheck = true;
            }
          })
        }
      })
      this.setState({ itemList: [...itemListClone], totalElements: data.totalElements }, () => {

      })
    })
  };

  handleAddOfferToAllAgency = () => {
    this.setState({ loading: true })
    this.setState({ page: 0, rowsPerPage: 1000 }, function () {
      var searchObject = {};
      searchObject.keyword = this.state.keyword;
      searchObject.pageIndex = this.state.page + 1;
      searchObject.pageSize = this.state.rowsPerPage;
      getPageProductAddAgency(searchObject, this.state.agencyId).then(({ data }) => {
        let itemListClone = [...data.content]
        itemListClone.map(item => {
          item.isCheck = true;
        })

        this.setState({ productList: itemListClone, rowsPerPage: 25 }, () => {
          this.updatePageData()
          this.setState({ loading: false })
        })
      })
    })
  }

  async handleAddListOffer(list) {
    this.setState({ loading: true });
    for (var i = 0; i < list.length; i++) {
      let offerdto = {
        agency: {
          id: this.state.agencyId,
        },
        product: {
          id: list[i].id,
        },
        payoutValue: list[i].currentPayout,
        isShow: list[i].isShow,
        isApprovedToShow: false,
      };
      await addNewData(offerdto).then(({ data }) => {
        this.setState({ loading: false });
      });
    }
  }


  handleAddAllOffer = (event) => {
    this.setState({ loading: false })
    this.handleAddListOffer(this.state.productList).then(() => {
      var { t, i18n } = this.props;
      toast.success(t("general.success"));

    }).then(() => {
      this.props.handleOKEditClose();
    });

    this.handleDialogClose();
  };

  handleAddAll = (event) => {
    this.handleAddListOffer(this.state.itemLists).then(() => {
      this.handleDialogClose();
    })

  }



  handleDialogClose = () => {
    this.setState(
      {
        shouldOpenConfirmationAddSelectionDialog: false,
        shouldOpenConfirmationAddAllOfferDialog: false,
      },
      () => {
        this.props.handleOKEditClose();
      }
    );
  };

  componentWillMount() {
    this.setState({
      agencyId: this.props.agencyId,
      ...this.props.item,
    });
  }

  componentDidMount() {
    this.updatePageData();
  }

  checkOffer(id) {
    for (var i = 0; i < this.state.listOfferOld.length; i++) {
      if (this.state.listOfferOld[i].product.id == id) {
        return false;
      }
    }
    return true;
  }

  render() {
    let {
      payoutValue,
      listProduct,
      category,
      rowsPerPage,
      page,
      totalElements,
      itemList,
      item,
      keyword,
      loading
    } = this.state;
    let { open, handleClose1, handleOKEditClose1, t, i18n } = this.props;
    let columns = [
      {
        title: t("general.select"),
        field: "custom",
        align: "left",
        width: "250",
        cellStyle: {
          padding: '0px',
          paddingLeft: '10px',
        },
        render: rowData => <Checkbox name="radSelected" value={rowData.id}
          checked={rowData.isCheck}
          onClick={(event) => this.handleClick(event, rowData)}
        />
      },
      {
        title: t("Product.code"),
        field: "code",
        headerStyle: {
          paddingLeft: 80,
        },
        cellStyle: {
          paddingLeft: 80,
        },
      },
      {
        title: t("Product.name"),
        field: "name",
        align: "left",
        headerStyle: {
          paddingLeft: 40,
        },
        cellStyle: {
          paddingLeft: 40,
        },
      },
      {
        title: t("Product.mainImageUrl"),
        field: "mainImageUrl",
        width: 150,
        render: (rowData) => (
          <img
            src={rowData?.mainImageUrl}
            alt="Product"
            width="100"
            height="50"
          ></img>
        ),
      },
      {
        title: t("Product.price"),
        field: "price",
        width: 120,
        headerStyle: {
          paddingLeft: 40,
        },
        render: (rowData) => (
          <p className="MuiTableCell-alignRight">
            {rowData?.price.toLocaleString("en-US")}
            {rowData?.currency === "THB"
              ? " Thb"
              : rowData?.currency === "VND"
                ? "₫"
                : rowData?.currency === "USD"
                  ? "$"
                  : " Rp"}
          </p>
        ),
      },
      {
        title: t("Product.payout"),
        field: "payoutValue",
        width: 120,
        headerStyle: {
          paddingLeft: 40,
        },
        render: (rowData) => (
          <p className="MuiTableCell-alignRight">
            {rowData.currentPayout?.toLocaleString("en-US")}
            {rowData?.currency === "THB"
              ? " Thb"
              : rowData?.currency === "VND"
                ? "₫"
                : rowData?.currency === "USD"
                  ? "$"
                  : " Rp"}
          </p>
        ),
      },
    ];
    return (
      <Dialog
        open={open}
        PaperComponent={PaperComponent}
        maxWidth="lg"
        fullWidth={true}
      >
        <ValidatorForm ref="form">
          <div
            style={{ cursor: "move" }}
            id="draggable-dialog-title"
            className="flex flex-space-between flex-middle pl-16 pr-8 py-8 bg-primary"
          >
            <h4 className="m-0 text-white">{t("Offer.add")}</h4>
            <IconButton onClick={this.props.handleClose}>
              <Icon className="text-white">clear</Icon>
            </IconButton>
          </div>
          <DialogContent>
            <Grid className="mb-10" container spacing={3}>
              <Grid item md={12} sm={12} xs={12}>
                <TextField
                  label={t("Product.search_products")}
                  className="mb-16 mr-10"
                  style={{ width: 350 }}
                  type="text"
                  name="keyword"
                  value={keyword}
                  onChange={this.handleTextChange}
                />
                <Button
                  className="mb-16 mr-16 align-bottom"
                  variant="contained"
                  color="primary"
                  onClick={() => this.search(keyword)}
                >
                  <Icon fontSize="default">
                    search
                  </Icon>
                </Button>
                <Button
                  className="mb-16 mr-16 align-bottom"
                  variant="contained"
                  color="primary"
                  onClick={this.handleAddOfferToAllAgency}
                >
                  {t("general.select_all")}
                </Button>
                {/* {this.state.shouldOpenConfirmationAddAllOfferDialog && (
                  <ConfirmationDialog
                    open={this.state.shouldOpenConfirmationAddAllOfferDialog}
                    onConfirmDialogClose={this.handleDialogClose}
                    onYesClick={this.handleAddAllOffer}
                    text={t("general.sure_to_add_all_offer")}
                    agree={t("general.agree")}
                    cancel={t("general.cancel")}
                  />
                )} */}
                {this.state.shouldOpenConfirmationAddSelectionDialog && (
                  <ConfirmationDialog
                    open={this.state.shouldOpenConfirmationAddSelectionDialog}
                    disabled={loading}
                    onConfirmDialogClose={this.handleDialogClose}
                    onYesClick={this.handleAddAllOffer}
                    disabled={this.state.loading}
                    text={t("general.sure_to_add_all")}
                    agree={t("general.agree")}
                    cancel={t("general.cancel")}
                  />
                )}
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <MaterialTable
                  title={t("general.list_products")}
                  data={itemList}
                  localization={{
                    body: {
                      emptyDataSourceMessage: `${t('general.emptyDataMessageTable')}`
                    },
                    toolbar: {
                      nRowsSelected: `${t('general.selects')}`
                    }
                  }}
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
                      backgroundColor: "#7467ef",
                    },
                    rowStyle: (rowData) => ({
                      backgroundColor:
                        rowData.tableData.id % 2 === 0 ? "#ffffff" : "#eeeeee",
                    }),
                    selection: false,
                    padding: 'dense',
                    actionsColumnIndex: -1,
                    paging: false,
                    search: false,
                  }}
                  components={{
                    Toolbar: (props) => <MTableToolbar {...props} />,
                  }}
                  onSelectionChange={(rows) => {
                    this.data = rows
                    this.setState({ selectedItems: rows })
                  }}
                // actions={[
                //   {
                //     tooltip: 'Remove All Selected Users',
                //     icon: 'delete',
                //     onClick: (evt, data) => {
                //       this.handleDeleteAll(data)
                //       alert('You want to delete ' + data.length + ' rows')
                //     },
                //   },
                // ]}
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
                color="primary"
                // type="submit"
                className="mr-36"
                disabled={loading}
                onClick={() =>
                  this.setState({
                    shouldOpenConfirmationAddSelectionDialog: true,
                  })
                }
              >
                {t("general.save")}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                disabled={this.state.loading}
                onClick={() => this.props.handleClose()}
              >
                {t("general.cancel")}
              </Button>
            </div>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    );
  }
}

export default ListOfferDialog;
