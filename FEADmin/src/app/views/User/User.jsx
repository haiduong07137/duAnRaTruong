import React, { Component } from "react";
import {
  Grid,
  IconButton,
  Icon,
  TablePagination,
  Button,
  TextField,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import MaterialTable, { MTableToolbar } from "material-table";
import { searchByPage, getItemById, getAllRoles } from "./UserService";
import UserEditorDialog from "./UserEditorDialog";
import { Breadcrumb, ConfirmationDialog } from "egret";
import { saveAs } from "file-saver";
import { Helmet } from "react-helmet";
import Autocomplete from "@material-ui/lab/Autocomplete";

function MaterialButton(props) {
  // const { t, i18n } = useTranslation()
  const item = props.item;
  return (
    <div>
      <IconButton onClick={() => props.onSelect(item, 0)}>
        <Icon color="primary">edit</Icon>
      </IconButton>
      <IconButton onClick={() => props.onSelect(item, 1)}>
      <Icon color="error">delete</Icon>
    </IconButton>
    </div>
  );
}

class User extends Component {
  state = {
    userDepartmentId: "",
    keyword: "",
    rowsPerPage: 25,
    page: 0,
    eQAHealthOrgType: [],
    item: {},
    shouldOpenEditorDialog: false,
    shouldOpenConfirmationDialog: false,
    selectAllItem: false,
    selectedList: [],
    totalElements: 0,
    listRole: [],
    roles: [],
    role: [],
    shouldOpenConfirmationDeleteAllDialog: false,
    active: "",
  };
  numSelected = 0;
  rowCount = 0;

  handleTextChange = (event) => {
    this.setState({ keyword: event.target.value }, function () {});
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.search();
    }
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

  editDataAfterGetData = (itemList) => {
    let activeFalse = <CloseIcon style={{ color: "red" }} />;
    let activeTrue = <DoneIcon style={{ color: "green" }} />;

    let itemListUpdate = this.state.itemList;
    for (let i = 0; i < this.state.itemList?.length; i++) {
      if (this.state.itemList[i].active === true) {
        itemListUpdate[i].active = activeTrue;
        // this.setState((this.state.itemList[i].active = activeTrue));
        // this.state.itemList[i].active = activeTrue;
      } else {
        itemListUpdate[i].active = activeFalse;
        // this.setState((this.state.itemList[i].active = activeFalse));
        // this.state.itemList[i].active = activeFalse;
      }
    }

    this.setState({
      itemList: itemListUpdate,
    });
  };

  search() {
    this.setState({ page: 0 }, function () {
      var searchObject = {};
      searchObject.keyword = this.state.keyword;
      searchObject.pageIndex = this.state.page + 1;
      searchObject.pageSize = this.state.rowsPerPage;
      searchObject.roles = this.state.roles?.name;
      searchObject.isActive = this.state.active;

      searchByPage(searchObject).then(({ data }) => {
        this.setState({
          itemList: [...data.content],
          totalElements: data.totalElements,
        });
        this.editDataAfterGetData(this.state.itemList);
      });
    });
  }

  updatePageData = () => {
    var searchObject = {};
    searchObject.keyword = this.state.keyword;
    searchObject.pageIndex = this.state.page + 1;
    searchObject.pageSize = this.state.rowsPerPage;
    searchObject.roles = this.state.roles?.name;
    searchObject.isActive = this.state.active;
    searchByPage(searchObject).then(({ data }) => {
      this.setState(
        {
          itemList: [...data.content],
          totalElements: data.totalElements,
        },
        
      );
      this.editDataAfterGetData(this.state.itemList);
    });
  };

  handleDownload = () => {
    var blob = new Blob(["Hello, world!"], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, "hello world.txt");
  };
  handleDialogClose = () => {
    this.setState({
      shouldOpenEditorDialog: false,
      shouldOpenConfirmationDialog: false,
      shouldOpenConfirmationDeleteAllDialog: false,
    });
  };

  handleOKEditClose = () => {
    this.setState({
      shouldOpenEditorDialog: false,
      shouldOpenConfirmationDialog: false,
    });
    this.updatePageData();
  };

  handleDeleteUser = (id) => {
    this.setState({
      id,
      shouldOpenConfirmationDialog: true,
    });
  };

  handleEditUser = (item) => {
    getItemById(item.id).then((result) => {
      this.setState({
        item: result.data,
        shouldOpenEditorDialog: true,
      });
    });
  };

  // handleConfirmationResponse = () => {
  //   deleteItem(this.state.id).then(() => {
  //     this.updatePageData();
  //     this.handleDialogClose();
  //   });
  // };

  setValue = (newValue) => {
    this.setState(
      {
        active: newValue,
      },
      function () {
        this.search();
      }
    );
  };

  componentWillMount() {}
  componentDidMount() {
    // let { role } = this.state
    this.updatePageData(); 
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

  selectLocations = (locationsSelected) => {
    this.setState({ active: locationsSelected }, function () {
      this.search();
    });
  };

  selectRoles = (roleSelected) => {
    this.setState({ roles: roleSelected }, function () {
      this.search();
    });
  };

  // async handleDeleteList(list) {
  //   for (var i = 0; i < list.length; i++) {
  //     await deleteItem(list[i].id);
  //   }
  // }

  handleDeleteAll = (event) => {
    //alert(this.data.length);
    this.handleDeleteList(this.data).then(() => {
      this.updatePageData();
      this.handleDialogClose();
    });
  };

  render() {
    const { t, i18n } = this.props;
    const options = ["Active", "Not active"];
    let {
      userDepartmentId,
      keyword,
      rowsPerPage,
      page,
      totalElements,
      itemList,
      item,
      listRole,
      department,
      shouldOpenConfirmationDialog,
      shouldOpenEditorDialog,
      shouldOpenConfirmationDeleteAllDialog,
    } = this.state;

    let TitlePage = t("user.title");

    let columns = [
      {
        headerStyle: {
          paddingLeft: "3px",
        },
        cellStyle: {
          paddingLeft: "3px",
        },
        title: t("general.stt"),
        field: "code",
        align: "center",
        width: "7%",
        render: (rowData) => page * rowsPerPage + (rowData.tableData.id + 1),
      },
      {
        title: t("user.username"),
        field: "username",
        width: "11%",
      },
      {
        title: t("user.displayName"),
        field: "person.displayName",
        width: "17%",
      },
      {
        title: t("Agency.email"),
        field: "email",
        align: "left",
        width: "28%",
      },
      {
        title: t("user.role"),
        field: "roles",
        align: "left",
        width: "26%",
        render: (rowData) => <p>{rowData.role?.name}</p>,
      }, 
      {
        title: t("general.action"),
        field: "custom",
        align: "left",
        render: (rowData) => (
          <MaterialButton
            item={rowData}
            onSelect={(rowData, method) => {
              console.log(method);
              if (method === 0) {
                getItemById(rowData.id).then((res) => {
                  this.setState({
                    item: res.data,
                    isAddNew: false,
                    shouldOpenEditorDialog: true,
                  })
                });
              } else if (method === 1) {
                // let offer = {
                //   id: rowData.id,
                // };
                // setPublicOffer(offer).then(() => {
                //   toast.success(t("general.success"));
                //   this.updatePageData();
                // });
                
              } else if (method === 2) {
                // this.setState({
                //   des: rowData.product?.description,
                  
                //   shouldOpenShowDesDialog: true,
                // });
              } else if (method === 3) {
                // this.setState({
                  
                // });
              } else if (method === 4) {
                // View publisher's payout table
                // this.gotoListLead(rowData.id)
              } else {
                alert("Call Selected Here:" + rowData.id);
              }
            }}
          />
        ),
      },
       
    ];

    return (
      <div className="m-sm-30">
        <Helmet>
          <title>Offer Pro | {TitlePage}</title>
        </Helmet>
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: t("user.title") }]} />
        </div>

        <Grid container spacing={3}>
          <Grid
            container
            spacing={2}
            item
            md={7}
            xs={12}
            style={{
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <Grid
              item
              xs={12}
              style={{
                paddingLeft: 40,
              }}
            >
              <Button
                style={{}}
                className="mb-16  align-bottom"
                variant="contained"
                color="primary"
                onClick={() => {
                  this.handleEditItem({
                    startDate: new Date(),
                    endDate: new Date(),
                    isAddNew: true,
                  });
                }}
              >
                {t("general.add")}
              </Button>
              {/* {shouldOpenConfirmationDeleteAllDialog && (
                <ConfirmationDialog
                  open={shouldOpenConfirmationDeleteAllDialog}
                  onConfirmDialogClose={this.handleDialogClose}
                  onYesClick={this.handleDeleteAll}
                  text={t("general.deleteAllConfirm")}
                />
              )} */}
              <TextField
                label={t("user.search")}
                className=" mr-10 mb-10"
                style={{ width: 400 }}
                fontSize="small"
                type="text"
                name="keyword"
                value={keyword}
                onChange={this.handleTextChange}
                onKeyPress={this.handleKeyPress}
              />
              <Button
                className="mb-16  align-bottom"
                variant="contained"
                color="primary"
                onClick={() => this.search(keyword)}
              >
                <Icon fontSize="default">search</Icon>
              </Button>
            </Grid>
          </Grid>
 

          <Grid item xs={12}>
            <div>
              {shouldOpenEditorDialog && (
                <UserEditorDialog
                  t={t}
                  i18n={i18n}
                  handleClose={this.handleDialogClose}
                  open={shouldOpenEditorDialog}
                  handleOKEditClose={this.handleOKEditClose}
                  item={item}
                  department={department}
                  userDepartmentId={userDepartmentId}
                />
              )}

              {shouldOpenConfirmationDialog && (
                <ConfirmationDialog
                  title={t("general.confirm")}
                  open={shouldOpenConfirmationDialog}
                  onConfirmDialogClose={this.handleDialogClose}
                  onYesClick={this.handleConfirmationResponse}
                  text={t("DeleteConfirm")}
                  agree={t("general.agree")}
                  cancel={t("general.cancel")}
                />
              )}
            </div>
            <MaterialTable
              title={t("general.list_account")}
              data={itemList}
              columns={columns}
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
              //parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
              parentChildData={(row, rows) => {
                var list = rows.find((a) => a.id === row.parentId);
                return list;
              }}
              options={{
                maxBodyHeight: "450px",
                minBodyHeight: "370px",
                selection: false,
                actionsColumnIndex: 0,
                paging: false,
                search: false,
                rowStyle: (rowData) => ({
                  backgroundColor:
                    rowData.tableData.id % 2 === 0 ? "#ffffff" : "#eeeeee",
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
              }}
              components={{
                Toolbar: (props) => <MTableToolbar {...props} />,
              }}
              onSelectionChange={(rows) => {
                this.data = rows;
                // this.setState({selectedItems:rows});
              }}
              actions={[
                {
                  hidden: true,
                  isFreeAction: true,
                  tooltip: "Remove All Selected Users",
                  icon: "delete",
                  onClick: (evt, data) => {
                    this.handleDeleteAll(data);
                    alert("You want to delete " + data.length + " rows");
                  },
                },
              ]}
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

export default User;
