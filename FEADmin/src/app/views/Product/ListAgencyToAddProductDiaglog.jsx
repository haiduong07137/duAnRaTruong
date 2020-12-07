import React, { Component } from "react";
import ConstantList from "../../appConfig";
import {
  IconButton,
  Dialog,
  Button,
  Icon,
  Grid,
  FormControlLabel,
  TablePagination,
  Switch,
  DialogActions,
  Checkbox, TextField
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { getPageAgencyDontHaveProductThis, addProductToListAgency, addOfferToAllAgency } from "./ProductService";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Autocomplete from '@material-ui/lab/Autocomplete';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';
import MaterialTable, { MTableToolbar, Chip, MTableBody, MTableHeader } from 'material-table';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import Person from '@material-ui/icons/Person';

import { Breadcrumb, ConfirmationDialog } from 'egret'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}
function MaterialButton(props) {
  const { t, i18n } = useTranslation();
  const item = props.item;
  return <div>
    <IconButton title={t('Agency.assign')} onClick={() => props.onSelect(item, 0)}>
      <Icon style={{ color: 'red', }} color="primary">supervised_user_circle</Icon>
    </IconButton>



  </div>;
}
class ListAgencyToAddProductDiaglog extends Component {
  state = {
    name: "",
    code: "",
    listCategory: [],
    category: [],
    description: "",
    totalElements: 0,
    rowsPerPage: 25,
    listItemChecked: [],
    page: 0,
    itemList: [],
    keyword: '',
    shouldOpenConfirmationAssign: false,
    agencyId: '',
    BDStaffId: '',
    showNetwork: '',
  };


  handleChange = (event, source) => {
    event.persist();
    if (source === "switch") {
      this.setState({ isActive: event.target.checked });
      return;
    }
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleFormSubmit = () => {

  };

  selectCategory = (categorySelected) => {
    this.setState({ category: categorySelected }, function () {
    });
  }

  setPage = (page) => {
    this.setState({ page }, function () {
      this.updatePageData()
    })
  }

  setRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value, page: 0 }, function () {
      this.updatePageData();
    })
  }





  handleChangePage = (event, newPage) => {
    this.setPage(newPage)
  }

  handleConfirmationResponse = () => {
    var { t, i18n } = this.props;
    if (this.state.listItemChecked == undefined || this.state.listItemChecked.length == 0) {
      // toast.warn(t('general.select_agency'));
      var { t, i18n } = this.props;
      toast.error(t("Agency.no_record_agency"));
      this.updatePageData()
      return;
    }

    const idList = this.state.listItemChecked;
    addProductToListAgency(idList, this.props.productId).then(() => {
      toast.success(t('general.success'))
    });
    this.handleDialogClose();
  };

  editDataAfterGetData = (itemList) => {
    let netWorkFalse = <CloseIcon style={{ color: "red" }} />;
    let netWorkTrue = <DoneIcon style={{ color: "green" }} />;
    for (let i = 0; i < this.state.itemList?.length; i++) {
      if (this.state.itemList[i].isNetwork == true) {
        this.setState((this.state.itemList[i].showNetwork = netWorkTrue != null ? netWorkTrue : netWorkFalse));
      } else {
        this.setState((this.state.itemList[i].showNetwork = netWorkFalse != null ? netWorkFalse : netWorkTrue));
      }
    }
  };

  handleAddOfferToAllAgency = () => {
    this.setState({ loading: true })
    this.setState({ page: 0, rowsPerPage: 1000 }, function () {
      var searchObject = {};
      searchObject.keyword = this.state.keyword;
      searchObject.pageIndex = this.state.page + 1;
      searchObject.pageSize = this.state.rowsPerPage;
      searchObject.productId = this.props.productId
      getPageAgencyDontHaveProductThis(searchObject).then(({ data }) => {
        let itemListClone = [...data.content]
        itemListClone.map(item => {
          item.isCheck = true;
        })

        this.setState({ listItemChecked: itemListClone, rowsPerPage: 10 }, () => {
          this.updatePageData()

        })
      })
    })
  }

  handleClick = (event, item) => {
    item.isCheck = event.target.checked;
    if (this.state.listItemChecked == null) {
      this.state.listItemChecked = [];
    }
    if (this.state.listItemChecked != null && this.state.listItemChecked.length == 0 && item.isCheck == true) {
      let p = {};
      p = item;

      this.state.listItemChecked.push(p);
    }
    else {
      let itemInList = false;
      this.state.listItemChecked.forEach((el) => {
        if (el.id == item.id) {
          itemInList = true;
        }
      });
      if (!itemInList && item.isCheck == true) {
        let p = {};
        p = item;

        this.state.listItemChecked.push(p);
      }
      else {
        if (item.isCheck === false) {
          this.state.listItemChecked = this.state.listItemChecked.filter(assetVoucher =>
            assetVoucher.id !== item.id
          )
        }



      }
    }
    this.setState({ listItemChecked: this.state.listItemChecked }, function () {
    });
    // else {
    //   this.setState({ selectedValue: null, selectedItem: null });
    // }
  }



  handleTextChange = (event) => {
    this.setState({ keyword: event.target.value }, function () { })
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.search();
    }
  }

  handleDialogClose = () => {
    this.setState(
      {
        shouldOpenConfirmationAssign: false,
      },
      () => {
        this.updatePageData()
      }
    )
    this.props.handleOKEditClose()
  }


  updatePageData = () => {
    var searchObject = {};
    searchObject.keyword = this.state.keyword;
    searchObject.pageIndex = this.state.page + 1;
    searchObject.pageSize = this.state.rowsPerPage;
    searchObject.productId = this.props.productId
    getPageAgencyDontHaveProductThis(searchObject).then(({ data }) => {
      let itemListClone = [...data.content]
      itemListClone.map(item => {
        if (this.state.listItemChecked) {
          this.state.listItemChecked.forEach(assetVoucher => {
            if (assetVoucher.id === item.id) {
              item.isCheck = true;
            }
          })
        }
      })
      this.setState({ itemList: [...itemListClone], totalElements: data.totalElements }, () => {
        this.editDataAfterGetData(this.state.itemList);
        this.setState({ loading: false })
      })
    })






  };



  search() {
    this.setState({ page: 0 }, function () {
      var searchObject = {}
      searchObject.keyword = this.state.keyword
      searchObject.pageIndex = this.state.page + 1
      searchObject.pageSize = this.state.rowsPerPage
      searchObject.productId = this.props.productId
      getPageAgencyDontHaveProductThis(searchObject).then(({ data }) => {
        let itemListClone = [...data.content]
        itemListClone.map(item => {
          if (this.state.listItemChecked) {
            this.state.listItemChecked.forEach(assetVoucher => {
              if (assetVoucher.id === item.id) {
                item.isCheck = true;
              }
            })
          }
        })

        this.setState({ itemList: [...itemListClone], totalElements: data.totalElements }, () => {
          this.editDataAfterGetData(this.state.itemList);
        })
      })
    })
  }

  componentWillMount() {

    this.setState({
      agencyId: this.props.agencyId,
      agencyName: this.props.agencyName,
      ...this.props.item
    });

  }

  componentDidMount() {

    this.updatePageData();
  }

  render() {
    let {
      keyword,
      rowsPerPage,
      page,
      totalElements,
      itemList, shouldOpenConfirmationAssign,
      showNetwork
    } = this.state;
    let { open, handleClose, handleOKEditClose1, t, i18n } = this.props;
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
        title: t("Agency.name"),
        field: "name",
        align: "left",
        width: 130,
        cellStyle: {
          maxWidth: 130,
          whiteSpace: "normal",
          overflow: "hidden",
          textOverflow: "ellipsis",
          wordWrap: "break-word",
        },
        headerStyle: {
          maxWidth: 130,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        },
      },
      {
        title: t("Agency.country"),
        field: "country",
        align: "left",
        width: 80,
        cellStyle: {
          maxWidth: 80,
          whiteSpace: "normal",
          overflow: "hidden",
          textOverflow: "ellipsis",
          wordWrap: "break-word",
        },
        headerStyle: {
          maxWidth: 80,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        },
      },
      {
        title: t("Agency.email"),
        field: "email",
        width: 130,
        cellStyle: {
          maxWidth: 130,
          whiteSpace: "normal",
          overflow: "hidden",
          textOverflow: "ellipsis",
          wordWrap: "break-word",
        },
        headerStyle: {
          maxWidth: 130,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        },
      },
      {
        title: t("Agency.phone"),
        field: "phone",
        align: "left",
        width: 130,
        cellStyle: {
          maxWidth: 130,
          whiteSpace: "normal",
          overflow: "hidden",
          textOverflow: "ellipsis",
          wordWrap: "break-word",
        },
        headerStyle: {
          maxWidth: 130,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        },
      },
      {
        title: t("Agency.contact"),
        field: "socialContact",
        align: "left",
        cellStyle: {
          width: 150,
          maxWidth: 150,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        headerStyle: {
          width: 150,
          maxWidth: 150,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        },
      },
  
        
    ];
    return (
      <Dialog open={open} PaperComponent={PaperComponent} maxWidth="md" fullWidth={false}>
        <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            <h4 className="mb-20">{t('Agency.title')}</h4>
          </DialogTitle>
          <DialogContent>
            <Grid className="mb-10" container spacing={3}>
              <TextField
                label={t("Agency.search")}
                style={{ width: 350 }}
                className="mb-16 mr-10 ml-10"
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
              >
                <Icon fontSize="default" >
                  search
                </Icon>

              </Button>
              {this.state.shouldOpenConfirmationAddSelectionDialog && (
                <ConfirmationDialog
                  open={this.state.shouldOpenConfirmationAddSelectionDialog}
                  onConfirmDialogClose={this.handleDialogClose}
                  onYesClick={this.handleConfirmationResponse}
                  text={t('Product.add_offer_question')}
                  agree={t('general.agree')}
                  cancel={t('general.cancel')}
                />
              )}



              <Button
                variant="contained"
                color="secondary"
                type="submit"
                className="mb-16 mr-16 align-bottom"
                disabled={this.state.loading}
                onClick={() =>
                  this.handleAddOfferToAllAgency()
                }
              >
                {t('Product.add_offer_for_all_agency')}
              </Button>
              <Grid item md={12} sm={12} xs={12}>
                <MaterialTable
                  title={t('general.listAgency')}
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
                  parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
                  parentChildData={(row, rows) => {
                    var list = rows.find(a => a.id === row.parentId);
                    return list;
                  }}
                  options={{
                    headerStyle: {
                      color: "#ffffff",
                      backgroundColor: "#7467ef"
                    },
                    rowStyle: rowData => ({
                      backgroundColor: rowData.tableData.id % 2 === 0 ? "#ffffff" : "#eeeeee"
                    }),
                    selection: false,
                    actionsColumnIndex: -1,
                    paging: false,
                    search: false,
                  }}
                  components={{
                    Toolbar: props => (
                      <MTableToolbar {...props} />
                    ),
                  }}
                  onSelectionChange={(rows) => {
                    this.data = rows
                    this.setState({ selectedItems: rows })
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
                    "aria-label": "Previous Page"
                  }}
                  nextIconButtonProps={{
                    "aria-label": "Next Page"
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.setRowsPerPage}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <div className="flex flex-space-between flex-middle mt-36">




              <Button variant="contained" color="secondary" className="mr-36" onClick={() => this.props.handleClose()}>{t('general.cancel')}</Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="mr-36"
                onClick={() =>
                  this.setState({
                    shouldOpenConfirmationAddSelectionDialog: true,
                  })
                }
              >
                {t('general.save')}
              </Button>
            </div>
          </DialogActions>
        </ValidatorForm>
      </Dialog >
    )
  }
}

export default ListAgencyToAddProductDiaglog;