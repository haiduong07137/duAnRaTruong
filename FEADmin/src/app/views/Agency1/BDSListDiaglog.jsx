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
import { checkCode, addNewData, updateData, getItemById, searchByPage, setManager, searchByPageBDS, sendMailAssign, sendMailBDS } from "./AgencyService";
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
class BDSListDiaglog extends Component {
  state = {
    name: "",
    code: "",
    listCategory: [],
    category: [],
    description: "",
    totalElements: 0,
    rowsPerPage: 25,
    page: 0,
    itemList: [],
    keyword: '',
    shouldOpenConfirmationAssign: false,
    agencyId: '',
    BDStaffId: '',
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
    let { id } = this.state;
    if (id) {
      updateData({
        ...this.state
      }).then(() => {
        this.props.handleOKEditClose1();
      });
    } else {
      addNewData({
        ...this.state
      }).then(() => {
        this.props.handleOKEditClose1();
      });
    }
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


  handleTextChange = (event) => {
    this.setState({ keyword: event.target.value }, function () { })
  }



  handleDialogClose = () => {
    this.setState(
      {
        shouldOpenConfirmationAssign: false,
      },
    )
    this.props.handleOKEditClose()
  }


  updatePageData = () => {
    var searchObject = {};
    searchObject.keyword = this.state.keyword;
    searchObject.pageIndex = this.state.page + 1;
    searchObject.pageSize = this.state.rowsPerPage;
    searchByPageBDS(searchObject).then(({ data }) => {
      this.setState({ itemList: [...data.content], totalElements: data.totalElements });

    });
  };

  handleAssign = () => {
    let agencyDto = {
      id: this.state.agencyId
    }
    let userDto = {
      id: this.state.userId
    }

    setManager(agencyDto, this.state.BDStaffId).then(({ data }) => {
      sendMailAssign(agencyDto).then(({ data }) => {
        sendMailBDS(this.state.BDStaffId).then(({ data }) => {

          var { t, i18n } = this.props;
          toast.success(t('general.success'));
          this.handleDialogClose();
        })

      });
    })

  }

  search() {
    this.setState({ page: 0 }, function () {
      var searchObject = {}
      searchObject.keyword = this.state.keyword
      searchObject.pageIndex = this.state.page + 1
      searchObject.pageSize = this.state.rowsPerPage
      searchByPageBDS(searchObject).then(({ data }) => {
        this.setState({ itemList: [...data.content], totalElements: data.totalElements });
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
      itemList, shouldOpenConfirmationAssign
    } = this.state;
    let { open, handleClose, handleOKEditClose1, t, i18n } = this.props;
    let columns = [
      { title: t("user.username"), field: "username", width: "150" },
      { title: t("user.displayName"), field: "displayName", width: "150" },
      {
        title: t("general.action"),
        field: "custom",
        align: "left",
        width: "250",
        render: rowData => <MaterialButton item={rowData}
          onSelect={(rowData, method) => {
            if (method === 0) {
              this.setState({
                shouldOpenConfirmationAssign: true,
                BDStaffId: rowData.id,
                BDStaffName: rowData.displayName
              })

            } else if (method === 1) {
              this.setState({
                shouldOpenEditorDialog: true
              });
            } else {
              alert('Call Selected Here:' + rowData.id);
            }
          }}
        />
      },
    ];
    return (
      <Dialog open={open} PaperComponent={PaperComponent} maxWidth="md" fullWidth={false}>
        <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            <h4 className="mb-20">{t('Agency.assign')}</h4>
          </DialogTitle>
          <DialogContent>
            <Grid className="mb-10" container spacing={3}>
              <TextField
                label={t('general.enterSearch')}
                style={{ width: 350 }}
                className="mb-16 mr-10 ml-10"
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

                {this.state.shouldOpenConfirmationAssign && (
                  <ConfirmationDialog
                    open={this.state.shouldOpenConfirmationAssign}
                    onConfirmDialogClose={this.handleDialogClose}
                    onYesClick={this.handleAssign}
                    text={t('general.sure_to_assign_1') + this.state.agencyName + t('general.sure_to_assign_2') + this.state.BDStaffName + " ?"}
                    agree={t('general.agree')}
                    cancel={t('general.cancel')}
                  />
                )}

              </Button>
              <Grid item md={12} sm={12} xs={12}>
                <MaterialTable
                  title={t('general.BDS')}
                  localization={{
                    body: {
                      emptyDataSourceMessage: `${t('general.emptyDataMessageTable')}`
                    },
                    toolbar: {
                      nRowsSelected: `${t('general.selects')}`
                    }
                  }}
                  data={itemList}
                  columns={columns}
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

            </div>
          </DialogActions>
        </ValidatorForm>
      </Dialog >
    )
  }
}

export default BDSListDiaglog;